import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { cookies } from 'next/headers'

async function isAdmin() {
  const c = await cookies()
  return c.get('gz_admin_token')?.value === process.env.NEXTAUTH_SECRET
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const isAdminReq = searchParams.get('admin') === '1'
  let query = supabase.from('articles').select('*').order('created_at', { ascending: false })
  if (!isAdminReq || !await isAdmin()) query = query.eq('status', 'published')
  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ articles: data })
}

export async function POST(req: NextRequest) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  if (!body.title) return NextResponse.json({ error: 'Judul wajib diisi' }, { status: 400 })
  const { data, error } = await supabase.from('articles').insert([{
    title: body.title, excerpt: body.excerpt || '', content: body.content || '',
    category: body.category || 'Umum', status: body.status || 'draft',
    author: body.author || 'Admin', image: body.image || '',
    views: body.views || '0', is_world_cup: body.is_world_cup || false,
    updated_at: new Date().toISOString()
  }]).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ article: data }, { status: 201 })
}
