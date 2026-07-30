/**
 * Post-build script: defers render-blocking scripts & preloads fonts.
 *
 * 1. Adds `defer` to bare <script> tags that don't already have it.
 * 2. Extracts font file URLs from @font-face declarations and adds
 *    <link rel="preload" as="font" crossorigin> hints — this breaks the
 *    CSS → font critical request chain so fonts download in parallel
 *    with CSS parsing instead of after it.
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

/**
 * Find all font-file URLs in the HTML (e.g. /_next/static/media/abc123.woff2).
 * These are declared in @font-face blocks injected by next/font/google.
 */
function extractFontUrls(html) {
  const urls = new Set();
  // Match url(...) patterns containing font extensions
  const re = /url\(\s*(["']?)(\/_next\/static\/media\/[^)"']+\.(?:woff2|woff|ttf))\1\s*\)/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    urls.add(m[2]);
  }
  return [...urls];
}

/** Insert <link rel="preload" as="font"> tags after the opening <head> */
function insertFontPreloads(html, urls) {
  if (!urls.length) return html;
  const preloads = urls
    .map((u) => `  <link rel="preload" href="${u}" as="font" type="font/woff2" crossorigin="anonymous" />\n`)
    .join("");
  return html.replace(/<head>/, `<head>\n${preloads}`);
}

async function main() {
  let htmlFiles = 0;
  let fontCount = 0;

  for await (const file of walkHtmlFiles(OUT_DIR)) {
    let html = await readFile(file, "utf-8");

    // 1. Add defer to render-blocking <script> tags
    //    Matches: <script src="..." />, <script src="..." >, <script src="..." other attrs>
    //    Skips: scripts already having defer, async, type="module", or inline scripts
    html = html.replace(
      /<script\s+src=["'][^"']+["'][^>]*>/gi,
      (match) => {
        if (match.includes("defer") || match.includes("async")) return match;
        // type="module" scripts are deferred by spec
        if (match.includes('type="module"') || match.includes("type='module'")) return match;
        return match.replace(/>$/, " defer>");
      },
    );

    // 2. Preload font files (breaks CSS→font critical chain)
    const fontUrls = extractFontUrls(html);
    html = insertFontPreloads(html, fontUrls);

    await writeFile(file, html);
    htmlFiles++;
    fontCount += fontUrls.length;
  }

  console.log(`✅ ${htmlFiles} HTML files processed`);
  console.log(`✅ ${fontCount} font files preloaded`);
}

main().catch((e) => {
  console.error("❌", e.message);
  process.exit(1);
});
