/**
 * Post-build script: add defer to render-blocking <script> tags.
 *
 * The inlined critical CSS in <head> already handles above-fold rendering,
 * so CSS stylesheets are left untouched to avoid any risk.
 *
 * Run: node scripts/defer-blocking.mjs
 */

import { readdir, readFile, writeFile } from "fs/promises";
import { join } from "path";

const OUT_DIR = "out";

async function* walkHtmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walkHtmlFiles(full);
    else if (entry.name.endsWith(".html")) yield full;
  }
}

async function main() {
  let count = 0;
  for await (const file of walkHtmlFiles(OUT_DIR)) {
    let html = await readFile(file, "utf-8");
    const before = html;

    // Add defer to bare <script src="..."> — Next.js already uses defer for most
    html = html.replace(
      /<script(\s+src=["'][^"']+["'])(\s*)(>)/gi,
      (match, attrs, space, close) => {
        if (match.includes("defer") || match.includes("async")) return match;
        return `<script${attrs} defer${close}`;
      },
    );

    if (html !== before) {
      await writeFile(file, html);
      count++;
    }
  }
  console.log(`✅ Added defer to scripts in ${count} HTML file(s)`);
}

main().catch((e) => {
  console.error("❌", e.message);
  process.exit(1);
});
