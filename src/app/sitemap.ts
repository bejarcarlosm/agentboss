import type { MetadataRoute } from 'next';
import { DOSSIER_AGENTS } from '@/lib/dossier-data';

const BASE_URL = 'https://agentboss.cl';
const LOCALES = ['es', 'en'];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Landing pages
  for (const locale of LOCALES) {
    entries.push({
      url: `${BASE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    });
  }

  // Dossier pages
  for (const locale of LOCALES) {
    for (const agent of DOSSIER_AGENTS) {
      entries.push({
        url: `${BASE_URL}/${locale}/dossier/${agent.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    }
  }

  // Pipeline
  for (const locale of LOCALES) {
    entries.push({
      url: `${BASE_URL}/${locale}/pipeline`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    });
  }

  return entries;
}
