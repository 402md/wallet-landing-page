'use client'

import { useEffect, useState, useSyncExternalStore } from 'react'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Shield, BarChart3, Megaphone, Cog } from 'lucide-react'

const CONSENT_KEY = '402md_consent'

interface ConsentState {
  analytics: boolean
  marketing: boolean
  functional: boolean
  consentedAt: string
  updatedAt: string
}

const isDntEnabled = () =>
  typeof window !== 'undefined' &&
  (navigator.doNotTrack === '1' ||
    (window as unknown as { doNotTrack?: string }).doNotTrack === '1')

// --- External signal for opening the preferences panel ---
let openSignal: (() => void) | null = null

export const consentPreferences = {
  register(fn: () => void) {
    openSignal = fn
  },
  unregister() {
    openSignal = null
  },
  open() {
    openSignal?.()
  }
}

// --- Consent store (useSyncExternalStore) ---
let listeners: Array<() => void> = []
let cachedSnapshot: ConsentState | null = null
let snapshotInitialized = false

const isValidConsent = (value: unknown): value is ConsentState => {
  if (!value || typeof value !== 'object') return false
  const obj = value as Record<string, unknown>
  return (
    typeof obj.analytics === 'boolean' &&
    typeof obj.marketing === 'boolean' &&
    typeof obj.functional === 'boolean' &&
    typeof obj.consentedAt === 'string' &&
    typeof obj.updatedAt === 'string'
  )
}

const readFromStorage = (): ConsentState | null => {
  try {
    const raw = localStorage.getItem(CONSENT_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as unknown
    if (isValidConsent(parsed)) return parsed
    return null
  } catch {
    return null
  }
}

const emitChange = () => {
  cachedSnapshot = readFromStorage()
  listeners.forEach(l => l())
}

const consentStore = {
  subscribe(callback: () => void) {
    listeners = [...listeners, callback]
    return () => {
      listeners = listeners.filter(l => l !== callback)
    }
  },
  getSnapshot(): ConsentState | null {
    if (!snapshotInitialized) {
      cachedSnapshot = readFromStorage()
      snapshotInitialized = true
    }
    return cachedSnapshot
  },
  getServerSnapshot(): undefined {
    return undefined
  },
  set(consent: ConsentState) {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent))
    emitChange()
  }
}

const makeConsent = (
  values: Pick<ConsentState, 'analytics' | 'marketing' | 'functional'>,
  existing?: ConsentState | null
): ConsentState => {
  const now = new Date().toISOString()
  return {
    ...values,
    consentedAt: existing?.consentedAt ?? now,
    updatedAt: now
  }
}

// --- Categories ---
const categories = [
  {
    id: 'essential' as const,
    label: 'Essential',
    icon: Shield,
    description: 'Required for the site to function. Cannot be disabled.',
    locked: true
  },
  {
    id: 'functional' as const,
    label: 'Functional',
    icon: Cog,
    description:
      'Enable personalized features like saved preferences and enhanced functionality.'
  },
  {
    id: 'analytics' as const,
    label: 'Analytics',
    icon: BarChart3,
    description:
      'Help us understand how visitors use the site so we can improve the experience.'
  },
  {
    id: 'marketing' as const,
    label: 'Marketing',
    icon: Megaphone,
    description:
      'Used to deliver relevant ads and measure campaign effectiveness.'
  }
]

