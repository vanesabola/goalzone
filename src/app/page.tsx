import { supabase, Article } from '@/lib/supabase'
import { catColor, timeAgo } from '@/lib/helpers'
import Ticker from '@/components/public/Ticker'
import CountdownTimer from '@/components/public/CountdownTimer'
import HeroSection from '@/components/public/HeroSection'
import ArticleGrid from '@/components/public/ArticleGrid'
import CloakLink from '@/components/public/CloakLink'

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
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border)', padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56, gap: 12 }}>
        <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 26, letterSpacing: 2, color: '#fff', flexShrink: 0 }}>
          VANESA<span style={{ color: 'var(--green)' }}>BOLA</span>
        </div>
        <div className="nav-links">
          {['Liga Indonesia', 'Liga Eropa', 'UCL', '🏆 Piala Dunia', 'Transfer'].map(item => (
            <a key={item} href="#" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: 12, fontWeight: 600, textTransform: 'uppercase' }}>
              {item}
              {item.includes('Piala') && <span style={{ background: 'var(--green)', color: '#000', fontSize: 8, fontWeight: 800, padding: '2px 4px', borderRadius: 3, marginLeft: 4 }}>HOT</span>}
            </a>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700, color: 'var(--red)', marginRight: 4 }}>
            <span className="pulse-dot" style={{ width: 7, height: 7, background: 'var(--red)', borderRadius: '50%', display: 'inline-block' }} />
            <span className="nav-links" style={{ display: 'none' }}>LIVE</span>
            <span style={{ display: 'block' }}>LIVE</span>
          </div>
          <CloakLink href="https://vanesa4d.dev/login" style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', padding: '6px 14px', borderRadius: 6, border: '1px solid var(--border)', background: 'var(--card)', whiteSpace: 'nowrap' }}>
            Masuk
          </CloakLink>
          <CloakLink href="https://vanesa4d.dev/daftar" style={{ fontSize: 12, fontWeight: 700, color: '#000', padding: '6px 14px', borderRadius: 6, background: 'var(--green)', whiteSpace: 'nowrap' }}>
            Daftar
          </CloakLink>
        </div>
      </nav>

      <Ticker articles={articles} />

      {/* BANNER */}
      <div style={{ position: 'relative', overflow: 'hidden', height: 200 }}>
        <img
          src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1400&q=80"
          alt="Football Banner"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.7) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', padding: '0 40px', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(28px,5vw,52px)', color: '#fff', letterSpacing: 3, lineHeight: 1, marginBottom: 8 }}>
              BERITA BOLA <span style={{ color: 'var(--green)' }}>TERKINI</span>
            </div>
            <div style={{ fontSize: 'clamp(12px,2vw,15px)', color: '#ccc', fontWeight: 500 }}>
              Liga Indonesia · Liga Eropa · UCL · Piala Dunia 2026
            </div>
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(36px,6vw,72px)', color: 'var(--green)', lineHeight: 1 }}>⚽</div>
            <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 2 }}>VanesaBola</div>
          </div>
        </div>
      </div>
      {hero && <HeroSection hero={hero} sideArts={sideArts} />}

      {/* WORLD CUP */}
      {wcArts.length > 0 && (
        <div style={{ background: 'linear-gradient(135deg,#1a1200,#2d2000,#0A0A0A)', borderTop: '2px solid var(--gold)', borderBottom: '2px solid var(--gold)', padding: '32px 16px', margin: '24px 0' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 36, letterSpacing: 3, color: 'var(--gold)' }}>
                🏆 <span style={{ color: '#fff' }}>PIALA DUNIA</span> 2026
              </div>
              <CountdownTimer />
            </div>
            <div className="wc-grid-4">
              {wcArts.map(a => (
                <div key={a.id} style={{ background: 'rgba(255,215,0,0.04)', border: '1px solid rgba(255,215,0,0.15)', borderRadius: 6, overflow: 'hidden' }}>
                  {a.image
                    ? <img src={a.image} alt={a.title} style={{ width: '100%', height: 130, objectFit: 'cover' }} />
                    : <div style={{ height: 130, background: '#1a1200', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48 }}>🏆</div>
                  }
                  <div style={{ padding: 14 }}>
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
      <div style={{ maxWidth: 1280, margin: '0 auto 48px', padding: '0 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, paddingBottom: 12, borderBottom: '1px solid var(--border)' }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 24, letterSpacing: 2, color: '#fff', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 4, height: 24, background: 'var(--green)', borderRadius: 2, display: 'inline-block' }} />
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
          <ArticleGrid articles={gridArts} />
        )}
      </div>

      {/* FOOTER */}
      <footer style={{ background: 'var(--dark)', borderTop: '1px solid var(--border)', padding: '32px 16px', textAlign: 'center' }}>
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