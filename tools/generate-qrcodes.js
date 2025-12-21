/* Generates static QR codes for user profile URLs into public/qrcodes/<id>.png */
import fs from "fs";
import path from "path";
import QRCode from "qrcode";
import { fileURLToPath } from "url";

// ESM-friendly __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* Base domain for profiles (override with GLV_BASE_URL env) */
const BASE_URL = process.env.GLV_BASE_URL || "https://www.glvinformatica.com.br/";

/* Default IDs; can pass IDs via CLI: node tools/generate-qrcodes.js id1 id2 ... */
const DEFAULT_IDS = [
  "g3N1LD0X9Z",
  // ...existing IDs...
];
const IDS = process.argv.slice(2).length ? process.argv.slice(2) : DEFAULT_IDS;

async function main() {
  const outDir = path.join(__dirname, "..", "public", "qrcodes");
  fs.mkdirSync(outDir, { recursive: true });

  for (const id of IDS) {
    const url = `${BASE_URL}${id}`;
    const outFile = path.join(outDir, `${id}.png`);

    try {
      const buffer = await QRCode.toBuffer(url, {
        type: "png",
        errorCorrectionLevel: "H",
        margin: 2,
        width: 600,
        color: { dark: "#000000", light: "#FFFFFF" },
      });
      fs.writeFileSync(outFile, buffer);
      console.log(`✓ QR generated: ${outFile}`);
    } catch (e) {
      console.error(`✗ Failed to generate QR for ${id}`, e);
    }
  }
}

main();
