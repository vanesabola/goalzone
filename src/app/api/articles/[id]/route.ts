import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { cookies } from 'next/headers'

async function isAdmin() {
  const c = await cookies()
  return c.get('gz_admin_token')?.value === process.env.NEXTAUTH_SECRET
}

type Ctx = { params: Promise<{ id: string }> }

export async function GET(_req: NextRequest, ctx: Ctx) {
  const { id } = await ctx.params
  const { data, error } = await supabase.from('articles').select('*').eq('id', id).single()
  if (error) return NextResponse.json({ error: 'Tidak ditemukan' }, { status: 404 })
  return NextResponse.json({ article: data })
}

export async function PUT(req: NextRequest, ctx: Ctx) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await ctx.params
  const body = await req.json()
  const { data, error } = await supabase.from('articles')
    .update({ ...body, updated_at: new Date().toISOString() })
    .eq('id', id).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ article: data })
}

export async function DELETE(_req: NextRequest, ctx: Ctx) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await ctx.params
  const { error } = await supabase.from('articles').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
