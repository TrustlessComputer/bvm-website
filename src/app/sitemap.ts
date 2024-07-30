import { MetadataRoute } from 'next';
import { DOMAIN_URL } from '@/config';


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: `${DOMAIN_URL}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${DOMAIN_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    }
  ]
}
