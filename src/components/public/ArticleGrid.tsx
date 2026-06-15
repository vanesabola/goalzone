'use client'
import Link from 'next/link'
import { Article } from '@/lib/supabase'
import { catColor, timeAgo } from '@/lib/helpers'
import { toSlug } from '@/lib/slug'

export default function ArticleGrid({ articles }: { articles: Article[] }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
      {articles.map(a => (
        <Link key={a.id} href={`/artikel/${toSlug(a.title, a.id)}`} style={{ textDecoration: 'none' }}>
          <div
            style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 4, overflow: 'hidden', cursor: 'pointer', transition: 'border-color 0.2s, transform 0.2s', height: '100%' }}
            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--green)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)' }}
          >
            <div style={{ height: 180, background: 'linear-gradient(135deg,#1a2f1a,#0d1f0d)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 56, position: 'relative', overflow: 'hidden' }}>
              {a.image
                ? <img src={a.image} alt={a.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                : <span>⚽</span>
              }
            </div>
            <div style={{ padding: 16 }}>
              <span style={{ background: catColor(a.category) + '22', color: catColor(a.category), border: `1px solid ${catColor(a.category)}44`, fontSize: 10, fontWeight: 800, padding: '2px 8px', borderRadius: 3, textTransform: 'uppercase', display: 'inline-block', marginBottom: 8 }}>{a.category}</span>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, fontWeight: 700, color: '#fff', lineHeight: 1.35, marginBottom: 8 }}>{a.title}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6, marginBottom: 12, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{a.excerpt}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--muted)', paddingTop: 10, borderTop: '1px solid var(--border)' }}>
                <span>{timeAgo(a.created_at)}</span><span>👁 {a.views}</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}