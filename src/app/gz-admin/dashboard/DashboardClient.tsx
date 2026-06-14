'use client'
import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Article } from '@/lib/supabase'
import { catColor, CATEGORIES, timeAgo } from '@/lib/helpers'

type Tab = 'articles' | 'worldcup' | 'new'

const EMPTY: Partial<Article> = {
  title: '', excerpt: '', content: '', category: 'Piala Dunia',
  status: 'published', author: 'Admin', image: '', views: '0', is_world_cup: false,
}

const C = {
  inp: { width: '100%', background: '#1A1A1A', border: '1px solid #252525', borderRadius: 6, padding: '10px 14px', color: '#E8E8E8', fontSize: 14, outline: 'none', fontFamily: 'Inter' } as React.CSSProperties,
  fld: { marginBottom: 20 } as React.CSSProperties,
  lbl: { display: 'block', fontSize: 11, fontWeight: 700, color: '#888', textTransform: 'uppercase' as const, letterSpacing: 0.5, marginBottom: 8 },
  btn: (v: 'primary' | 'ghost' | 'danger', sm?: boolean): React.CSSProperties => ({
    display: 'inline-flex', alignItems: 'center', gap: 6,
    padding: sm ? '5px 10px' : '8px 16px', borderRadius: 6,
    fontSize: sm ? 12 : 13, fontWeight: 600, cursor: 'pointer', border: 'none', fontFamily: 'Inter',
    background: v === 'primary' ? '#00C853' : v === 'danger' ? '#FF3B30' : '#1A1A1A',
    color: v === 'ghost' ? '#E8E8E8' : v === 'danger' ? '#fff' : '#000',
    ...(v === 'ghost' ? { border: '1px solid #252525' } : {}),
  }),
}

