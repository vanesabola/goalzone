import { redirect } from 'next/navigation'
import { isAdminLoggedIn } from '@/lib/auth'
import LoginForm from './LoginForm'

export default async function AdminLoginPage() {
  if (await isAdminLoggedIn()) redirect('/gz-admin/dashboard')
  return (
    <div style={{ fontFamily: "'Inter',sans-serif", background: '#0A0A0A', minHeight: '100vh', display: 'flex' }}>
      <style>{`
        @media (max-width: 768px) {
          .login-left { display: none !important; }
          .login-right { width: 100% !important; padding: 32px 24px !important; }
        }
      `}</style>

      {/* LEFT - hidden on mobile */}
      <div className="login-left" style={{ flex: 1, background: 'linear-gradient(160deg,#062010,#0a0a0a)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 40px', borderRight: '1px solid #252525', position: 'relative', overflow: 'hidden' }}>
        <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 64, letterSpacing: 6, color: '#fff', marginBottom: 8 }}>
          VANESA<span style={{ color: '#00C853' }}>BOLA</span>
        </div>
        <div style={{ fontSize: 13, color: '#888', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 60 }}>Admin Control Panel</div>
        {[{ icon: '📰', lbl: 'Kelola Artikel' }, { icon: '🏆', lbl: 'Berita Piala Dunia' }, { icon: '🖼️', lbl: 'Upload Gambar AI' }].map(s => (
          <div key={s.lbl} style={{ display: 'flex', alignItems: 'center', gap: 14, background: 'rgba(255,255,255,0.03)', border: '1px solid #252525', borderRadius: 8, padding: '14px 18px', width: '100%', maxWidth: 260, marginBottom: 16 }}>
            <span style={{ fontSize: 24 }}>{s.icon}</span>
            <div style={{ fontSize: 13, color: '#888' }}>{s.lbl}</div>
          </div>
        ))}
        <div style={{ position: 'absolute', right: -80, bottom: -80, fontSize: 400, opacity: 0.03, pointerEvents: 'none' }}>⚽</div>
      </div>

      {/* RIGHT */}
      <div className="login-right" style={{ width: 480, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 48, background: '#111' }}>
        <div style={{ width: '100%', maxWidth: 400 }}>
          {/* Mobile logo */}
          <div style={{ textAlign: 'center', marginBottom: 32, display: 'none' }} className="mobile-logo">
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 40, letterSpacing: 4, color: '#fff' }}>
              VANESA<span style={{ color: '#00C853' }}>BOLA</span>
            </div>
            <div style={{ fontSize: 11, color: '#888', letterSpacing: 2, textTransform: 'uppercase' }}>Admin Panel</div>
          </div>
          <style>{`@media (max-width: 768px) { .mobile-logo { display: block !important; } }`}</style>

          <div style={{ fontSize: 26, fontWeight: 700, color: '#fff', marginBottom: 4 }}>Masuk ke Admin</div>
          <div style={{ fontSize: 14, color: '#888', marginBottom: 28 }}>Panel pengelolaan konten VanesaBola</div>
          <div style={{ background: 'rgba(0,200,83,0.08)', border: '1px solid rgba(0,200,83,0.25)', borderRadius: 6, padding: '10px 14px', marginBottom: 28, display: 'flex', alignItems: 'center', fontSize: 12, fontFamily: 'monospace', color: '#00C853' }}>
            🔐 /gz-admin/login
            <span style={{ marginLeft: 'auto', fontFamily: 'Inter', fontSize: 11, color: '#888' }}>SECRET PATH</span>
          </div>
          <LoginForm />
          <div style={{ marginTop: 24, textAlign: 'center', fontSize: 12 }}>
            <a href="/" style={{ color: '#00C853', textDecoration: 'none' }}>← Kembali ke situs</a>
          </div>
        </div>
      </div>
    </div>
  )
}