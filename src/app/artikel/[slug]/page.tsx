import { notFound } from 'next/navigation'
import { supabase, Article } from '@/lib/supabase'
import { catColor, timeAgo } from '@/lib/helpers'
import { getIdFromSlug, toSlug } from '@/lib/slug'
import type { Metadata } from 'next'
import Link from 'next/link'

export const revalidate = 0

async function getArticle(id: number): Promise<Article | null> {
  const { data } = await supabase
    .from('articles').select('*').eq('id', id).eq('status', 'published').single()
  return data as Article | null
}

async function getRelated(category: string, id: number): Promise<Article[]> {
  const { data } = await supabase
    .from('articles').select('*')
    .eq('status', 'published')
    .eq('category', category)
    .neq('id', id)
    .limit(3)
  return (data as Article[]) || []
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const id = getIdFromSlug(slug)
  const article = await getArticle(id)
  if (!article) return { title: 'Artikel Tidak Ditemukan | VanesaBola' }

  return {
    title: `${article.title} | VanesaBola`,
    description: article.excerpt,
    alternates: {
      canonical: `https://www.vanesabola.xyz/artikel/${toSlug(article.title, article.id)}`,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `https://www.vanesabola.xyz/artikel/${toSlug(article.title, article.id)}`,
      siteName: 'VanesaBola',
      type: 'article',
      locale: 'id_ID',
      ...(article.image ? { images: [{ url: article.image, width: 1200, height: 630, alt: article.title }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      ...(article.image ? { images: [article.image] } : {}),
    },
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const id = getIdFromSlug(slug)
  const article = await getArticle(id)
  if (!article) notFound()

  const related = await getRelated(article.category, article.id)

  return (
    <div style={{ background: 'var(--black)', minHeight: '100vh', color: 'var(--text)', fontFamily: "'Inter',sans-serif" }}>

      {/* NAV */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border)', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60 }}>
        <Link href="/" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 28, letterSpacing: 2, color: '#fff', textDecoration: 'none' }}>
          VANESA<span style={{ color: 'var(--green)' }}>BOLA</span>
        </Link>
        <div style={{ display: 'flex', gap: 24 }}>
          {['Liga Indonesia', 'Liga Eropa', 'UCL', '🏆 Piala Dunia', 'Transfer'].map(item => (
            <a key={item} href="/" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: 13, fontWeight: 600, textTransform: 'uppercase' }}>{item}</a>
          ))}
        </div>
        <Link href="/" style={{ fontSize: 12, color: 'var(--green)', textDecoration: 'none', fontWeight: 600 }}>← Kembali</Link>
      </nav>

      {/* ARTICLE */}
      <div style={{ maxWidth: 820, margin: '40px auto', padding: '0 24px' }}>

        {/* Breadcrumb */}
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 24, display: 'flex', gap: 8, alignItems: 'center' }}>
          <Link href="/" style={{ color: 'var(--green)', textDecoration: 'none' }}>Home</Link>
          <span>›</span>
          <span style={{ color: catColor(article.category) }}>{article.category}</span>
          <span>›</span>
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 300 }}>{article.title}</span>
        </div>

        {/* Category */}
        <span style={{ background: catColor(article.category), color: '#000', fontSize: 11, fontWeight: 800, padding: '4px 12px', borderRadius: 3, textTransform: 'uppercase', letterSpacing: 1, display: 'inline-block', marginBottom: 20 }}>
          {article.category}
          {article.is_world_cup && ' 🏆'}
        </span>

        {/* Title */}
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 40, fontWeight: 900, color: '#fff', lineHeight: 1.15, marginBottom: 20 }}>
          {article.title}
        </h1>

        {/* Meta */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 13, color: 'var(--muted)', marginBottom: 32, paddingBottom: 24, borderBottom: '1px solid var(--border)' }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#000', fontSize: 14, flexShrink: 0 }}>
            {article.author[0]}
          </div>
          <div>
            <div style={{ fontWeight: 600, color: 'var(--text)' }}>{article.author}</div>
            <div style={{ fontSize: 11 }}>{timeAgo(article.created_at)} • 👁 {article.views} views</div>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
            <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(`https://www.vanesabola.xyz/artikel/${toSlug(article.title, article.id)}`)}`}
              target="_blank" rel="noopener"
              style={{ background: '#1da1f2', color: '#fff', fontSize: 11, fontWeight: 700, padding: '5px 12px', borderRadius: 4, textDecoration: 'none' }}>
              𝕏 Share
            </a>
            <a href={`https://wa.me/?text=${encodeURIComponent(article.title + ' ' + `https://www.vanesabola.xyz/artikel/${toSlug(article.title, article.id)}`)}`}
              target="_blank" rel="noopener"
              style={{ background: '#25d366', color: '#fff', fontSize: 11, fontWeight: 700, padding: '5px 12px', borderRadius: 4, textDecoration: 'none' }}>
              WhatsApp
            </a>
          </div>
        </div>

        {/* Hero Image */}
        {article.image && (
          <img src={article.image} alt={article.title}
            style={{ width: '100%', maxHeight: 460, objectFit: 'cover', borderRadius: 8, marginBottom: 32, display: 'block' }} />
        )}

        {/* Excerpt */}
        <p style={{ fontSize: 18, color: '#bbb', lineHeight: 1.7, marginBottom: 28, fontStyle: 'italic', borderLeft: '3px solid var(--green)', paddingLeft: 20 }}>
          {article.excerpt}
        </p>

        {/* Content */}
        <div style={{ fontSize: 17, color: '#ccc', lineHeight: 1.9 }}>
          {article.content.split('\n').filter(p => p.trim()).map((p, i) => (
            <p key={i} style={{ marginBottom: 20 }}>{p}</p>
          ))}
        </div>

        {/* Tags */}
        <div style={{ marginTop: 40, paddingTop: 24, borderTop: '1px solid var(--border)', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>Tags:</span>
          {[article.category, 'Sepak Bola', 'Berita Bola'].map(tag => (
            <span key={tag} style={{ background: 'var(--card)', border: '1px solid var(--border)', color: 'var(--muted)', fontSize: 11, padding: '3px 10px', borderRadius: 20 }}>{tag}</span>
          ))}
        </div>
      </div>

      {/* RELATED ARTICLES */}
      {related.length > 0 && (
        <div style={{ maxWidth: 820, margin: '48px auto', padding: '0 24px 48px' }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 24, letterSpacing: 2, color: '#fff', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 4, height: 24, background: 'var(--green)', borderRadius: 2, display: 'inline-block' }} />
            Artikel Terkait
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
            {related.map(a => (
              <Link key={a.id} href={`/artikel/${toSlug(a.title, a.id)}`} style={{ textDecoration: 'none' }}>
                <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 6, overflow: 'hidden', transition: 'border-color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--green)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}>
                  <div style={{ height: 120, background: '#1a2f1a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, position: 'relative', overflow: 'hidden' }}>
                    {a.image ? <img src={a.image} alt={a.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} /> : <span>⚽</span>}
                  </div>
                  <div style={{ padding: 12 }}>
                    <span style={{ background: catColor(a.category), color: '#000', fontSize: 9, fontWeight: 800, padding: '2px 6px', borderRadius: 2, textTransform: 'uppercase', display: 'inline-block', marginBottom: 6 }}>{a.category}</span>
                    <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 13, fontWeight: 700, color: '#fff', lineHeight: 1.3 }}>{a.title}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer style={{ background: 'var(--dark)', borderTop: '1px solid var(--border)', padding: '24px', textAlign: 'center' }}>
        <Link href="/" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 28, color: '#fff', letterSpacing: 3, textDecoration: 'none' }}>
          VANESA<span style={{ color: 'var(--green)' }}>BOLA</span>
        </Link>
        <p style={{ color: 'var(--muted)', fontSize: 12, marginTop: 8 }}>© 2026 VanesaBola</p>
      </footer>
    </div>
  )
}