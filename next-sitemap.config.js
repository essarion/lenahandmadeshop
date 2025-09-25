/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://red-bud.ru',
    generateRobotsTxt: true,
    exclude: ['/login', '/register', '/cart'],
    additionalPaths: async () => [
        { loc: '/', changefreq: 'daily', priority: 1 },
        { loc: '/category/candles', changefreq: 'weekly', priority: 0.8 },
        { loc: '/category/plaster-products', changefreq: 'weekly', priority: 0.8 },
    ],
};
