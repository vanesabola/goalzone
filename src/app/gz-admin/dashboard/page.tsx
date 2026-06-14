import { redirect } from 'next/navigation'
import { isAdminLoggedIn } from '@/lib/auth'
import { supabase, Article } from '@/lib/supabase'
import DashboardClient from './DashboardClient'

async function getArticles(): Promise<Article[]> {
  const { data } = await supabase.from('articles').select('*').order('created_at', { ascending: false })
  return (data as Article[]) || []
}

export default async function AdminDashboardPage() {
  if (!await isAdminLoggedIn()) redirect('/gz-admin/login')
  const articles = await getArticles()
  return <DashboardClient initialArticles={articles} />
}
