/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://ashmaig.com", // ✅ keep your domain here
  generateRobotsTxt: true,        // generates robots.txt
  sitemapSize: 7000,
  changefreq: "weekly",
  priority: 0.7,
  exclude: ["/_not-found"],       // optional: exclude error pages
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" }, // allow all bots
    ],
  },
};