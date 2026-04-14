'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

const NAV: {
  href: string
  label: string
  icon: string
  tile: 'chart' | 'warn' | 'screen' | 'doc' | 'bars'
}[] = [
  {
    href: '/vnoc/wholesale-request-chart',
    label: 'Wholesale Request Chart',
    icon: 'ri-bar-chart-box-line',
    tile: 'chart',
  },
  {
    href: '/vnoc/wholesale-request-response',
    label: 'Wholesale Request & Response',
    icon: 'ri-arrow-left-right-line',
    tile: 'warn',
  },
  {
    href: '/vnoc/hourly-api-records',
    label: 'Hourly API Records',
    icon: 'ri-calendar-todo-line',
    tile: 'screen',
  },
  {
    href: '/vnoc/mvno-day-wise-api-records',
    label: 'MVNO Day Wise API Records',
    icon: 'ri-building-2-line',
    tile: 'doc',
  },
  {
    href: '/vnoc/api-request-count',
    label: 'API Request Count',
    icon: 'ri-bar-chart-horizontal-line',
    tile: 'bars',
  },
  {
    href: '/vnoc/api-5min-graph',
    label: 'API 5 Minutes Graph',
    icon: 'ri-line-chart-line',
    tile: 'chart',
  },
  {
    href: '/vnoc/api-transactions',
    label: 'API Transactions',
    icon: 'ri-exchange-funds-line',
    tile: 'doc',
  },
  {
    href: '/vnoc/api-latency',
    label: 'API Latency',
    icon: 'ri-timer-flash-line',
    tile: 'warn',
  },
  {
    href: '/vnoc/notification-count-report',
    label: 'Notification Count Report',
    icon: 'ri-notification-3-line',
    tile: 'screen',
  },
]

const tileClass: Record<(typeof NAV)[number]['tile'], string> = {
  chart: 'vnoc-icon-tile--chart',
  warn: 'vnoc-icon-tile--warn',
  screen: 'vnoc-icon-tile--screen',
  doc: 'vnoc-icon-tile--doc',
  bars: 'vnoc-icon-tile--bars',
}

function normalizePath(p: string) {
  if (p.length > 1 && p.endsWith('/')) return p.slice(0, -1)
  return p || '/'
}

export default function VnocSidebar() {
  const pathname = normalizePath(usePathname() ?? '/')

  return (
    <aside className="vnoc-sidebar" aria-label="Virtual NOC navigation">
      <nav className="vnoc-sidebar__nav">
        {NAV.map((item) => {
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn('vnoc-sidebar__link', active && 'vnoc-sidebar__link--active')}
            >
              <span className={cn('vnoc-sidebar__icon', tileClass[item.tile])}>
                <i className={item.icon} aria-hidden />
              </span>
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
