import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
            },
            {
                userAgent: '*',
                disallow: ['/login', '/register', '/cart'],
            },
        ],
        sitemap: 'https://red-bud.ru/sitemap.xml',
        host: 'red-bud.ru',
    };
}
