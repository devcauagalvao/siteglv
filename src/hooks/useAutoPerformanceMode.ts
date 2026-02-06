import { useEffect, useMemo, useState } from "react";

export type AutoPerformanceInfo = {
  enabled: boolean;
  hardDisable: boolean;
  mode: "auto" | "on" | "off";
  reasons: string[];
};

type PerfModeOverride = "auto" | "on" | "off";

const readOverrideFromString = (raw: string | null | undefined): PerfModeOverride | null => {
  if (!raw) return null;
  const v = String(raw).trim().toLowerCase();
  if (["off", "0", "false", "no"].includes(v)) return "off";
  if (["on", "1", "true", "yes"].includes(v)) return "on";
  if (["auto"].includes(v)) return "auto";
  return null;
};

const readPerfModeOverride = (): PerfModeOverride => {
  if (typeof window === "undefined") return "auto";

  // 1) Query param override (highest priority)
  try {
    const qs = new URLSearchParams(window.location.search);
    const q = readOverrideFromString(qs.get("perf"));
    if (q) return q;
  } catch {
    // ignore
  }

  // 2) localStorage override (persistent)
  try {
    const stored = readOverrideFromString(window.localStorage.getItem("glv:perfMode"));
    if (stored) return stored;
  } catch {
    // ignore
  }

  return "auto";
};

const readMedia = (q: string) => {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return false;
  return window.matchMedia(q).matches;
};

const getConnectionInfo = (): { saveData?: boolean; effectiveType?: string } => {
  const navAny = navigator as any;
  const c = navAny?.connection ?? navAny?.mozConnection ?? navAny?.webkitConnection;
  if (!c) return {};
  return { saveData: !!c.saveData, effectiveType: c.effectiveType };
};

export default function useAutoPerformanceMode(): AutoPerformanceInfo {
  const [mode, setMode] = useState<PerfModeOverride>(() => readPerfModeOverride());
  const [enabled, setEnabled] = useState(false);
  const [hardDisable, setHardDisable] = useState(false);
  const [reasons, setReasons] = useState<string[]>([]);

  const reducedMotion = useMemo(() => readMedia("(prefers-reduced-motion: reduce)"), []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const sync = () => setMode(readPerfModeOverride());
    window.addEventListener("popstate", sync);
    window.addEventListener("hashchange", sync);
    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener("hashchange", sync);
    };
  }, []);

  useEffect(() => {
    if (mode === "auto") return;

    if (mode === "off") {
      setEnabled(false);
      setHardDisable(false);
      setReasons(["forced-off"]);
      return;
    }

    // mode === "on"
    setEnabled(true);
    setHardDisable(false);
    setReasons(["forced-on"]);
  }, [mode]);

  useEffect(() => {
    if (mode !== "auto") return;

    const newReasons: string[] = [];

    if (reducedMotion) newReasons.push("prefers-reduced-motion");

    const hw = typeof navigator !== "undefined" ? navigator.hardwareConcurrency : undefined;
    if (typeof hw === "number" && hw > 0 && hw <= 4) newReasons.push("low-hardware-concurrency");

    const navAny = navigator as any;
    const mem = navAny?.deviceMemory;
    if (typeof mem === "number" && mem > 0 && mem <= 4) newReasons.push("low-device-memory");

    const conn = getConnectionInfo();
    if (conn.saveData) newReasons.push("save-data");
    if (typeof conn.effectiveType === "string" && /(^|-)2g/.test(conn.effectiveType)) newReasons.push("slow-network");

    const isSmallScreen = typeof window !== "undefined" ? window.innerWidth <= 768 : false;
    if (isSmallScreen) newReasons.push("small-screen");

    // Default policy: enable if any strong signal exists.
    const strongSignals = new Set([
      "prefers-reduced-motion",
      "low-hardware-concurrency",
      "low-device-memory",
      "save-data",
      "slow-network",
    ]);

    const shouldEnable = newReasons.some((r) => strongSignals.has(r));
    setEnabled((prev) => prev || shouldEnable);
    setReasons(newReasons);

    const onResize = () => {
      // Re-evaluate only the screen-size reason.
      setReasons((prev) => {
        const next = prev.filter((r) => r !== "small-screen");
        if (window.innerWidth <= 768) next.push("small-screen");
        return next;
      });
    };

    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, [reducedMotion]);

  useEffect(() => {
    if (mode !== "auto") return;

    // Runtime check: notebooks/desktops with integrated GPUs can pass hardware heuristics
    // but still struggle with heavy shaders/animations.
    if (typeof window === "undefined") return;

    let rafId = 0;
    let cancelled = false;

    const warmupMs = 600;
    const sampleMs = 2000;
    const lowFpsThreshold = 45;
    const longFrameThresholdMs = 50;
    const longFrameCountThreshold = 6;

    const startAfter = performance.now() + warmupMs;
    let start = 0;
    let last = 0;
    let frames = 0;
    let longFrames = 0;

    const tick = (now: number) => {
      if (cancelled) return;
      if (document.visibilityState === "hidden") {
        rafId = requestAnimationFrame(tick);
        return;
      }
      if (now < startAfter) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      if (start === 0) {
        start = now;
        last = now;
      } else {
        const dt = now - last;
        last = now;
        if (dt >= longFrameThresholdMs) longFrames += 1;
        frames += 1;
      }

      const elapsed = now - start;
      if (elapsed >= sampleMs) {
        const fps = frames > 0 ? (frames * 1000) / elapsed : 60;
        const shouldEnable = fps < lowFpsThreshold || longFrames >= longFrameCountThreshold;

        if (shouldEnable) {
          setEnabled((prev) => prev || true);
          setReasons((prev) => (prev.includes("low-fps") ? prev : [...prev, "low-fps"]));
        }
        return;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    // Escalation: if we're already in reduced-quality mode and FPS is still low,
    // freeze the heaviest animations (keep visuals, drop continuous rendering).
    if (typeof window === "undefined") return;
    if (mode !== "auto") return;
    if (!enabled) return;
    if (hardDisable) return;

    let rafId = 0;
    let cancelled = false;

    const warmupMs = 1200;
    const sampleMs = 2200;
    const lowFpsThreshold = 42;
    const longFrameThresholdMs = 60;
    const longFrameCountThreshold = 8;

    const startAfter = performance.now() + warmupMs;
    let start = 0;
    let last = 0;
    let frames = 0;
    let longFrames = 0;

    const tick = (now: number) => {
      if (cancelled) return;
      if (document.visibilityState === "hidden") {
        rafId = requestAnimationFrame(tick);
        return;
      }
      if (now < startAfter) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      if (start === 0) {
        start = now;
        last = now;
      } else {
        const dt = now - last;
        last = now;
        if (dt >= longFrameThresholdMs) longFrames += 1;
        frames += 1;
      }

      const elapsed = now - start;
      if (elapsed >= sampleMs) {
        const fps = frames > 0 ? (frames * 1000) / elapsed : 60;
        const shouldEscalate = fps < lowFpsThreshold || longFrames >= longFrameCountThreshold;

        if (shouldEscalate) {
          setHardDisable(true);
          setReasons((prev) =>
            prev.includes("low-fps-persistent") ? prev : [...prev, "low-fps-persistent"]
          );
        }
        return;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [enabled, hardDisable]);

  return { enabled, hardDisable, mode, reasons };
}
