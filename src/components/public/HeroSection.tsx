'use client'
import { useState } from 'react'
import { Article } from '@/lib/supabase'
import { catColor, timeAgo } from '@/lib/helpers'

export default function HeroSection({ hero, sideArts }: { hero: Article; sideArts: Article[] }) {
  const [selected, setSelected] = useState<Article | null>(null)

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 2, maxWidth: 1280, margin: '24px auto', padding: '0 24px' }}>
        {/* HERO MAIN */}
        <div
          onClick={() => setSelected(hero)}
          style={{ background: 'linear-gradient(160deg,#0f2d1a,#0A0A0A)', border: '1px solid var(--border)', borderRadius: 4, position: 'relative', overflow: 'hidden', padding: 40, minHeight: 320, cursor: 'pointer' }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--green)')}
          onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
        >
          {hero.image && <img src={hero.image} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.2 }} />}
          <div style={{ position: 'relative', zIndex: 1 }}>
            <span style={{ background: 'var(--green)', color: '#000', fontSize: 10, fontWeight: 800, padding: '3px 10px', borderRadius: 2, textTransform: 'uppercase', letterSpacing: 1, display: 'inline-block', marginBottom: 16 }}>🔥 Berita Utama</span>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 36, fontWeight: 900, lineHeight: 1.15, color: '#fff', marginBottom: 16 }}>{hero.title}</h1>
            <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 20 }}>{hero.excerpt}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 12, color: 'var(--muted)' }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#000', fontSize: 12 }}>{hero.author[0]}</div>
              <strong style={{ color: 'var(--text)' }}>{hero.author}</strong>
              <span>•</span><span>{timeAgo(hero.created_at)}</span>
              <span>•</span><span>👁 {hero.views}</span>
            </div>
          </div>
        </div>

        {/* SIDE ARTICLES */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {sideArts.map(a => (
            <div key={a.id}
              onClick={() => setSelected(a)}
              style={{ flex: 1, background: 'var(--card)', border: '1px solid var(--border)', padding: 20, position: 'relative', overflow: 'hidden', cursor: 'pointer' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--green)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
            >
              {a.image && <img src={a.image} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.12 }} />}
              <div style={{ position: 'relative', zIndex: 1 }}>
                <span style={{ background: catColor(a.category), color: '#000', fontSize: 9, fontWeight: 800, padding: '2px 8px', borderRadius: 2, textTransform: 'uppercase', display: 'inline-block', marginBottom: 8 }}>{a.category}</span>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, fontWeight: 700, color: '#fff', lineHeight: 1.3, marginBottom: 6 }}>{a.title}</div>
                <div style={{ fontSize: 11, color: 'var(--muted)' }}>{timeAgo(a.created_at)} • {a.views} views</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {selected && (
        <div
          onClick={e => { if (e.target === e.currentTarget) setSelected(null) }}
          style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '32px 16px', overflowY: 'auto' }}
        >
          <div style={{ background: 'var(--dark)', border: '1px solid var(--border)', borderRadius: 10, width: '100%', maxWidth: 760, position: 'relative' }}>
            <button onClick={() => setSelected(null)} style={{ position: 'absolute', top: 16, right: 16, zIndex: 10, background: 'var(--border)', border: 'none', color: 'var(--text)', width: 32, height: 32, borderRadius: '50%', fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
            {selected.image && <img src={selected.image} alt={selected.title} style={{ width: '100%', height: 280, objectFit: 'cover', borderRadius: '10px 10px 0 0' }} />}
            <div style={{ padding: '28px 32px 40px' }}>
              <span style={{ background: catColor(selected.category), color: '#000', fontSize: 10, fontWeight: 800, padding: '3px 10px', borderRadius: 3, textTransform: 'uppercase', display: 'inline-block', marginBottom: 16 }}>{selected.category}</span>
              <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 900, color: '#fff', lineHeight: 1.2, marginBottom: 16 }}>{selected.title}</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 12, color: 'var(--muted)', marginBottom: 28, paddingBottom: 20, borderBottom: '1px solid var(--border)' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#000', fontSize: 12, flexShrink: 0 }}>{selected.author[0]}</div>
                <strong style={{ color: 'var(--text)' }}>{selected.author}</strong>
                <span>•</span><span>{timeAgo(selected.created_at)}</span>
                <span>•</span><span>👁 {selected.views}</span>
                {selected.is_world_cup && <><span>•</span><span style={{ color: 'var(--gold)' }}>🏆 Piala Dunia</span></>}
              </div>
              <div style={{ fontSize: 16, color: '#ccc', lineHeight: 1.9 }}>
                {selected.content.split('\n').filter(p => p.trim()).map((p, i) => (
                  <p key={i} style={{ marginBottom: 16 }}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}