'use client'
import { useState } from 'react'
import { Article } from '@/lib/supabase'
import { catColor, timeAgo } from '@/lib/helpers'

export default function ArticleGrid({ articles }: { articles: Article[] }) {
  const [selected, setSelected] = useState<Article | null>(null)

  return (
    <>
      {/* GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
        {articles.map(a => (
          <div key={a.id}
            onClick={() => setSelected(a)}
            style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 4, overflow: 'hidden', cursor: 'pointer', transition: 'border-color 0.2s, transform 0.2s' }}
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
        ))}
      </div>

      {/* MODAL */}
      {selected && (
        <div
          onClick={e => { if (e.target === e.currentTarget) setSelected(null) }}
          style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '32px 16px', overflowY: 'auto' }}
        >
          <div style={{ background: 'var(--dark)', border: '1px solid var(--border)', borderRadius: 10, width: '100%', maxWidth: 760, position: 'relative' }}>
            {/* Close btn */}
            <button
              onClick={() => setSelected(null)}
              style={{ position: 'absolute', top: 16, right: 16, zIndex: 10, background: 'var(--border)', border: 'none', color: 'var(--text)', width: 32, height: 32, borderRadius: '50%', fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >✕</button>

            {/* Image */}
            {selected.image && (
              <img src={selected.image} alt={selected.title} style={{ width: '100%', height: 280, objectFit: 'cover', borderRadius: '10px 10px 0 0' }} />
            )}

            <div style={{ padding: '28px 32px 40px' }}>
              {/* Category */}
              <span style={{ background: catColor(selected.category), color: '#000', fontSize: 10, fontWeight: 800, padding: '3px 10px', borderRadius: 3, textTransform: 'uppercase', letterSpacing: 1, display: 'inline-block', marginBottom: 16 }}>
                {selected.category}
              </span>

              {/* Title */}
              <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 900, color: '#fff', lineHeight: 1.2, marginBottom: 16 }}>
                {selected.title}
              </h1>

              {/* Meta */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 12, color: 'var(--muted)', marginBottom: 28, paddingBottom: 20, borderBottom: '1px solid var(--border)' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#000', fontSize: 12, flexShrink: 0 }}>
                  {selected.author[0]}
                </div>
                <strong style={{ color: 'var(--text)' }}>{selected.author}</strong>
                <span>•</span>
                <span>{timeAgo(selected.created_at)}</span>
                <span>•</span>
                <span>👁 {selected.views}</span>
                {selected.is_world_cup && <><span>•</span><span style={{ color: 'var(--gold)' }}>🏆 Piala Dunia</span></>}
              </div>

              {/* Content */}
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