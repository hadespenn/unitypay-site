/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://unity-pay.pages.dev",
  generateRobotsTxt: true,
  // `next-sitemap` runs after `next build`. With `output: "export"`,
  // Cloudflare Pages deploys `out`, so write SEO files into that artifact.
  outDir: "out",
  // 不指定 sourceDir，默认就是 .next（自动读取路由）
  changefreq: "monthly",
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ["/404*", "/_not-found*"],
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/" }],
  },
  transform: async (config, path) => {
    if (path === "/" || path.match(/^\/(en|zh|zh-TW)(\/)?$/)) {
      return { loc: path, changefreq: "weekly", priority: 1.0, lastmod: new Date().toISOString() };
    }
    return { loc: path, changefreq: "monthly", priority: 0.7, lastmod: new Date().toISOString() };
  },
};