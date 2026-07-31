/**
 * Convert logo.webp to logo.webp for modern browsers.
 * Run: node scripts/convert-logo.mjs
 * Requires: npm install --save-dev sharp (Node 18+)
 */
import sharp from "sharp";
import { join } from "path";

const src = join(process.cwd(), "public/logo.webp");
const dest = join(process.cwd(), "public/logo.webp");

sharp(src)
  .webp({ quality: 85 })
  .toFile(dest)
  .then((info) => {
    console.log(`✓ logo.webp created: ${(info.size / 1024).toFixed(1)} KB`);
    console.log(
      `  Original JPG: ${require("fs").statSync(src).size / 1024} KB`
    );
    const savings = (
      ((require("fs").statSync(src).size - info.size) /
        require("fs").statSync(src).size) *
      100
    ).toFixed(1);
    console.log(`  Saved: ${savings}%`);
  })
  .catch((err) => console.error("Error:", err.message));
