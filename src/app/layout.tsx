import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'GoalZone — Berita Bola Terkini',
  description: 'Berita sepak bola terkini, terpercaya, dan terlengkap.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@700;900&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
