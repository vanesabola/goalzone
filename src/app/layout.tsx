import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.vanesabola.xyz'),
  title: {
    default: 'VanesaBola — Berita Bola Terkini Indonesia',
    template: '%s | VanesaBola',
  },
  description: 'Berita sepak bola terkini, terpercaya, dan terlengkap. Liga Indonesia, Liga Eropa, UCL, dan Piala Dunia 2026.',
  keywords: ['berita bola', 'sepak bola', 'liga indonesia', 'piala dunia 2026', 'ucl', 'timnas indonesia', 'bola terkini'],
  authors: [{ name: 'VanesaBola' }],
  creator: 'VanesaBola',
  publisher: 'VanesaBola',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://www.vanesabola.xyz',
    siteName: 'VanesaBola',
    title: 'VanesaBola — Berita Bola Terkini Indonesia',
    description: 'Berita sepak bola terkini, terpercaya, dan terlengkap. Liga Indonesia, Liga Eropa, UCL, dan Piala Dunia 2026.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VanesaBola — Berita Bola Terkini Indonesia',
    description: 'Berita sepak bola terkini, terpercaya, dan terlengkap.',
  },
  alternates: {
    canonical: 'https://www.vanesabola.xyz',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@700;900&display=swap" rel="stylesheet" />
        <link rel="canonical" href="https://www.vanesabola.xyz" />
      </head>
      <body>{children}</body>
    </html>
  )
}