import { useEffect, useMemo, useState } from "react";

export type AutoPerformanceInfo = {
  enabled: boolean;
  reasons: string[];
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
  const [enabled, setEnabled] = useState(false);
  const [reasons, setReasons] = useState<string[]>([]);

  const reducedMotion = useMemo(() => readMedia("(prefers-reduced-motion: reduce)"), []);

  useEffect(() => {
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
    setEnabled(shouldEnable);
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

  return { enabled, reasons };
}