// ── TABLE ──────────────────────────────────────────────────────────────────
interface TableProps {
  articles: Article[]
  search: string
  setSearch: (v: string) => void
  catFilter: string
  setCatFilter: (v: string) => void
  onEdit: (a: Article) => void
  onDelete: (id: number) => void
  onPublish: (id: number) => void
}
function ArticleTable({ articles, search, setSearch, catFilter, setCatFilter, onEdit, onDelete, onPublish }: TableProps) {
  return (
    <div style={{ background: '#1A1A1A', border: '1px solid #252525', borderRadius: 8, overflow: 'hidden' }}>
      <div style={{ padding: '16px 20px', borderBottom: '1px solid #252525', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 14, fontWeight: 700 }}>Artikel <span style={{ color: '#888', fontWeight: 400 }}>({articles.length})</span></span>
        <div style={{ position: 'relative', marginLeft: 'auto' }}>
          <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', fontSize: 13 }}>🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari artikel..." style={{ ...C.inp, paddingLeft: 32, width: 220 }} />
        </div>
        <select value={catFilter} onChange={e => setCatFilter(e.target.value)} style={{ ...C.inp, width: 'auto', cursor: 'pointer' }}>
          <option value="">Semua Kategori</option>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      {articles.length === 0
        ? <div style={{ textAlign: 'center', padding: '48px 0', color: '#888' }}>⚽ Belum ada artikel</div>
        : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                {['Gambar', 'Judul', 'Kategori', 'Status', 'Tanggal', 'Aksi'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '10px 16px', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, color: '#888', borderBottom: '1px solid #252525' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {articles.map((a: Article) => (
                <tr key={a.id} style={{ borderBottom: '1px solid rgba(37,37,37,0.6)' }}>
                  <td style={{ padding: '12px 16px' }}>
                    {a.image
                      ? <img src={a.image} alt="" style={{ width: 48, height: 36, borderRadius: 4, objectFit: 'cover', border: '1px solid #252525' }} />
                      : <div style={{ width: 48, height: 36, borderRadius: 4, background: '#111', border: '1px solid #252525', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>⚽</div>
                    }
                  </td>
                  <td style={{ padding: '12px 16px', maxWidth: 280 }}>
                    <div style={{ fontWeight: 600, color: '#fff', fontSize: 13 }}>{a.title}</div>
                    <div style={{ fontSize: 11, color: '#888', marginTop: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 260 }}>{a.excerpt}</div>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ background: catColor(a.category) + '22', color: catColor(a.category), fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 3, textTransform: 'uppercase' }}>{a.category}</span>
                    {a.is_world_cup && <span style={{ marginLeft: 4 }}>🏆</span>}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ background: a.status === 'published' ? 'rgba(0,200,83,0.12)' : 'rgba(255,215,0,0.12)', color: a.status === 'published' ? '#00C853' : '#FFD700', fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 20 }}>
                      {a.status === 'published' ? '● Published' : '● Draft'}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 12, color: '#888' }}>{timeAgo(a.created_at)}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button style={C.btn('ghost', true)} onClick={() => onEdit(a)}>✏️ Edit</button>
                      <button style={{ ...C.btn('ghost', true), background: 'rgba(255,59,48,0.1)', color: '#FF3B30' }} onClick={() => onDelete(a.id)}>🗑️</button>
                      {a.status === 'draft' && <button style={C.btn('primary', true)} onClick={() => onPublish(a.id)}>🚀</button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      }
    </div>
  )
}

// ── EDITOR ─────────────────────────────────────────────────────────────────
interface EditorProps {
  article: Partial<Article>
  onChange: (v: Partial<Article>) => void
  onSave: () => void
  onCancel: () => void
  onDrop: (e: React.DragEvent) => void
  onImgUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  loading: boolean
  isNew: boolean
}
function EditorForm({ article, onChange, onSave, onCancel, onDrop, onImgUpload, loading, isNew }: EditorProps) {
  return (
    <div>
      <div style={C.fld}>
        <label style={C.lbl}>Judul Artikel *</label>
        <input value={article.title || ''} onChange={e => onChange({ title: e.target.value })} placeholder="Judul menarik..." style={C.inp} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={C.fld}>
          <label style={C.lbl}>Kategori</label>
          <select value={article.category || ''} onChange={e => onChange({ category: e.target.value, is_world_cup: e.target.value === 'Piala Dunia' })} style={C.inp}>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div style={C.fld}>
          <label style={C.lbl}>Status</label>
          <select value={article.status || 'draft'} onChange={e => onChange({ status: e.target.value as 'published' | 'draft' })} style={C.inp}>
            <option value="published">✅ Published</option>
            <option value="draft">📝 Draft</option>
          </select>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={C.fld}>
          <label style={C.lbl}>Penulis</label>
          <input value={article.author || ''} onChange={e => onChange({ author: e.target.value })} placeholder="Nama penulis" style={C.inp} />
        </div>
        <div style={C.fld}>
          <label style={C.lbl}>Views</label>
          <input value={article.views || ''} onChange={e => onChange({ views: e.target.value })} placeholder="24K" style={C.inp} />
        </div>
      </div>
      <div style={C.fld}>
        <label style={C.lbl}>Excerpt / Ringkasan</label>
        <input value={article.excerpt || ''} onChange={e => onChange({ excerpt: e.target.value })} placeholder="Ringkasan singkat..." style={C.inp} />
      </div>
      <div style={{ ...C.fld, display: 'flex', alignItems: 'center', gap: 10 }}>
        <input type="checkbox" id="wc" checked={article.is_world_cup || false} onChange={e => onChange({ is_world_cup: e.target.checked })} style={{ width: 16, height: 16, accentColor: '#FFD700' }} />
        <label htmlFor="wc" style={{ ...C.lbl, marginBottom: 0, cursor: 'pointer', color: '#FFD700' }}>🏆 Tandai sebagai Berita Piala Dunia</label>
      </div>
      <div style={C.fld}>
        <label style={C.lbl}>🖼️ Gambar Artikel</label>
        <div onDragOver={e => e.preventDefault()} onDrop={onDrop} onClick={() => document.getElementById('img-up')?.click()}
          style={{ border: `2px dashed ${article.image ? '#00C853' : '#252525'}`, borderRadius: 10, background: '#1A1A1A', minHeight: article.image ? 0 : 130, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', overflow: 'hidden' }}>
          <input id="img-up" type="file" accept="image/*" style={{ display: 'none' }} onChange={onImgUpload} />
          {article.image
            ? <img src={article.image} alt="preview" style={{ width: '100%', maxHeight: 220, objectFit: 'cover', display: 'block' }} />
            : <div style={{ textAlign: 'center', padding: '28px 20px', pointerEvents: 'none' }}>
              <div style={{ fontSize: 36, marginBottom: 10 }}>📁</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#E8E8E8', marginBottom: 4 }}>Klik atau drag & drop gambar AI</div>
              <div style={{ fontSize: 11, color: '#888' }}>JPG, PNG, WEBP • Max 5MB</div>
            </div>
          }
        </div>
        {article.image && <button style={{ ...C.btn('ghost', true), marginTop: 8 }} onClick={() => onChange({ image: '' })}>✕ Hapus Gambar</button>}
      </div>
      <div style={C.fld}>
        <label style={C.lbl}>Konten Artikel *</label>
        <textarea value={article.content || ''} onChange={e => onChange({ content: e.target.value })}
          placeholder="Tulis isi artikel di sini..." style={{ ...C.inp, minHeight: 220, resize: 'vertical', lineHeight: 1.7 } as React.CSSProperties} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, paddingTop: 16, borderTop: '1px solid #252525' }}>
        <button style={C.btn('ghost')} onClick={onCancel}>Batal</button>
        <button style={C.btn('primary')} onClick={onSave} disabled={loading}>
          {loading ? '⏳ Menyimpan...' : isNew ? '🚀 Publish Sekarang' : '💾 Simpan Perubahan'}
        </button>
      </div>
    </div>
  )
}

// ── MAIN ───────────────────────────────────────────────────────────────────
export default function DashboardClient({ initialArticles }: { initialArticles: Article[] }) {
  const [articles, setArticles] = useState<Article[]>(initialArticles)
  const [tab, setTab] = useState<Tab>('articles')
  const [search, setSearch] = useState('')
  const [catFilter, setCatFilter] = useState('')
  const [editing, setEditing] = useState<Partial<Article> | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState('')
  const [toastErr, setToastErr] = useState(false)
  const router = useRouter()

  const showToast = (msg: string, err = false) => { setToast(msg); setToastErr(err); setTimeout(() => setToast(''), 3000) }
  const refresh = async () => { const r = await fetch('/api/articles?admin=1'); const d = await r.json(); setArticles(d.articles || []) }

  const handleImgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return
    if (file.size > 5 * 1024 * 1024) { showToast('⚠️ Max 5MB!', true); return }
    const reader = new FileReader()
    reader.onload = ev => setEditing(p => ({ ...p, image: ev.target?.result as string }))
    reader.readAsDataURL(file)
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (!file || !file.type.startsWith('image/')) return
    if (file.size > 5 * 1024 * 1024) { showToast('⚠️ Max 5MB!', true); return }
    const reader = new FileReader()
    reader.onload = ev => setEditing(p => ({ ...p, image: ev.target?.result as string }))
    reader.readAsDataURL(file)
  }, [])

  const saveArticle = async () => {
    if (!editing?.title) { showToast('⚠️ Judul wajib diisi!', true); return }
    setLoading(true)
    try {
      const url = isNew ? '/api/articles' : `/api/articles/${editing.id}`
      const res = await fetch(url, { method: isNew ? 'POST' : 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) })
      if (!res.ok) throw new Error()
// Revalidate landing page cache
await fetch('/api/revalidate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ secret: process.env.NEXTAUTH_SECRET }),
})
showToast(isNew ? '🚀 Artikel dipublish!' : '✅ Artikel diperbarui!')
setEditing(null); await refresh(); router.refresh()
    } catch { showToast('❌ Gagal menyimpan', true) }
    finally { setLoading(false) }
  }

  const confirmDelete = async () => {
    if (!deleteId) return; setLoading(true)
    try { await fetch(`/api/articles/${deleteId}`, { method: 'DELETE' }); showToast('🗑️ Dihapus!'); setDeleteId(null); await refresh() }
    catch { showToast('❌ Gagal menghapus', true) }
    finally { setLoading(false) }
  }

  const handlePublish = async (id: number) => {
    await fetch(`/api/articles/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: 'published' }) })
    showToast('🚀 Dipublish!'); await refresh()
  }

  const logout = async () => { await fetch('/api/admin-auth', { method: 'DELETE' }); router.push('/gz-admin/login') }
  const openNew = () => { setEditing({ ...EMPTY }); setIsNew(true); setTab('new') }
  const openEdit = (a: Article) => { setEditing(a); setIsNew(false) }

  const filtered = articles.filter(a => (!catFilter || a.category === catFilter) && (!search || a.title.toLowerCase().includes(search.toLowerCase())))
  const wcArts = articles.filter(a => a.is_world_cup)
  const draftCount = articles.filter(a => a.status === 'draft').length

  return (
    <div style={{ fontFamily: "'Inter',sans-serif", background: '#0A0A0A', color: '#E8E8E8', display: 'flex', minHeight: '100vh' }}>

      {/* SIDEBAR */}
      <aside style={{ width: 240, background: '#111', borderRight: '1px solid #252525', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, height: '100vh', zIndex: 50, overflowY: 'auto' }}>
        <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid #252525' }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 24, letterSpacing: 2 }}>GOAL<span style={{ color: '#00C853' }}>ZONE</span></div>
          <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1, color: '#888', textTransform: 'uppercase', marginTop: 2 }}>Admin Panel</div>
        </div>
        <nav style={{ padding: '12px 0', flex: 1 }}>
          <div style={{ fontSize: 9, fontWeight: 700, color: '#444', textTransform: 'uppercase', letterSpacing: 1, padding: '16px 20px 6px' }}>Konten</div>
          {([['articles', '📰', 'Semua Artikel', articles.length], ['worldcup', '🏆', 'Piala Dunia', wcArts.length], ['new', '✏️', 'Tulis Artikel', 0]] as [Tab, string, string, number][]).map(([t, icon, label, badge]) => (
            <div key={t} onClick={() => setTab(t)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 20px', fontSize: 13, fontWeight: 500, color: tab === t ? '#00C853' : '#888', background: tab === t ? 'rgba(0,200,83,0.06)' : 'transparent', borderLeft: `3px solid ${tab === t ? '#00C853' : 'transparent'}`, cursor: 'pointer' }}>
              <span style={{ fontSize: 16, width: 20, textAlign: 'center' }}>{icon}</span>{label}
              {badge > 0 && <span style={{ marginLeft: 'auto', background: '#00C853', color: '#000', fontSize: 9, fontWeight: 800, padding: '1px 6px', borderRadius: 10 }}>{badge}</span>}
            </div>
          ))}
          <div style={{ fontSize: 9, fontWeight: 700, color: '#444', textTransform: 'uppercase', letterSpacing: 1, padding: '16px 20px 6px' }}>Site</div>
          <a href="/" target="_blank" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 20px', fontSize: 13, color: '#888', textDecoration: 'none' }}>
            <span>🌐</span> Lihat Situs
          </a>
        </nav>
        <div style={{ padding: '16px 20px', borderTop: '1px solid #252525', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 34, height: 34, background: '#00C853', color: '#000', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, flexShrink: 0 }}>GA</div>
          <div><div style={{ fontSize: 13, fontWeight: 600 }}>goalzone_admin</div><div style={{ fontSize: 10, color: '#888' }}>Super Admin</div></div>
          <button onClick={logout} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: 18 }} title="Logout">⏻</button>
        </div>
      </aside>

      {/* MAIN */}
      <div style={{ marginLeft: 240, flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <div style={{ background: '#111', borderBottom: '1px solid #252525', padding: '0 28px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 40 }}>
          <div style={{ fontSize: 16, fontWeight: 700 }}>{tab === 'articles' ? '📰 Semua Artikel' : tab === 'worldcup' ? '🏆 Piala Dunia' : '✏️ Tulis Baru'}</div>
          <button style={C.btn('primary', true)} onClick={openNew}>+ Artikel Baru</button>
        </div>

        <div style={{ padding: 28, flex: 1 }}>
          {/* STATS */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 28 }}>
            {([['📰', 'rgba(0,200,83,0.1)', articles.length, 'Total Artikel'], ['🏆', 'rgba(255,215,0,0.1)', wcArts.length, 'Piala Dunia'], ['👁', 'rgba(33,150,243,0.1)', '—', 'Views Hari Ini'], ['📝', 'rgba(255,59,48,0.1)', draftCount, 'Draft']] as [string, string, string | number, string][]).map(([icon, bg, val, lbl]) => (
              <div key={lbl} style={{ background: '#1A1A1A', border: '1px solid #252525', borderRadius: 8, padding: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{icon}</div>
                <div>
                  <div style={{ fontSize: 26, fontWeight: 700, color: '#fff', lineHeight: 1 }}>{val}</div>
                  <div style={{ fontSize: 11, color: '#888', marginTop: 3 }}>{lbl}</div>
                </div>
              </div>
            ))}
          </div>

          {/* TABS */}
          <div style={{ display: 'flex', gap: 4, marginBottom: 20, borderBottom: '1px solid #252525' }}>
            {(['articles', 'worldcup', 'new'] as Tab[]).map(t => (
              <div key={t} onClick={() => { setTab(t); if (t === 'new') { setEditing({ ...EMPTY }); setIsNew(true) } }}
                style={{ padding: '10px 20px', fontSize: 13, fontWeight: 600, cursor: 'pointer', borderBottom: `2px solid ${tab === t ? '#00C853' : 'transparent'}`, color: tab === t ? '#00C853' : '#888', marginBottom: -1 }}>
                {t === 'articles' ? '📰 Semua' : t === 'worldcup' ? '🏆 Piala Dunia' : '✏️ Tulis Baru'}
              </div>
            ))}
          </div>

          {tab === 'articles' && <ArticleTable articles={filtered} search={search} setSearch={setSearch} catFilter={catFilter} setCatFilter={setCatFilter} onEdit={openEdit} onDelete={id => setDeleteId(id)} onPublish={handlePublish} />}
          {tab === 'worldcup' && <ArticleTable articles={wcArts} search={search} setSearch={setSearch} catFilter={catFilter} setCatFilter={setCatFilter} onEdit={openEdit} onDelete={id => setDeleteId(id)} onPublish={handlePublish} />}
          {tab === 'new' && editing && <EditorForm article={editing} onChange={v => setEditing(p => ({ ...p, ...v }))} onSave={saveArticle} onCancel={() => { setTab('articles'); setEditing(null) }} onDrop={handleDrop} onImgUpload={handleImgUpload} loading={loading} isNew={isNew} />}
        </div>
      </div>

      {/* EDIT MODAL */}
      {editing && tab !== 'new' && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '32px 16px', overflowY: 'auto' }}>
          <div style={{ background: '#111', border: '1px solid #252525', borderRadius: 10, width: '100%', maxWidth: 820 }}>
            <div style={{ padding: '18px 24px', borderBottom: '1px solid #252525', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontSize: 15, fontWeight: 700 }}>✏️ Edit Artikel</div>
              <button style={C.btn('ghost', true)} onClick={() => setEditing(null)}>✕ Tutup</button>
            </div>
            <div style={{ padding: 24 }}>
              <EditorForm article={editing} onChange={v => setEditing(p => ({ ...p, ...v }))} onSave={saveArticle} onCancel={() => setEditing(null)} onDrop={handleDrop} onImgUpload={handleImgUpload} loading={loading} isNew={isNew} />
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRM */}
      {deleteId && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#111', border: '1px solid #252525', borderRadius: 10, padding: 32, maxWidth: 380, width: '90%', textAlign: 'center' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🗑️</div>
            <h3 style={{ fontSize: 18, color: '#fff', marginBottom: 8 }}>Hapus Artikel?</h3>
            <p style={{ fontSize: 13, color: '#888', marginBottom: 24 }}>Artikel akan dihapus permanen dari Supabase.</p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
              <button style={C.btn('ghost')} onClick={() => setDeleteId(null)}>Batal</button>
              <button style={C.btn('danger')} onClick={confirmDelete} disabled={loading}>{loading ? 'Menghapus...' : 'Ya, Hapus'}</button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && (
        <div style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 999, background: '#1A1A1A', border: '1px solid #252525', borderLeft: `3px solid ${toastErr ? '#FF3B30' : '#00C853'}`, borderRadius: 8, padding: '14px 20px', fontSize: 13, boxShadow: '0 8px 24px rgba(0,0,0,0.4)', minWidth: 240 }}>
          {toast}
        </div>
      )}
    </div>
  )
}
