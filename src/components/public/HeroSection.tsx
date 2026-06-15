'use client'
import Link from 'next/link'
import { Article } from '@/lib/supabase'
import { catColor, timeAgo } from '@/lib/helpers'
import { toSlug } from '@/lib/slug'

export default function HeroSection({ hero, sideArts }: { hero: Article; sideArts: Article[] }) {
  return (
    <div className="hero-grid">
      {/* HERO MAIN */}
      <Link href={`/artikel/${toSlug(hero.title, hero.id)}`} style={{ textDecoration: 'none' }}>
        <div style={{ background: 'linear-gradient(160deg,#0f2d1a,#0A0A0A)', border: '1px solid var(--border)', borderRadius: 4, position: 'relative', overflow: 'hidden', padding: '32px 24px', minHeight: 280, cursor: 'pointer', display: 'block' }}>
          {hero.image && <img src={hero.image} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.2 }} />}
          <div style={{ position: 'relative', zIndex: 1 }}>
            <span style={{ background: 'var(--green)', color: '#000', fontSize: 10, fontWeight: 800, padding: '3px 10px', borderRadius: 2, textTransform: 'uppercase', letterSpacing: 1, display: 'inline-block', marginBottom: 12 }}>🔥 Berita Utama</span>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(22px, 4vw, 36px)', fontWeight: 900, lineHeight: 1.15, color: '#fff', marginBottom: 12 }}>{hero.title}</h1>
            <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.6, marginBottom: 16 }}>{hero.excerpt}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, color: 'var(--muted)', flexWrap: 'wrap' }}>
              <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#000', fontSize: 11 }}>{hero.author[0]}</div>
              <strong style={{ color: '#E8E8E8' }}>{hero.author}</strong>
              <span>•</span><span>{timeAgo(hero.created_at)}</span>
              <span>•</span><span>👁 {hero.views}</span>
            </div>
          </div>
        </div>
      </Link>

      {/* SIDE ARTICLES */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {sideArts.map(a => (
          <Link key={a.id} href={`/artikel/${toSlug(a.title, a.id)}`} style={{ textDecoration: 'none', flex: 1 }}>
            <div style={{ background: 'var(--card)', border: '1px solid var(--border)', padding: 16, position: 'relative', overflow: 'hidden', cursor: 'pointer', height: '100%' }}>
              {a.image && <img src={a.image} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.12 }} />}
              <div style={{ position: 'relative', zIndex: 1 }}>
                <span style={{ background: catColor(a.category), color: '#000', fontSize: 9, fontWeight: 800, padding: '2px 8px', borderRadius: 2, textTransform: 'uppercase', display: 'inline-block', marginBottom: 8 }}>{a.category}</span>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 15, fontWeight: 700, color: '#fff', lineHeight: 1.3, marginBottom: 6 }}>{a.title}</div>
                <div style={{ fontSize: 11, color: 'var(--muted)' }}>{timeAgo(a.created_at)} • {a.views} views</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}