// --- Toggle switch (replaces shadcn Switch) ---
const Toggle = ({
  checked,
  disabled,
  onChange,
  ariaLabel
}: {
  checked: boolean
  disabled?: boolean
  onChange?: (checked: boolean) => void
  ariaLabel: string
}) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    aria-label={ariaLabel}
    disabled={disabled}
    onClick={() => onChange?.(!checked)}
    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 ${
      checked ? 'bg-primary' : 'bg-muted'
    }`}
  >
    <span
      className={`pointer-events-none block size-4 rounded-full bg-white shadow-sm transition-transform ${
        checked ? 'translate-x-[18px]' : 'translate-x-[2px]'
      }`}
    />
  </button>
)

export const ConsentBanner = () => {
  const consent = useSyncExternalStore(
    consentStore.subscribe,
    consentStore.getSnapshot,
    consentStore.getServerSnapshot
  )

  const [showPreferences, setShowPreferences] = useState(false)
  const [prefs, setPrefs] = useState({
    analytics: false,
    marketing: false,
    functional: false
  })

  const showBanner = consent === null
  const isVisible = showBanner || showPreferences
  const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID

  // Register/unregister external open signal
  useEffect(() => {
    consentPreferences.register(() => {
      const current = consentStore.getSnapshot()
      setPrefs({
        analytics: current?.analytics ?? false,
        marketing: current?.marketing ?? false,
        functional: current?.functional ?? false
      })
      setShowPreferences(true)
    })
    return () => consentPreferences.unregister()
  }, [])

  // Scroll lock
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isVisible])

  const handleAcceptAll = () => {
    consentStore.set(
      makeConsent(
        { analytics: true, marketing: true, functional: true },
        consent
      )
    )
    setShowPreferences(false)
  }

  const handleRejectAll = () => {
    consentStore.set(
      makeConsent(
        { analytics: false, marketing: false, functional: false },
        consent
      )
    )
    setShowPreferences(false)
  }

  const handleSavePreferences = () => {
    consentStore.set(makeConsent(prefs, consent))
    setShowPreferences(false)
  }

  const handleOpenPreferences = () => {
    setPrefs({
      analytics: consent?.analytics ?? false,
      marketing: consent?.marketing ?? false,
      functional: consent?.functional ?? false
    })
    setShowPreferences(true)
  }

  const handleClosePreferences = () => {
    if (consent !== null) {
      setShowPreferences(false)
    }
  }

  const dntActive = isDntEnabled()

  const btnBase =
    'inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-full sm:w-auto cursor-pointer'
  const btnOutline = `${btnBase} border border-border bg-transparent text-foreground hover:bg-white/[0.04]`
  const btnPrimary = `${btnBase} bg-primary text-primary-foreground hover:brightness-110`

  return (
    <>
      {consent?.analytics && gaId && <GoogleAnalytics gaId={gaId} />}

      {isVisible && (
        <>
          <div
            className="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-[2px]"
            aria-hidden="true"
            onClick={handleClosePreferences}
          />

          {!showPreferences ? (
            /* Layer 1: Simple banner */
            <div className="bg-card border-border fixed right-4 bottom-4 left-4 z-[9999] mx-auto max-w-lg rounded-xl border p-4 shadow-2xl sm:p-6">
              <h3 className="text-foreground mb-2 text-lg font-semibold">
                Cookie preferences
              </h3>
              <p className="text-muted-foreground mb-2 text-sm leading-relaxed">
                We use cookies to analyze site usage and improve your
                experience. You can accept all cookies, reject non-essential
                ones, or manage your preferences.
              </p>
              <p className="text-muted-foreground mb-6 text-xs">
                Learn more in our{' '}
                <a
                  href="/cookies"
                  className="text-foreground underline underline-offset-4 hover:text-white"
                >
                  Cookie Policy
                </a>
                .
              </p>
              <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                <button className={btnOutline} onClick={handleRejectAll}>
                  Reject all
                </button>
                <button className={btnOutline} onClick={handleOpenPreferences}>
                  Manage preferences
                </button>
                <button className={btnPrimary} onClick={handleAcceptAll}>
                  Accept all
                </button>
              </div>
            </div>
          ) : (
            /* Layer 2: Preferences panel */
            <div className="bg-card border-border fixed inset-x-4 bottom-4 z-[9999] mx-auto max-w-lg rounded-xl border p-4 shadow-2xl sm:p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-foreground text-lg font-semibold">
                  Cookie preferences
                </h3>
                {consent !== null && (
                  <button
                    onClick={handleClosePreferences}
                    className="text-muted-foreground hover:text-foreground cursor-pointer"
                    aria-label="Close preferences"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                )}
              </div>

              <div className="mb-4 max-h-[50vh] space-y-3 overflow-y-auto">
                {categories.map(category => {
                  const Icon = category.icon
                  const isLocked = category.locked
                  const isChecked = isLocked
                    ? true
                    : prefs[category.id as keyof typeof prefs]

                  return (
                    <div
                      key={category.id}
                      className="border-border flex items-start gap-3 rounded-lg border p-3"
                    >
                      <Icon className="text-muted-foreground mt-0.5 size-4 shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-foreground text-sm font-medium">
                            {category.label}
                          </span>
                          <Toggle
                            checked={isChecked}
                            disabled={isLocked}
                            onChange={
                              isLocked
                                ? undefined
                                : (checked: boolean) =>
                                    setPrefs(prev => ({
                                      ...prev,
                                      [category.id]: checked
                                    }))
                            }
                            ariaLabel={`${isLocked ? 'Essential' : category.label} cookies`}
                          />
                        </div>
                        <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                          {category.description}
                        </p>
                        {category.id === 'analytics' && dntActive && (
                          <p className="mt-1 text-xs text-amber-500">
                            Do Not Track is enabled in your browser. Analytics
                            is off by default.
                          </p>
                        )}
                        {isLocked && (
                          <p className="text-muted-foreground mt-1 text-xs">
                            Always active
                          </p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              <p className="text-muted-foreground mb-4 text-xs">
                Learn more in our{' '}
                <a
                  href="/cookies"
                  className="text-foreground underline underline-offset-4 hover:text-white"
                >
                  Cookie Policy
                </a>
                .
              </p>

              <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                <button className={btnOutline} onClick={handleRejectAll}>
                  Reject all
                </button>
                <button className={btnPrimary} onClick={handleSavePreferences}>
                  Save preferences
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </>
  )
}
