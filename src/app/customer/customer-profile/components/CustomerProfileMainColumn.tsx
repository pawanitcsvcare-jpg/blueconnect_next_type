'use client'

import * as React from 'react'
import { Check, MoreVertical } from 'lucide-react'

import { cn } from '@/lib/utils'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { allProfileTabItems } from '../data/customer-profile-demo'
import CustomerProfileDetailPanel from './CustomerProfileDetailPanel'
import CustomerProfileStatus from './CustomerProfileStatus'

const TAB_TRIGGER_MEASURE_CLASS =
  'shrink-0 cursor-pointer rounded-full border-0 px-4 py-3 text-sm font-medium whitespace-nowrap shadow-none'

/** `size-10` trigger width (2.5rem). */
const MENU_TRIGGER_PX = 40

const allTabs = allProfileTabItems

function countTabsThatFit(
  widths: number[],
  gapPx: number,
  availablePx: number
): number {
  if (widths.length === 0) return 0
  let used = 0
  let count = 0
  for (let i = 0; i < widths.length; i++) {
    const step = widths[i] + (count > 0 ? gapPx : 0)
    if (used + step <= availablePx) {
      used += step
      count++
    } else {
      break
    }
  }
  return Math.max(1, Math.min(count, widths.length))
}

export default function CustomerProfileMainColumn() {
  const [activeTab, setActiveTab] = React.useState('carrier')
  const [visibleCount, setVisibleCount] = React.useState<number>(allTabs.length)

  const containerRef = React.useRef<HTMLDivElement>(null)
  const measureRowRef = React.useRef<HTMLDivElement>(null)

  const recomputeVisibleTabs = React.useCallback(() => {
    const container = containerRef.current
    const measureRow = measureRowRef.current
    if (!container || !measureRow) return

    const tabsGapStr =
      getComputedStyle(measureRow).columnGap || getComputedStyle(measureRow).gap
    const tabsGapPx = parseFloat(tabsGapStr) || 4

    const siblingGapStr =
      getComputedStyle(container).columnGap || getComputedStyle(container).gap
    const siblingGapPx = parseFloat(siblingGapStr) || 4

    const children = Array.from(measureRow.children) as HTMLElement[]
    if (children.length === 0) return

    const widths = children.map((c) => c.getBoundingClientRect().width)
    const cs = getComputedStyle(container)
    const padL = parseFloat(cs.paddingLeft) || 0
    const padR = parseFloat(cs.paddingRight) || 0
    const rowWidth = container.clientWidth - padL - padR

    const totalTabsWidth = widths.reduce(
      (acc, w, i) => acc + w + (i > 0 ? tabsGapPx : 0),
      0
    )

    let next: number
    if (totalTabsWidth <= rowWidth) {
      next = widths.length
    } else {
      const availableForTabRow = rowWidth - MENU_TRIGGER_PX - siblingGapPx
      next = countTabsThatFit(widths, tabsGapPx, availableForTabRow)
    }

    setVisibleCount((prev) => (prev === next ? prev : next))
  }, [])

  React.useLayoutEffect(() => {
    recomputeVisibleTabs()
    const ro = new ResizeObserver(() => recomputeVisibleTabs())
    const el = containerRef.current
    if (el) ro.observe(el)

    const onResize = () => recomputeVisibleTabs()
    window.addEventListener('resize', onResize)
    void document.fonts?.ready?.then(() => recomputeVisibleTabs())

    return () => {
      ro.disconnect()
      window.removeEventListener('resize', onResize)
    }
  }, [recomputeVisibleTabs])

  const visibleTabs = allTabs.slice(0, visibleCount)
  const overflowTabs = allTabs.slice(visibleCount)
  const showOverflowMenu = overflowTabs.length > 0

  const openTabFromMenu = React.useCallback((id: string) => {
    setActiveTab(id)
  }, [])

  const overflowMenuActive = overflowTabs.some((t) => t.id === activeTab)

  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="flex w-full min-w-0 flex-col gap-5"
    >
      <div className="relative">
        <div
          className="pointer-events-none absolute -inset-1 rounded-[1.15rem] bg-linear-to-br from-indigo-300/35 via-sky-200/25 to-indigo-200/20 opacity-90 blur-xl dark:from-indigo-600/20 dark:via-sky-900/15 dark:to-indigo-900/10"
          aria-hidden
        />
        <div className="relative overflow-hidden rounded-2xl border border-indigo-100/70 bg-linear-to-br from-[#f4f6ff] via-white to-sky-50/40 shadow-[0_2px_16px_-4px_rgba(79,70,229,0.12)] dark:border-indigo-900/50 dark:from-indigo-950/50 dark:via-slate-900 dark:to-slate-950">
          <div
            className="pointer-events-none absolute -right-12 -top-12 size-36 rounded-full bg-indigo-400/10 dark:bg-indigo-500/10"
            aria-hidden
          />
          <div
            ref={containerRef}
            className="relative flex min-h-13 min-w-0 items-center gap-1 rounded-[0.85rem] bg-white/90 px-1.5 py-2 shadow-inner shadow-indigo-950/5 backdrop-blur-[2px] sm:gap-2 sm:px-2 dark:bg-slate-900/80"
          >
            {/* Off-screen width probes — matches trigger padding/font so overflow count is accurate */}
            <div
              ref={measureRowRef}
              className="pointer-events-none invisible absolute left-0 top-0 z-[-1] flex flex-nowrap gap-1 sm:gap-2"
              aria-hidden
            >
              {allTabs.map((tab) => (
                <span key={tab.id} className={TAB_TRIGGER_MEASURE_CLASS}>
                  {tab.label}
                </span>
              ))}
            </div>

            <TabsList
              variant="default"
              className="h-auto min-h-0 min-w-0 flex-1 flex-nowrap items-center justify-start gap-1 overflow-hidden bg-transparent p-0 shadow-none sm:gap-2"
            >
              {visibleTabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="shrink-0 cursor-pointer rounded-full border-0 px-4 py-3 text-sm font-medium whitespace-nowrap text-slate-800 shadow-none ring-0 outline-none after:hidden transition-[color,background-color,box-shadow] duration-200 hover:bg-indigo-50/90 focus-visible:ring-2 focus-visible:ring-indigo-300/50 data-active:bg-[#E0E7FF] data-active:font-medium data-active:text-slate-900 data-active:shadow-[0_1px_0_0_rgba(99,102,241,0.12)] data-active:hover:bg-indigo-200/70 dark:text-slate-200 dark:hover:bg-slate-800/90 dark:data-active:bg-indigo-950/70 dark:data-active:text-white dark:data-active:shadow-none dark:data-active:hover:bg-indigo-900/55"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {showOverflowMenu ? (
              <DropdownMenu>
                <DropdownMenuTrigger
                  className={cn(
                    'ml-auto inline-flex size-10 shrink-0 items-center justify-center rounded-full text-slate-600 outline-none transition-colors hover:bg-indigo-50 hover:text-indigo-700 focus-visible:ring-2 focus-visible:ring-indigo-300/50 dark:text-slate-400 dark:hover:bg-indigo-950/60 dark:hover:text-indigo-200',
                    overflowMenuActive &&
                      'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/80 dark:text-indigo-200'
                  )}
                  aria-label="More tabs and actions"
                >
                  <MoreVertical className="size-5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-56">
                  {overflowTabs.map((item) => (
                    <DropdownMenuItem
                      key={item.id}
                      onClick={() => openTabFromMenu(item.id)}
                      className={cn(
                        'flex items-center gap-2',
                        item.id === activeTab && 'bg-accent/80'
                      )}
                    >
                      {item.id === activeTab ? (
                        <Check className="size-4 shrink-0 opacity-90" aria-hidden />
                      ) : (
                        <span className="size-4 shrink-0" aria-hidden />
                      )}
                      <span className="flex-1 text-left">{item.label}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : null}
          </div>
        </div>
      </div>

      {allProfileTabItems.map((tab) => (
        <TabsContent
          key={tab.id}
          value={tab.id}
          className="relative mt-0 min-w-0 overflow-hidden rounded-2xl border border-indigo-100/60 bg-white p-6 shadow-[0_12px_40px_-18px_rgba(79,70,229,0.18)] outline-none before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl before:bg-[radial-gradient(700px_circle_at_100%_-20%,rgba(99,102,241,0.07),transparent_55%)] dark:border-indigo-900/40 dark:bg-slate-950 dark:shadow-[0_8px_32px_-12px_rgba(0,0,0,0.45)] dark:before:bg-[radial-gradient(600px_circle_at_100%_0%,rgba(99,102,241,0.12),transparent_50%)]"
        >
          <div className="relative">
            {tab.id === 'carrier' ? (
              <CustomerProfileDetailPanel />
            ) : tab.id === 'status' ? (
              <CustomerProfileStatus />
            ) : (
              <div className="rounded-xl border border-dashed border-indigo-200/60 bg-linear-to-br from-indigo-50/40 via-white to-sky-50/30 px-6 py-16 text-center dark:border-indigo-900/50 dark:from-indigo-950/30 dark:via-slate-900 dark:to-slate-900">
                <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  {tab.label}
                </p>
                <p className="mx-auto mt-3 max-w-sm text-sm text-slate-500 dark:text-slate-400">
                  This section is not implemented in the demo. Connect your API to
                  show live data.
                </p>
              </div>
            )}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}
