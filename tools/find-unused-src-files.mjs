import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const srcRoot = path.join(projectRoot, "src");

/** @param {string} p */
function normalize(p) {
  return p.split(path.sep).join("/");
}

/** @param {string} dir */
function walk(dir) {
  /** @type {string[]} */
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // Skip typical build caches
      if (entry.name === "dist" || entry.name === ".vite" || entry.name === ".turbo") continue;
      out.push(...walk(full));
    } else {
      out.push(full);
    }
  }
  return out;
}

const allSrcFiles = walk(srcRoot)
  .filter((f) => /\.(ts|tsx)$/.test(f))
  .filter((f) => !f.endsWith(".d.ts"));

const EXT_CANDIDATES = [
  "",
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".mjs",
  ".cjs",
  "/index.ts",
  "/index.tsx",
  "/index.js",
  "/index.jsx",
  "/index.mjs",
  "/index.cjs",
];

/**
 * Resolve an import specifier to an absolute file path (only within src).
 * @param {string} fromFile
 * @param {string} spec
 */
function resolveInternal(fromFile, spec) {
  // Ignore package imports
  if (!spec) return null;
  if (spec.startsWith("http:") || spec.startsWith("https:")) return null;
  if (spec.startsWith("/")) return null; // public assets

  let candidateBase;
  if (spec.startsWith("@/")) {
    candidateBase = path.join(srcRoot, spec.slice(2));
  } else if (spec.startsWith("./") || spec.startsWith("../")) {
    candidateBase = path.resolve(path.dirname(fromFile), spec);
  } else {
    return null;
  }

  for (const ext of EXT_CANDIDATES) {
    const resolved = candidateBase + ext;
    const normalizedResolved = path.normalize(resolved);
    if (
      normalizedResolved.startsWith(srcRoot) &&
      fs.existsSync(normalizedResolved) &&
      fs.statSync(normalizedResolved).isFile()
    ) {
      return normalizedResolved;
    }
  }

  return null;
}

/**
 * Extract import/export specifiers from a file.
 * @param {string} code
 */
function extractSpecifiers(code) {
  /** @type {Set<string>} */
  const specs = new Set();

  const patterns = [
    /\bimport\s+(?:type\s+)?[^;\n]*?\sfrom\s*["']([^"']+)["']/g,
    /\bexport\s+[^;\n]*?\sfrom\s*["']([^"']+)["']/g,
    /\bimport\s*\(\s*["']([^"']+)["']\s*\)/g,
    /\brequire\(\s*["']([^"']+)["']\s*\)/g,
  ];

  for (const re of patterns) {
    let m;
    while ((m = re.exec(code))) {
      specs.add(m[1]);
    }
  }

  // Side-effect imports: import "./x";
  const sideEffect = /\bimport\s*["']([^"']+)["']\s*;?/g;
  let m;
  while ((m = sideEffect.exec(code))) {
    specs.add(m[1]);
  }

  return [...specs];
}

/** @param {string} file */
function readText(file) {
  return fs.readFileSync(file, "utf8");
}

const entryPoints = [
  path.join(srcRoot, "main.tsx"),
  path.join(srcRoot, "main.ts"),
].filter((f) => fs.existsSync(f));

if (entryPoints.length === 0) {
  console.error("No entry points found at src/main.tsx or src/main.ts");
  process.exit(2);
}

/** @type {Set<string>} */
const visited = new Set();
/** @type {string[]} */
const queue = entryPoints.map((f) => path.normalize(f));

while (queue.length) {
  const file = queue.pop();
  if (!file) continue;
  const normalizedFile = path.normalize(file);
  if (visited.has(normalizedFile)) continue;
  visited.add(normalizedFile);

  let code;
  try {
    code = readText(normalizedFile);
  } catch {
    continue;
  }

  for (const spec of extractSpecifiers(code)) {
    const resolved = resolveInternal(normalizedFile, spec);
    if (resolved && !visited.has(resolved)) queue.push(resolved);
  }
}

const unused = allSrcFiles
  .filter((f) => !visited.has(f))
  .map((f) => normalize(path.relative(projectRoot, f)))
  .sort((a, b) => a.localeCompare(b));

const reachable = [...visited]
  .filter((f) => f.startsWith(srcRoot))
  .map((f) => normalize(path.relative(projectRoot, f)))
  .sort((a, b) => a.localeCompare(b));

console.log(JSON.stringify({
  entryPoints: entryPoints.map((f) => normalize(path.relative(projectRoot, f))),
  reachableCount: reachable.length,
  totalCount: allSrcFiles.length,
  unusedCount: unused.length,
  unused,
}, null, 2));
