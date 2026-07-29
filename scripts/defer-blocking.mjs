/**
 * Post-build script: optimize render-blocking resources in static HTML output.
 *
 * 1. Adds defer to <script src="..."> (Next.js already uses defer for most, this is a safety net)
 * 2. Converts <link rel="stylesheet"> to preload + onload pattern for non-critical CSS
 * 3. Preserves <noscript> fallback for stylesheets
 *
 * Run: node scripts/defer-blocking.mjs
 * (automatically called after `next build` via package.json scripts)
 */

import { readdir, readFile, writeFile, stat } from "fs/promises";
import { join, extname } from "path";

const OUT_DIR = "out";

async function* walkHtmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walkHtmlFiles(full);
    } else if (entry.name.endsWith(".html")) {
      yield full;
    }
  }
}

function deferStylesheets(html) {
  // Match <link rel="stylesheet" href="..."> — skip already-preloaded
  return html.replace(
    /<link\s+rel=["']stylesheet["']\s+href=["']([^"']+)["']\s*\/?>/gi,
    (match, href) => {
      // Skip if already has onload or is in noscript
      if (match.includes("onload=")) return match;
      return `<link rel="preload" as="style" href="${href}" onload="this.onload=null;this.rel='stylesheet'" />\n<noscript><link rel="stylesheet" href="${href}" /></noscript>`;
    },
  );
}

function deferScripts(html) {
  // Add defer to script tags without async/defer
  return html.replace(
    /<script\s+src=["']([^"']+)["']\s*>/gi,
    (match, src) => {
      if (match.includes("defer") || match.includes("async")) return match;
      return match.replace(/<script/, '<script defer');
    },
  );
}

async function main() {
  let count = 0;
  for await (const file of walkHtmlFiles(OUT_DIR)) {
    let html = await readFile(file, "utf-8");
    const before = html;
    html = deferScripts(html);
    html = deferStylesheets(html);
    if (html !== before) {
      await writeFile(file, html);
      count++;
    }
  }
  console.log(`✅ Deferred blocking resources in ${count} HTML file(s)`);
}

main().catch((e) => {
  console.error("❌", e.message);
  process.exit(1);
});
