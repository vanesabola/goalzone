'use client'

interface CloakLinkProps {
  href: string
  children: React.ReactNode
  style?: React.CSSProperties
}

export default function CloakLink({ href, children, style }: CloakLinkProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    window.open(href, '_blank', 'noopener')
  }

  return (
    <span onClick={handleClick} style={{ cursor: 'pointer', ...style }}>
      {children}
    </span>
  )
}