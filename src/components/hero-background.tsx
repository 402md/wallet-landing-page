'use client'

import dynamic from 'next/dynamic'

const FaultyTerminal = dynamic(() => import('@/components/FaultyTerminal'), {
  ssr: false
})

export const HeroBackground = () => (
  <div className="pointer-events-none absolute inset-0 hidden overflow-hidden md:block" aria-hidden="true">
    <FaultyTerminal
      scale={2.6}
      digitSize={5}
      scanlineIntensity={0.35}
      glitchAmount={0}
      flickerAmount={2}
      noiseAmp={0.4}
      chromaticAberration={0}
      dither={0.8}
      curvature={0}
      tint="#b9ff94"
      mouseReact={false}
      brightness={1.8}
      dpr={1}
      className=""
    />
  </div>
)
