'use client'

import * as React from 'react'
import { createPortal } from 'react-dom'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import {
  filterSidebarSearchItems,
  type SidebarSearchItem,
} from './sidebarSearchData'

const MAX_SUGGESTIONS = 20
const DROPDOWN_Z = 10002

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/** Highlights case-insensitive matches for each whitespace-separated token in `query`. */
function HighlightLabel({
  text,
  query,
}: {
  text: string
  query: string
}) {
  const tokens = [
    ...new Set(
      query
        .trim()
        .split(/\s+/)
        .map((t) => t.trim())
        .filter(Boolean),
    ),
  ].sort((a, b) => b.length - a.length)

  if (!tokens.length) {
    return <span className="leading-snug">{text}</span>
  }

  const pattern = tokens.map(escapeRegExp).join('|')
  if (!pattern) {
    return <span className="leading-snug">{text}</span>
  }

  const re = new RegExp(`(${pattern})`, 'gi')
  const parts = text.split(re)

  return (
    <span className="leading-snug">
      {parts.map((part, i) => {
        if (part === '') return null
        const hit = tokens.some((t) => t.toLowerCase() === part.toLowerCase())
        if (hit) {
          return (
            <span
              key={`m-${i}`}
              className="font-semibold text-indigo-600 underline decoration-indigo-500/70 underline-offset-2 dark:text-indigo-400 dark:decoration-indigo-400/80"
            >
              {part}
            </span>
          )
        }
        return <span key={`t-${i}`}>{part}</span>
      })}
    </span>
  )
}

