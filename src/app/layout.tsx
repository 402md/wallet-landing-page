import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import {
  GeistPixelSquare,
  GeistPixelGrid,
  GeistPixelCircle,
  GeistPixelTriangle,
  GeistPixelLine
} from 'geist/font/pixel'
import { ConsentBanner } from '@/components/consent-banner'
import './globals.css'

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  colorScheme: 'dark'
}

const siteUrl = 'https://wallet.402.md'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'x402 Wallet for Claude Desktop — USDC Payments for AI Agents | 402.md',
    template: '%s | x402 Wallet'
  },
  description:
    "Claude can't pay for anything on its own. This extension changes that — " +
    'install a USDC wallet and let Claude handle paid APIs and skills automatically. Stellar and Base.',
  keywords: [
    'x402',
    'x402 wallet',
    'claude desktop',
    'claude wallet',
    'usdc',
    'stellar',
    'base',
    'mcp',
    'claude extension',
    'ai agents',
    'ai payments',
    '402.md',
    'agent commerce',
    'multi-chain',
    'crypto payments'
  ],
  authors: [{ name: '402.md' }],
  creator: '402.md',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: '402.md',
    title: 'x402 Wallet for Claude Desktop — Give Claude a USDC Wallet',
    description:
      "Claude can't pay for anything on its own. This extension gives it a USDC wallet. " +
      'Two tools — check balance and sign payments. Stellar and Base.',
    url: siteUrl
  },
  twitter: {
    card: 'summary_large_image',
    title: 'x402 Wallet for Claude Desktop',
    description:
      "Claude can't pay for anything on its own. This extension changes that. " +
      'Install a USDC wallet in seconds — check balance and sign payments on Stellar and Base.'
  },
  robots: {
    index: true,
    follow: true
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-title" content="x402 Wallet" />
      </head>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} ${GeistPixelSquare.variable} ${GeistPixelGrid.variable} ${GeistPixelCircle.variable} ${GeistPixelTriangle.variable} ${GeistPixelLine.variable} antialiased`}
      >
        {/* Film grain overlay */}
        <div className="noise-texture pointer-events-none fixed inset-0 z-[9999] opacity-40" />
        {children}
        <ConsentBanner />
      </body>
    </html>
  )
}
