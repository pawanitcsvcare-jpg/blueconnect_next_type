'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import BlueConnectsLogo from '@/app/assets/images/BlueConnectsLogo.png'
import { ThemeModeToggle } from '@/components/layout/ThemeMode'


const REFRESH_SECONDS = 90

export default function VnocHeader() {
  const router = useRouter()
  const [seconds, setSeconds] = useState(REFRESH_SECONDS)

  useEffect(() => {
    const id = window.setInterval(() => {
      setSeconds((s) => (s <= 1 ? REFRESH_SECONDS : s - 1))
    }, 1000)
    return () => window.clearInterval(id)
  }, [])

  const handleRefresh = useCallback(() => {
    setSeconds(REFRESH_SECONDS)
    router.refresh()
  }, [router])



  const tickTurn = 1 - seconds / REFRESH_SECONDS

  return (
    <header className="vnoc-header vnoc-header--creative" data-shell="vnoc">
      <div className="vnoc-header__aurora" aria-hidden />
      <div className="vnoc-header__grid-noise" aria-hidden />

      <div className="vnoc-header__row">
        <div className="vnoc-header__brand-group">
          <Link href="/vnoc/wholesale-request-chart" className="vnoc-header__brand-shell">
            <Image
              src={BlueConnectsLogo}
              alt="BlueConnects"
              width={132}
              height={32}
              className="vnoc-header__logo-img"
              priority
            />
          </Link>
          <span className="vnoc-header__channel-pill" title="Virtual NOC channel">
            <span className="vnoc-header__channel-dot" aria-hidden />
            NOC
          </span>
        </div>

        <div className="vnoc-header__title-cluster">
          <h1 className="vnoc-header__headline">
            <span className="vnoc-header__headline-muted">Virtual</span>{' '}
            <span className="vnoc-header__headline-pop">NOC</span>
          </h1>
          <p className="vnoc-header__eyebrow">Live operations surface</p>
        </div>

        <div className="vnoc-header__toolbar">
        <ThemeModeToggle />
          <button type="button" className="vnoc-header__tool" aria-label="Fullscreen">
            <i className="ri-fullscreen-line text-lg" aria-hidden />
          </button>
          <button
            type="button"
            className="vnoc-header__refresh-pill"
            onClick={handleRefresh}
            aria-label="Refresh data"
          >
            <span className="vnoc-header__refresh-ring-wrap" aria-hidden>
              <span
                className="vnoc-header__refresh-ring"
                style={{ '--vnoc-p': `${tickTurn}turn` } as React.CSSProperties}
              />
              <i className="ri-refresh-line vnoc-header__refresh-ico" />
            </span>
            <span className="vnoc-header__refresh-label">
              <span className="vnoc-header__refresh-num">{seconds}</span>
              <span className="vnoc-header__refresh-unit">s</span>
            </span>
          </button>
          <Link
            href="/dashboard"
            className="vnoc-header__tool vnoc-header__tool--home"
            title="Main app"
            aria-label="Back to main app"
          >
            <i className="ri-home-4-line text-lg" />
          </Link>
        </div>
      </div>

      <div className="vnoc-header__rail" aria-hidden />
    </header>
  )
}
