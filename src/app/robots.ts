import { MetadataRoute } from 'next';
import { DOMAIN_URL } from '@/config';


export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: `${DOMAIN_URL}/sitemap.xml`,
  };
}
