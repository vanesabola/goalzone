import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export type Article = {
  id: number
  title: string
  excerpt: string
  content: string
  category: string
  status: 'published' | 'draft'
  author: string
  image: string
  views: string
  is_world_cup: boolean
  created_at: string
  updated_at: string
}
