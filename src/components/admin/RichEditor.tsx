'use client'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import { TextStyle } from '@tiptap/extension-text-style'
import { useEffect, useCallback, useState } from 'react'

interface RichEditorProps {
  value: string
  onChange: (html: string) => void
}

export default function RichEditor({ value, onChange }: RichEditorProps) {
  const [linkUrl, setLinkUrl] = useState('')
  const [showLinkInput, setShowLinkInput] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          target: '_blank',
          rel: 'noopener noreferrer',
          class: 'article-link',
        },
      }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      TextStyle,
    ],
    content: value || '',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        style: 'min-height: 300px; padding: 16px; outline: none; font-size: 15px; line-height: 1.8; color: #E8E8E8;',
      },
    },
  })

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || '')
    }
  }, [value])

  const addLink = useCallback(() => {
    if (!editor) return
    if (linkUrl) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run()
    } else {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
    }
    setLinkUrl('')
    setShowLinkInput(false)
  }, [editor, linkUrl])

  if (!editor) return null

  const btnStyle = (active: boolean): React.CSSProperties => ({
    background: active ? '#00C853' : '#252525',
    color: active ? '#000' : '#E8E8E8',
    border: 'none',
    borderRadius: 4,
    padding: '5px 10px',
    fontSize: 12,
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: 'Inter',
    minWidth: 32,
    height: 30,
  })

  return (
    <div style={{ border: '1px solid #252525', borderRadius: 8, overflow: 'hidden', background: '#1A1A1A' }}>

      {/* TOOLBAR */}
      <div style={{ borderBottom: '1px solid #252525', padding: '8px 12px', display: 'flex', gap: 4, flexWrap: 'wrap', alignItems: 'center', background: '#111' }}>

        {/* Heading */}
        <button style={btnStyle(editor.isActive('heading', { level: 1 }))} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} title="Heading 1">H1</button>
        <button style={btnStyle(editor.isActive('heading', { level: 2 }))} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} title="Heading 2">H2</button>
        <button style={btnStyle(editor.isActive('heading', { level: 3 }))} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} title="Heading 3">H3</button>

        <div style={{ width: 1, height: 24, background: '#333', margin: '0 4px' }} />

        {/* Text style */}
        <button style={{ ...btnStyle(editor.isActive('bold')), fontWeight: 900 }} onClick={() => editor.chain().focus().toggleBold().run()} title="Bold">B</button>
        <button style={{ ...btnStyle(editor.isActive('italic')), fontStyle: 'italic' }} onClick={() => editor.chain().focus().toggleItalic().run()} title="Italic">I</button>
        <button style={{ ...btnStyle(editor.isActive('underline')), textDecoration: 'underline' }} onClick={() => editor.chain().focus().toggleUnderline().run()} title="Underline">U</button>
        <button style={{ ...btnStyle(editor.isActive('strike')), textDecoration: 'line-through' }} onClick={() => editor.chain().focus().toggleStrike().run()} title="Strikethrough">S</button>

        <div style={{ width: 1, height: 24, background: '#333', margin: '0 4px' }} />

        {/* Lists */}
        <button style={btnStyle(editor.isActive('bulletList'))} onClick={() => editor.chain().focus().toggleBulletList().run()} title="Bullet List">• List</button>
        <button style={btnStyle(editor.isActive('orderedList'))} onClick={() => editor.chain().focus().toggleOrderedList().run()} title="Numbered List">1. List</button>

        <div style={{ width: 1, height: 24, background: '#333', margin: '0 4px' }} />

        {/* Align */}
        <button style={btnStyle(editor.isActive({ textAlign: 'left' }))} onClick={() => editor.chain().focus().setTextAlign('left').run()} title="Align Left">◀</button>
        <button style={btnStyle(editor.isActive({ textAlign: 'center' }))} onClick={() => editor.chain().focus().setTextAlign('center').run()} title="Center">▐</button>
        <button style={btnStyle(editor.isActive({ textAlign: 'right' }))} onClick={() => editor.chain().focus().setTextAlign('right').run()} title="Align Right">▶</button>

        <div style={{ width: 1, height: 24, background: '#333', margin: '0 4px' }} />

        {/* Quote */}
        <button style={btnStyle(editor.isActive('blockquote'))} onClick={() => editor.chain().focus().toggleBlockquote().run()} title="Quote">❝</button>

        {/* Code */}
        <button style={btnStyle(editor.isActive('code'))} onClick={() => editor.chain().focus().toggleCode().run()} title="Code">{`</>`}</button>

        <div style={{ width: 1, height: 24, background: '#333', margin: '0 4px' }} />

        {/* Link */}
        <button
          style={{ ...btnStyle(editor.isActive('link')), background: editor.isActive('link') ? '#2196F3' : '#252525', color: '#fff' }}
          onClick={() => {
            if (editor.isActive('link')) {
              editor.chain().focus().unsetLink().run()
            } else {
              setShowLinkInput(!showLinkInput)
            }
          }}
          title="Insert Link"
        >
          🔗 Link
        </button>

        {/* Undo/Redo */}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
          <button style={btnStyle(false)} onClick={() => editor.chain().focus().undo().run()} title="Undo">↩</button>
          <button style={btnStyle(false)} onClick={() => editor.chain().focus().redo().run()} title="Redo">↪</button>
        </div>
      </div>

      {/* LINK INPUT */}
      {showLinkInput && (
        <div style={{ padding: '8px 12px', background: '#0d1f0d', borderBottom: '1px solid #252525', display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: '#888', whiteSpace: 'nowrap' }}>🔗 URL:</span>
          <input
            type="url"
            value={linkUrl}
            onChange={e => setLinkUrl(e.target.value)}
            placeholder="https://example.com (backlink)"
            onKeyDown={e => e.key === 'Enter' && addLink()}
            style={{ flex: 1, background: '#1A1A1A', border: '1px solid #252525', borderRadius: 4, padding: '5px 10px', color: '#E8E8E8', fontSize: 13, outline: 'none', fontFamily: 'Inter' }}
            autoFocus
          />
          <button onClick={addLink} style={{ background: '#00C853', color: '#000', border: 'none', borderRadius: 4, padding: '5px 14px', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>Tambah</button>
          <button onClick={() => setShowLinkInput(false)} style={{ background: '#252525', color: '#888', border: 'none', borderRadius: 4, padding: '5px 10px', fontSize: 12, cursor: 'pointer' }}>✕</button>
        </div>
      )}

      {/* EDITOR AREA */}
      <div style={{ background: '#1A1A1A' }}>
        <style>{`
          .ProseMirror h1 { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 900; color: #fff; margin: 20px 0 12px; line-height: 1.2; }
          .ProseMirror h2 { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; color: #fff; margin: 18px 0 10px; }
          .ProseMirror h3 { font-size: 18px; font-weight: 700; color: #E8E8E8; margin: 16px 0 8px; }
          .ProseMirror p { margin-bottom: 14px; }
          .ProseMirror ul, .ProseMirror ol { padding-left: 24px; margin-bottom: 14px; }
          .ProseMirror li { margin-bottom: 6px; }
          .ProseMirror blockquote { border-left: 3px solid #00C853; margin: 16px 0; padding: 10px 16px; background: rgba(0,200,83,0.06); border-radius: 0 6px 6px 0; font-style: italic; color: #bbb; }
          .ProseMirror code { background: #252525; padding: 2px 6px; border-radius: 4px; font-family: monospace; font-size: 13px; color: #00C853; }
          .ProseMirror a, .article-link { color: #2196F3 !important; text-decoration: underline !important; cursor: pointer; }
          .ProseMirror strong { color: #fff; font-weight: 800; }
          .ProseMirror em { color: #ccc; }
          .ProseMirror p.is-editor-empty:first-child::before { content: attr(data-placeholder); float: left; color: #555; pointer-events: none; height: 0; }
          .ProseMirror:focus { outline: none; }
        `}</style>
        <EditorContent editor={editor} />
      </div>

      {/* WORD COUNT */}
      <div style={{ padding: '6px 16px', background: '#111', borderTop: '1px solid #252525', fontSize: 11, color: '#555', display: 'flex', justifyContent: 'space-between' }}>
        <span>💡 Tip: Select teks → klik 🔗 Link untuk tambah backlink</span>
        <span>{editor.storage.characterCount?.characters?.() || editor.getText().length} karakter</span>
      </div>
    </div>
  )
}