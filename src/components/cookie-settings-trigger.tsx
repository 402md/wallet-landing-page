'use client'

import { consentPreferences } from '@/components/consent-banner'

export const CookieSettingsTrigger = () => (
  <button
    onClick={() => consentPreferences.open()}
    className="text-muted-foreground hover:text-foreground cursor-pointer text-xs transition-colors"
  >
    Cookie Settings
  </button>
)
