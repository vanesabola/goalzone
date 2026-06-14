'use client'
import { useEffect, useState } from 'react'

export default function CountdownTimer() {
  const [t, setT] = useState({ d: '--', h: '--', m: '--', s: '--' })
  useEffect(() => {
    const target = new Date('2026-06-11T18:00:00')
    const upd = () => {
      const diff = target.getTime() - Date.now()
      if (diff <= 0) { setT({ d: '00', h: '00', m: '00', s: '00' }); return }
      setT({
        d: String(Math.floor(diff / 86400000)).padStart(2, '0'),
        h: String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0'),
        m: String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0'),
        s: String(Math.floor((diff % 60000) / 1000)).padStart(2, '0'),
      })
    }
    upd()
    const id = setInterval(upd, 1000)
    return () => clearInterval(id)
  }, [])

  const box = (val: string, lbl: string) => (
    <div style={{ textAlign: 'center', background: 'rgba(255,215,0,0.08)', border: '1px solid rgba(255,215,0,0.3)', borderRadius: 6, padding: '10px 16px' }}>
      <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 32, color: 'var(--gold)', display: 'block', lineHeight: 1 }}>{val}</span>
      <span style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1 }}>{lbl}</span>
    </div>
  )
  return (
    <div style={{ display: 'flex', gap: 12 }}>
      {box(t.d, 'Hari')}{box(t.h, 'Jam')}{box(t.m, 'Menit')}{box(t.s, 'Detik')}
    </div>
  )
}