export default function SideSearch() {
  const router = useRouter()
  const [query, setQuery] = React.useState('')
  const [open, setOpen] = React.useState(false)
  const [activeIndex, setActiveIndex] = React.useState(0)
  const [anchor, setAnchor] = React.useState<DOMRect | null>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const portalRef = React.useRef<HTMLDivElement>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const results = React.useMemo(
    () => filterSidebarSearchItems(query, MAX_SUGGESTIONS),
    [query],
  )

  React.useEffect(() => {
    setActiveIndex(0)
  }, [query])

  const trimmed = query.trim()
  const showPanel = open && trimmed.length > 0
  const showList = showPanel && results.length > 0
  const showEmpty = showPanel && results.length === 0

  React.useLayoutEffect(() => {
    if (!showList) return
    const id = results[activeIndex]?.id
    if (!id) return
    document
      .getElementById(`sidebar-search-opt-${id}`)
      ?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
  }, [activeIndex, results, showList])

  const syncAnchor = React.useCallback(() => {
    const el = inputRef.current
    if (!el) {
      setAnchor(null)
      return
    }
    setAnchor(el.getBoundingClientRect())
  }, [])

  React.useLayoutEffect(() => {
    if (!showPanel) {
      setAnchor(null)
      return
    }
    syncAnchor()
    const el = inputRef.current
    if (!el) return undefined
    const ro = new ResizeObserver(() => syncAnchor())
    ro.observe(el)
    window.addEventListener('scroll', syncAnchor, true)
    window.addEventListener('resize', syncAnchor)
    return () => {
      ro.disconnect()
      window.removeEventListener('scroll', syncAnchor, true)
      window.removeEventListener('resize', syncAnchor)
    }
  }, [showPanel, syncAnchor])

  React.useEffect(() => {
    if (!open) return
    const onDocMouseDown = (e: MouseEvent) => {
      const t = e.target as Node
      if (containerRef.current?.contains(t)) return
      if (portalRef.current?.contains(t)) return
      setOpen(false)
    }
    document.addEventListener('mousedown', onDocMouseDown)
    return () => document.removeEventListener('mousedown', onDocMouseDown)
  }, [open])

  const goTo = React.useCallback(
    (item: SidebarSearchItem) => {
      setOpen(false)
      setQuery('')
      setAnchor(null)
      inputRef.current?.blur()

      if (!item.href) {
        toast.message('This screen is not linked yet', {
          description: item.breadcrumbs.join(' › '),
        })
        return
      }

      router.push(item.href)
    },
    [router],
  )

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!results.length) {
      if (e.key === 'Escape') {
        e.preventDefault()
        setOpen(false)
        setQuery('')
      }
      return
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setOpen(true)
      setActiveIndex((i) => (i + 1) % results.length)
      return
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setOpen(true)
      setActiveIndex((i) => (i - 1 + results.length) % results.length)
      return
    }
    if (e.key === 'Enter') {
      e.preventDefault()
      const pick = results[activeIndex] ?? results[0]
      if (pick) goTo(pick)
      return
    }
    if (e.key === 'Escape') {
      e.preventDefault()
      setOpen(false)
      setQuery('')
    }
  }

  const dropdown =
    showPanel && anchor ? (
      <div
        ref={portalRef}
        className="rounded-xl border border-slate-200/90 bg-white shadow-lg dark:border-slate-600 dark:bg-slate-900"
        style={{
          position: 'fixed',
          top: anchor.bottom + 4,
          left: anchor.left,
          width: anchor.width,
          zIndex: DROPDOWN_Z,
        }}
      >
        {showList ? (
          <ul
            id="sidebar-search-suggestions"
            role="listbox"
            className="max-h-64 overflow-y-auto py-1"
          >
            {results.map((item, index) => {
              const label = item.breadcrumbs.join(' › ')
              const isActive = index === activeIndex
              return (
                <li key={item.id} role="presentation" className="px-1 py-0.5">
                  <button
                    type="button"
                    role="option"
                    aria-selected={isActive}
                    id={`sidebar-search-opt-${item.id}`}
                    className={`group flex w-full cursor-pointer flex-col gap-0.5 rounded-lg border-l-2 py-2 pr-2 pl-2.5 text-left text-sm transition-colors duration-150 ${
                      isActive
                        ? 'border-indigo-500 text-indigo-700 dark:border-indigo-400 dark:text-indigo-300'
                        : 'border-transparent text-slate-800 hover:text-indigo-600 dark:text-slate-100 dark:hover:text-indigo-400'
                    }`}
                    onMouseEnter={() => setActiveIndex(index)}
                    onMouseDown={(e) => {
                      e.preventDefault()
                      goTo(item)
                    }}
                  >
                    <span className={isActive ? 'font-semibold' : 'font-medium'}>
                      <HighlightLabel text={label} query={trimmed} />
                    </span>
                    {!item.href ? (
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        Route not wired
                      </span>
                    ) : null}
                  </button>
                </li>
              )
            })}
          </ul>
        ) : showEmpty ? (
          <div
            id="sidebar-search-empty"
            className="px-3 py-2.5 text-sm text-slate-500 dark:text-slate-400"
            role="status"
          >
            No menu matches &ldquo;{trimmed}&rdquo;
          </div>
        ) : null}
      </div>
    ) : null

  return (
    <div ref={containerRef} className="relative z-100">
      <div className="globally-searchbar">
        <div className="relative">
          <div
            className="ri-search-line pointer-events-none absolute top-search-icons left-[10px] top-1/2 -translate-y-1/2 text-base"
            aria-hidden
          />
          <input
            ref={inputRef}
            type="search"
            role="combobox"
            aria-expanded={showPanel}
            aria-controls={
              showList
                ? 'sidebar-search-suggestions'
                : showEmpty
                  ? 'sidebar-search-empty'
                  : undefined
            }
            aria-autocomplete="list"
            autoComplete="off"
            spellCheck={false}
            className=""
            placeholder="Search menu…"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setOpen(true)
            }}
            onFocus={() => {
              if (trimmed.length > 0) setOpen(true)
            }}
            onKeyDown={onKeyDown}
          />
        </div>
      </div>

      {typeof document !== 'undefined' && dropdown
        ? createPortal(dropdown, document.body)
        : null}
    </div>
  )
}
