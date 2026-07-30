/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://unity-pay.pages.dev",
  generateRobotsTxt: true,
  changefreq: "monthly",
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ["/404*", "/_not-found*"],
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/" }],
  },
  transform: async (config, path) => {
    // 匹配根路径或任何语言前缀（带或不带尾部斜杠）
    if (path === "/" || path.match(/^\/(en|zh|zh-TW)(\/)?$/)) {
      return {
        loc: path,
        changefreq: "weekly",
        priority: 1.0,
        lastmod: new Date().toISOString(),
      };
    }
    return {
      loc: path,
      changefreq: "monthly",
      priority: 0.7,
      lastmod: new Date().toISOString(),
    };
  },
};