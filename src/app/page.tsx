import { Download } from 'lucide-react'
import { CookieSettingsTrigger } from '@/components/cookie-settings-trigger'
import { HeroBackground } from '@/components/hero-background'
import { TryItSection } from '@/components/try-it-section'

const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
)

const GITHUB_REPO = 'https://github.com/402md/x402-wallet-for-claude-desktop'
const DOWNLOAD_URL = `${GITHUB_REPO}/releases/download/v0.1.4/x402-wallet.mcpb`
const DISCORD_URL = 'https://discord.gg/vCZhkEswKm'

const DiscordIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
)

export default function Home() {
  return (
    <div className="page-enter">
      {/* Beta banner */}
      <div className="fixed top-0 right-0 left-0 z-[60] bg-amber-500 px-4 py-2 text-center text-xs font-medium text-black sm:text-sm">
        This is a beta version — do not use production keys or wallets with real funds.
      </div>

      {/* Navbar */}
      <header className="liquid-glass fixed top-14 right-0 left-0 z-50 mx-auto w-[calc(100%-2rem)] max-w-6xl rounded-2xl px-5">
        <div className="grid h-14 grid-cols-[auto_1fr_auto] items-center">
          <a
            href="https://wallet.402.md"
            className="font-pixel-square text-lg font-bold tracking-tight"
          >
            402.md
          </a>


          <div className="flex items-center justify-end gap-3">
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Discord"
              className="text-white/70 transition-colors hover:text-white"
            >
              <DiscordIcon className="size-4" />
            </a>
            <a
              href="https://github.com/402md"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-white/70 transition-colors hover:text-white"
            >
              <GithubIcon className="size-4" />
            </a>

          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden px-4 pt-48 pb-32 lg:pt-60 lg:pb-48">
        <HeroBackground />
        <div
          className="pointer-events-none absolute inset-0 z-[5]"
          style={{
            background:
              'radial-gradient(circle at center, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 25%, transparent 45%)'
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
          <span
            className="font-pixel-grid text-primary section-enter text-xs tracking-[0.3em] uppercase"
            style={{ '--stagger-index': 0 } as React.CSSProperties}
          >
            {'>_ x402 wallet for claude desktop'}
          </span>

          <h1
            className="section-enter mt-6 text-[2.5rem] font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl"
            style={{ '--stagger-index': 1 } as React.CSSProperties}
          >
            <span className="whitespace-nowrap">Give Claude Desktop a</span>
            <br />
            <span className="font-pixel-square text-primary chromatic-shift text-glow drop-shadow-[0_0_12px_oklch(0.8672_0.201_134.48/0.3)]">
              USDC Wallet
            </span>
          </h1>

          <p
            className="text-muted-foreground section-enter mt-6 max-w-2xl text-base sm:text-lg"
            style={{ '--stagger-index': 2 } as React.CSSProperties}
          >
            Two tools. Check balance. Sign payments.
            <br />
            USDC on Stellar or Base — no API keys, no accounts.
          </p>

          <div
            className="section-enter mt-8 flex justify-center gap-3 [&>a]:flex-1 [&>a]:justify-center sm:gap-4 sm:[&>a]:flex-initial"
            style={{ '--stagger-index': 3 } as React.CSSProperties}
          >
            <a
              href={DOWNLOAD_URL}
              className="bg-primary text-primary-foreground inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all hover:brightness-110 hover:shadow-[0_0_24px_oklch(0.8672_0.201_134.48/0.3)] active:translate-y-px sm:px-6 sm:py-3 sm:text-base"
            >
              <Download className="size-[18px]" />
              Download .mcpb
            </a>
            <a
              href={GITHUB_REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="border-border inline-flex items-center gap-2 rounded-xl border bg-transparent px-4 py-2.5 text-sm font-semibold transition-all hover:border-white/20 hover:bg-white/[0.03] active:translate-y-px sm:px-6 sm:py-3 sm:text-base"
            >
              <GithubIcon className="size-[18px]" />
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      <div className="mx-auto h-px max-w-3xl bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      {/* Tools */}
      <section className="mx-auto max-w-5xl px-4 py-24">
        <div className="text-center">
          <span className="font-pixel-grid text-primary/60 text-xs tracking-[0.3em] uppercase">
            {">_ Two tools. That's it."}
          </span>
          <h2 className="font-pixel-square mt-3 text-3xl font-bold tracking-tight">
            Everything Claude needs to pay
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div
            className="card-glow border-border bg-card section-enter rounded-xl border p-6"
            style={{ '--stagger-index': 0 } as React.CSSProperties}
          >
            <h3 className="text-primary font-mono text-lg font-semibold">
              check_balance
            </h3>
            <p className="text-muted-foreground mt-2 text-[15px]">
              See your USDC balance and wallet address on Stellar or Base.
            </p>
            <div className="mt-5 rounded-lg border border-white/5 bg-black/50 p-4 font-mono text-xs leading-7 text-white/70">
              <span className="text-white/40">{'{'}</span>
              <br />
              {'  '}
              <span className="text-white/50">&quot;address&quot;:</span>{' '}
              <span className="text-primary">&quot;GABCDEF...XYZ&quot;</span>
              ,<br />
              {'  '}
              <span className="text-white/50">&quot;balance&quot;:</span>{' '}
              <span className="text-primary">&quot;42.50 USDC&quot;</span>,
              <br />
              {'  '}
              <span className="text-white/50">&quot;network&quot;:</span>{' '}
              <span className="text-primary">
                &quot;stellar-testnet&quot;
              </span>
              ,<br />
              {'  '}
              <span className="text-white/50">&quot;mode&quot;:</span>{' '}
              <span className="text-primary">&quot;STELLAR_ONLY&quot;</span>
              <br />
              <span className="text-white/40">{'}'}</span>
            </div>
          </div>

          <div
            className="card-glow border-border bg-card section-enter rounded-xl border p-6"
            style={{ '--stagger-index': 1 } as React.CSSProperties}
          >
            <h3 className="text-primary font-mono text-lg font-semibold">
              pay
            </h3>
            <p className="text-muted-foreground mt-2 text-[15px]">
              Sign a USDC payment so Claude can access paid APIs and skills
              automatically.
            </p>
            <div className="mt-5 rounded-lg border border-white/5 bg-black/50 p-4 font-mono text-xs leading-7 text-white/70">
              <span className="text-white/40">{'{'}</span>
              <br />
              {'  '}
              <span className="text-white/50">
                &quot;paymentHeader&quot;:
              </span>{' '}
              <span className="text-primary">&quot;eyJ4NDAy...&quot;</span>,
              <br />
              {'  '}
              <span className="text-white/50">&quot;amount&quot;:</span>{' '}
              <span className="text-primary">&quot;0.05 USDC&quot;</span>,
              <br />
              {'  '}
              <span className="text-white/50">&quot;recipient&quot;:</span>{' '}
              <span className="text-primary">&quot;GABCDEF...&quot;</span>,
              <br />
              {'  '}
              <span className="text-white/50">&quot;network&quot;:</span>{' '}
              <span className="text-primary">
                &quot;stellar-testnet&quot;
              </span>
              <br />
              <span className="text-white/40">{'}'}</span>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto h-px max-w-3xl bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      {/* How it works */}
      <section className="mx-auto max-w-3xl px-4 py-24">
        <div className="text-center">
          <span className="font-pixel-grid text-primary/60 text-xs tracking-[0.3em] uppercase">
            {'>_ How it works'}
          </span>
          <h2 className="font-pixel-square mt-3 text-3xl font-bold tracking-tight">
            Claude handles the rest
          </h2>
        </div>

        <div className="relative mt-12 flex flex-col">
          <div className="from-primary to-primary/10 absolute top-10 bottom-10 left-5 w-px bg-gradient-to-b" />

          {[
            {
              step: '01',
              title: 'You ask Claude to use a paid API',
              desc: '"Translate this document to Japanese" — Claude finds a paid skill on 402.md'
            },
            {
              step: '02',
              title: 'Server responds 402 Payment Required',
              desc: 'With payment requirements: amount, recipient, network.'
            },
            {
              step: '03',
              title: 'Claude calls pay tool',
              desc: 'The wallet signs a USDC authorization. No funds leave until verified.',
              code: 'pay'
            },
            {
              step: '04',
              title: 'Claude retries with X-PAYMENT header',
              desc: 'Server verifies, settles on-chain, returns the result. Done.',
              code: 'X-PAYMENT'
            }
          ].map((item, i) => (
            <div
              key={item.step}
              className="section-enter grid grid-cols-[2.5rem_1fr] gap-4 py-5"
              style={{ '--stagger-index': i } as React.CSSProperties}
            >
              <div className="bg-background text-primary border-primary/30 relative z-10 flex size-10 items-center justify-center rounded-full border font-mono text-xs">
                {item.step}
              </div>
              <div>
                <h3 className="text-base font-semibold">
                  {item.code ? (
                    <>
                      {item.title.split(item.code)[0]}
                      <code className="bg-primary/10 text-primary rounded px-1.5 py-0.5 text-[13px]">
                        {item.code}
                      </code>
                      {item.title.split(item.code)[1]}
                    </>
                  ) : (
                    item.title
                  )}
                </h3>
                <p className="text-muted-foreground mt-1 text-sm">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="mx-auto h-px max-w-3xl bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      {/* Try It */}
      <TryItSection />

      <div className="mx-auto h-px max-w-3xl bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      {/* Networks */}
      <section className="mx-auto max-w-3xl px-4 py-24">
        <div className="text-center">
          <span className="font-pixel-grid text-primary/60 text-xs tracking-[0.3em] uppercase">
            {'>_ Supported networks'}
          </span>
          <h2 className="font-pixel-square mt-3 text-3xl font-bold tracking-tight">
            Multi-chain from day one
          </h2>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {[
            { name: 'Stellar Mainnet', color: 'bg-violet-500' },
            { name: 'Stellar Testnet', color: 'bg-violet-500' },
            { name: 'Base Mainnet', color: 'bg-blue-500' },
            { name: 'Base Sepolia', color: 'bg-blue-500' }
          ].map(net => (
            <div
              key={net.name}
              className="border-border flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-[13px] text-white/60 transition-colors hover:border-white/20"
            >
              <span className={`size-1.5 rounded-full ${net.color}`} />
              {net.name}
            </div>
          ))}
        </div>

        <p className="text-muted-foreground mt-6 text-center text-[13px]">
          Configure your preferred network and Claude uses it as the default for every payment.
        </p>
      </section>

      <div className="mx-auto h-px max-w-3xl bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      {/* Install */}
      <section className="mx-auto max-w-3xl px-4 py-24 text-center">
        <span className="font-pixel-grid text-primary/60 text-xs tracking-[0.3em] uppercase">
          {'>_ Install'}
        </span>
        <h2 className="font-pixel-square mt-3 text-3xl font-bold tracking-tight">
          Get started in seconds
        </h2>
        <p className="text-muted-foreground mt-3 text-[15px]">
          Download the{' '}
          <code className="bg-muted rounded px-1.5 py-0.5 font-mono text-sm">
            .mcpb
          </code>{' '}
          file and double-click to install. That&apos;s it.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href={DOWNLOAD_URL}
            className="bg-primary text-primary-foreground inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold transition-all hover:brightness-110 hover:shadow-[0_0_24px_oklch(0.8672_0.201_134.48/0.3)] active:translate-y-px"
          >
            <Download className="size-[18px]" />
            Download .mcpb
          </a>
          <a
            href={GITHUB_REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="border-border inline-flex items-center gap-2 rounded-xl border bg-transparent px-6 py-3 font-semibold transition-all hover:border-white/20 hover:bg-white/[0.03] active:translate-y-px"
          >
            View Source
          </a>
        </div>

      </section>

      {/* Footer */}
      <footer className="border-border border-t px-4">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 gap-3 py-6 md:gap-8 md:py-8 lg:grid-cols-[1fr_auto_1fr]">
            {/* Brand */}
            <div className="col-span-2 flex flex-col gap-3 lg:col-span-1 lg:max-w-xs">
              <a href="https://402.md" className="font-pixel-square text-lg font-bold">
                402.md
              </a>
              <p className="text-muted-foreground text-sm">
                The universal agent commerce platform. Make any business
                agent-payable in 5 minutes via x402.
              </p>
            </div>

            {/* Developers */}
            <div className="flex flex-col gap-3">
              <h4 className="font-pixel-grid text-muted-foreground text-xs tracking-widest uppercase">
                Developers
              </h4>
              <nav className="flex flex-col gap-2">
                <a href="https://402.md/skill-md" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  SKILL.md
                </a>
                <a href="https://github.com/402md" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  GitHub
                </a>
              </nav>
            </div>

            {/* Protocol */}
            <div className="flex flex-col gap-3 lg:justify-self-end">
              <h4 className="font-pixel-grid text-muted-foreground text-xs tracking-widest uppercase">
                Protocol
              </h4>
              <nav className="flex flex-col gap-2">
                <a href="https://x402.org" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  x402.org
                </a>
                <a href="https://stellar.org" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Stellar
                </a>
                <a href="https://base.org" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Base Network
                </a>
                <a href="https://www.circle.com/usdc" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  USDC
                </a>
              </nav>
            </div>
          </div>

          {/* Copyright, Legal & Social */}
          <div className="flex flex-col items-center justify-between gap-3 py-4 sm:flex-row md:py-6">
            <p className="text-muted-foreground text-xs">
              &copy; {new Date().getFullYear()} 402.md. All rights reserved.
            </p>

            <CookieSettingsTrigger />

            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/company/402-md"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-white transition-colors hover:text-white/80"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Discord"
                className="text-white transition-colors hover:text-white/80"
              >
                <DiscordIcon className="size-4" />
              </a>
              <a
                href="https://github.com/402md"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-white transition-colors hover:text-white/80"
              >
                <GithubIcon className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
