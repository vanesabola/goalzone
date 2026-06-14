import { MetadataRoute } from 'next'
import { supabase } from '@/lib/supabase'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data: articles } = await supabase
    .from('articles')
    .select('id, updated_at')
    .eq('status', 'published')

  const articleUrls = (articles || []).map(a => ({
    url: `https://www.vanesabola.xyz/artikel/${a.id}`,
    lastModified: new Date(a.updated_at),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }))

  return [
    {
      url: 'https://www.vanesabola.xyz',
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 1,
    },
    ...articleUrls,
  ]
}