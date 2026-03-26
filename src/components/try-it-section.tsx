'use client'

import { useState, useEffect } from 'react'
import { Copy, Check, ExternalLink } from 'lucide-react'

const ENDPOINTS = [
  {
    label: 'Stellar Testnet',
    path: '/api/test/stellar',
    network: 'stellar:testnet',
    price: '$0.05',
    color: 'bg-violet-500',
    faucet: 'https://faucet.circle.com/stellar',
    faucetLabel: 'Get testnet USDC',
  },
  {
    label: 'Base Sepolia',
    path: '/api/test/base',
    network: 'eip155:84532',
    price: '$0.05',
    color: 'bg-blue-500',
    faucet: 'https://faucet.circle.com/base-sepolia',
    faucetLabel: 'Get testnet USDC',
  },
]

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={copy}
      className="text-white/40 transition-colors hover:text-white/80"
      aria-label="Copy to clipboard"
    >
      {copied ? <Check className="size-4 text-primary" /> : <Copy className="size-4" />}
    </button>
  )
}

const PRODUCTION_ORIGIN = 'https://wallet.402.md'

export function TryItSection() {
  const [origin, setOrigin] = useState(PRODUCTION_ORIGIN)

  useEffect(() => {
    setOrigin(window.location.origin)
  }, [])

  return (
    <section className="mx-auto max-w-3xl px-4 py-24">
      <div className="text-center">
        <span className="font-pixel-grid text-primary/60 text-xs tracking-[0.3em] uppercase">
          {'>_ Try it'}
        </span>
        <h2 className="font-pixel-square mt-3 text-3xl font-bold tracking-tight">
          Test with real x402 endpoints
        </h2>
        <p className="text-muted-foreground mt-3 text-[15px]">
          Copy a URL below and paste it into Claude Desktop. The wallet will handle the 402 payment automatically.
        </p>
      </div>

      <div className="mt-10 flex flex-col gap-4">
        {ENDPOINTS.map((ep, i) => {
          const url = `${origin}${ep.path}`
          return (
            <div
              key={ep.path}
              className="card-glow border-border bg-card section-enter rounded-xl border p-5"
              style={{ '--stagger-index': i } as React.CSSProperties}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className={`size-2 rounded-full ${ep.color}`} />
                  <span className="font-mono text-sm font-semibold">{ep.label}</span>
                  <span className="text-muted-foreground text-xs">({ep.price} USDC)</span>
                </div>
                <CopyButton text={url} />
              </div>

              <div className="mt-3 overflow-x-auto rounded-lg border border-white/5 bg-black/50 px-4 py-3">
                <code className="text-primary whitespace-nowrap font-mono text-xs sm:text-sm">
                  {url}
                </code>
              </div>

              <div className="mt-2.5 flex items-center justify-between gap-3">
                <p className="text-muted-foreground text-xs">
                  Ask Claude:{' '}
                  <span className="text-white/60">
                    &ldquo;Access {url}&rdquo;
                  </span>
                </p>
                <a
                  href={ep.faucet}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary/70 hover:text-primary inline-flex shrink-0 items-center gap-1 text-xs transition-colors"
                >
                  {ep.faucetLabel}
                  <ExternalLink className="size-3" />
                </a>
              </div>
            </div>
          )
        })}
      </div>

      <p className="text-muted-foreground mt-6 text-center text-[13px]">
        These endpoints return <code className="bg-muted rounded px-1 py-0.5 font-mono text-xs">HTTP 402</code> and require a signed USDC authorization via <code className="bg-muted rounded px-1 py-0.5 font-mono text-xs">X-PAYMENT</code> header.
      </p>
    </section>
  )
}
