import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/gz-admin/', '/api/'],
      },
    ],
    sitemap: 'https://www.vanesabola.xyz/sitemap.xml',
    host: 'https://www.vanesabola.xyz',
  }
}