import { supabase, Article } from '@/lib/supabase'
import { catColor, CAT_EMOJI, timeAgo } from '@/lib/helpers'
import Ticker from '@/components/public/Ticker'
import CountdownTimer from '@/components/public/CountdownTimer'

export const revalidate = 0

async function getArticles(): Promise<Article[]> {
  const { data } = await supabase
    .from('articles').select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false })
  return (data as Article[]) || []
}

export default async function HomePage() {
  const articles = await getArticles()
  const hero = articles[0]
  const sideArts = articles.slice(1, 4)
  const gridArts = articles.slice(0, 6)
  const wcArts = articles.filter(a => a.is_world_cup).slice(0, 4)

  return (
    <div style={{ background: 'var(--black)', minHeight: '100vh', color: 'var(--text)', fontFamily: "'Inter',sans-serif" }}>

      {/* NAV */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border)', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60 }}>
        <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 28, letterSpacing: 2, color: '#fff' }}>
          VANESA<span style={{ color: 'var(--green)' }}>BOLA</span>
        </div>
        <div style={{ display: 'flex', gap: 24 }}>
          {['Liga Indonesia', 'Liga Eropa', 'UCL', '🏆 Piala Dunia', 'Transfer', 'Statistik'].map(item => (
            <a key={item} href="#" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: 13, fontWeight: 600, textTransform: 'uppercase' }}>
              {item}
              {item.includes('Piala') && <span style={{ background: 'var(--green)', color: '#000', fontSize: 9, fontWeight: 800, padding: '2px 5px', borderRadius: 3, marginLeft: 4 }}>HOT</span>}
            </a>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700, color: 'var(--red)' }}>
          <span className="pulse-dot" style={{ width: 7, height: 7, background: 'var(--red)', borderRadius: '50%', display: 'inline-block' }} />
          LIVE
        </div>
      </nav>

      <Ticker articles={articles} />

      {/* HERO */}
      {hero && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 2, maxWidth: 1280, margin: '24px auto', padding: '0 24px' }}>
          <div style={{ background: 'linear-gradient(160deg,#0f2d1a,#0A0A0A)', border: '1px solid var(--border)', borderRadius: 4, position: 'relative', overflow: 'hidden', padding: 40, minHeight: 320 }}>
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {sideArts.map(a => (
              <div key={a.id} style={{ flex: 1, background: 'var(--card)', border: '1px solid var(--border)', padding: 20, position: 'relative', overflow: 'hidden' }}>
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
      )}

      {/* WORLD CUP */}
      {wcArts.length > 0 && (
        <div style={{ background: 'linear-gradient(135deg,#1a1200,#2d2000,#0A0A0A)', borderTop: '2px solid var(--gold)', borderBottom: '2px solid var(--gold)', padding: '40px 24px', margin: '24px 0' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 44, letterSpacing: 3, color: 'var(--gold)' }}>
                🏆 <span style={{ color: '#fff' }}>PIALA DUNIA</span> 2026
              </div>
              <CountdownTimer />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
              {wcArts.map(a => (
                <div key={a.id} style={{ background: 'rgba(255,215,0,0.04)', border: '1px solid rgba(255,215,0,0.15)', borderRadius: 6, overflow: 'hidden' }}>
                  {a.image
                    ? <img src={a.image} alt={a.title} style={{ width: '100%', height: 130, objectFit: 'cover' }} />
                    : <div style={{ height: 130, background: '#1a1200', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48 }}>🏆</div>
                  }
                  <div style={{ padding: 16 }}>
                    <span style={{ background: 'var(--gold)', color: '#000', fontSize: 9, fontWeight: 800, padding: '2px 8px', borderRadius: 2, display: 'inline-block', marginBottom: 8 }}>PIALA DUNIA</span>
                    <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 14, fontWeight: 700, color: '#fff', lineHeight: 1.3, marginBottom: 8 }}>{a.title}</div>
                    <div style={{ fontSize: 11, color: 'var(--muted)' }}>{timeAgo(a.created_at)} • {a.views}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ARTICLE GRID */}
      <div style={{ maxWidth: 1280, margin: '0 auto 48px', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, paddingBottom: 12, borderBottom: '1px solid var(--border)' }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 28, letterSpacing: 2, color: '#fff', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 4, height: 28, background: 'var(--green)', borderRadius: 2, display: 'inline-block' }} />
            Berita Terbaru
          </div>
          <a href="#" style={{ fontSize: 12, fontWeight: 700, color: 'var(--green)', textDecoration: 'none' }}>Lihat Semua →</a>
        </div>
        {gridArts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--muted)' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>⚽</div>
            <p>Belum ada artikel. Tambahkan dari panel admin.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
            {gridArts.map(a => (
              <div key={a.id} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ height: 180, background: 'linear-gradient(135deg,#1a2f1a,#0d1f0d)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 56, position: 'relative', overflow: 'hidden' }}>
                  {a.image
                    ? <img src={a.image} alt={a.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                    : <span>{CAT_EMOJI[a.category] || '⚽'}</span>
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
        )}
      </div>

      {/* FOOTER */}
      <footer style={{ background: 'var(--dark)', borderTop: '1px solid var(--border)', padding: '32px 24px', textAlign: 'center' }}>
        <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 32, color: '#fff', letterSpacing: 3, marginBottom: 8 }}>
          VANESA<span style={{ color: 'var(--green)' }}>BOLA</span>
        </div>
        <p style={{ color: 'var(--muted)', fontSize: 13 }}>Berita bola terkini, terpercaya, dan terlengkap.</p>
        <p style={{ color: 'var(--muted)', fontSize: 12, marginTop: 12 }}>
          © 2026 VanesaBola · <a href="/gz-admin/login" style={{ color: 'var(--green)', textDecoration: 'none' }}>Admin</a>
        </p>
      </footer>
    </div>
  )
}