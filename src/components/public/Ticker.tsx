'use client'
import { Article } from '@/lib/supabase'

export default function Ticker({ articles }: { articles: Article[] }) {
  const items = articles.length > 0
    ? articles.map(a => `⚽ ${a.title}`)
    : ['⚽ Selamat datang di GoalZone!', '🏆 Berita bola terkini setiap hari']
  const all = [...items, ...items]
  return (
    <div style={{ background: 'var(--green)', color: '#000', fontSize: 12, fontWeight: 700, padding: '6px 0', overflow: 'hidden', whiteSpace: 'nowrap' }}>
      <div className="ticker-scroll">
        {all.map((item, i) => <span key={i} style={{ margin: '0 40px' }}>{item}</span>)}
      </div>
    </div>
  )
}
