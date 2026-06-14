'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async () => {
    if (!username || !password) { setError('Isi username dan password!'); return }
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/admin-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      if (res.ok) { router.push('/gz-admin/dashboard'); router.refresh() }
      else { const d = await res.json(); setError(d.error || 'Login gagal') }
    } catch { setError('Koneksi gagal') }
    finally { setLoading(false) }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', background: '#1A1A1A', border: '1px solid #252525',
    borderRadius: 8, padding: '13px 14px', color: '#E8E8E8',
    fontSize: 14, outline: 'none', fontFamily: 'Inter',
  }

  return (
    <div>
      {error && (
        <div style={{ background: 'rgba(255,59,48,0.1)', border: '1px solid rgba(255,59,48,0.3)', borderRadius: 6, padding: '10px 14px', fontSize: 13, color: '#FF3B30', marginBottom: 20 }}>
          ⚠️ {error}
        </div>
      )}
      <div style={{ marginBottom: 20 }}>
        <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>Username</label>
        <input type="text" value={username} onChange={e => { setUsername(e.target.value); setError('') }}
          placeholder="Username admin" style={inputStyle} onKeyDown={e => e.key === 'Enter' && handleLogin()} />
      </div>
      <div style={{ marginBottom: 28 }}>
        <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>Password</label>
        <div style={{ position: 'relative' }}>
          <input type={showPass ? 'text' : 'password'} value={password}
            onChange={e => { setPassword(e.target.value); setError('') }}
            placeholder="••••••••" style={{ ...inputStyle, paddingRight: 44 }}
            onKeyDown={e => e.key === 'Enter' && handleLogin()} />
          <button onClick={() => setShowPass(!showPass)} type="button"
            style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 16 }}>
            {showPass ? '🙈' : '👁'}
          </button>
        </div>
      </div>
      <button onClick={handleLogin} disabled={loading}
        style={{ width: '100%', background: loading ? '#00A040' : '#00C853', color: '#000', fontSize: 15, fontWeight: 800, padding: 14, border: 'none', borderRadius: 8, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'Inter' }}>
        {loading ? '⏳ Memverifikasi...' : 'Masuk ke Dashboard'}
      </button>
    </div>
  )
}
