'use client'

import { Expand, MessageSquareText } from 'lucide-react'

import { cn } from '@/lib/utils'

import type { CustomerNoteItem } from '../data/customer-profile-demo'

export type CustomerProfileNotesProps = {
  /** Section heading */
  title?: string
  /** Rows to render (newest-first recommended). */
  notes: CustomerNoteItem[]
  /** Called when the header expand control is activated. */
  onExpand?: () => void
  /** Shown when `notes` is empty. */
  emptyMessage?: string
  /** Max height of the scroll region (Tailwind class or arbitrary value). */
  listMaxHeightClassName?: string
  className?: string
}

export default function CustomerProfileNotes({
  title = 'Customer Notes',
  notes,
  onExpand,
  emptyMessage = 'No notes yet.',
  listMaxHeightClassName = 'max-h-[min(22rem,55vh)]',
  className,
}: CustomerProfileNotesProps) {
  return (
    <section
      className={cn(
        'flex flex-col overflow-hidden rounded-2xl border border-indigo-100/70 bg-white shadow-[0_8px_28px_-12px_rgba(79,70,229,0.14)] dark:border-indigo-900/45 dark:bg-slate-950',
        className,
      )}
    >
      <header className="relative flex items-center justify-between gap-3 border-b border-indigo-100/60 bg-linear-to-r from-slate-100/95 via-white to-indigo-50/40 px-4 py-3 dark:border-indigo-900/50 dark:from-slate-900/90 dark:via-slate-950 dark:to-indigo-950/40">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white/90 text-indigo-600 shadow-sm ring-1 ring-indigo-100/80 dark:bg-slate-900 dark:text-indigo-300 dark:ring-indigo-900/60">
            <MessageSquareText className="size-4" strokeWidth={1.75} aria-hidden />
          </span>
          <h2 className="truncate text-sm font-semibold tracking-tight text-slate-800 dark:text-slate-100">
            {title}
          </h2>
        </div>
        {onExpand ? (
          <button
            type="button"
            onClick={onExpand}
            className="grid size-9 shrink-0 place-items-center rounded-lg border-0 bg-transparent p-0 text-slate-600 transition-colors hover:bg-slate-100/90 hover:text-indigo-700 focus-visible:ring-2 focus-visible:ring-indigo-300/60 focus-visible:outline-none dark:text-slate-400 dark:hover:bg-slate-800/80 dark:hover:text-indigo-200"
            aria-label={`Expand ${title}`}
          >
            <Expand className="size-4 shrink-0" strokeWidth={2} aria-hidden />
          </button>
        ) : null}
      </header>

      <div
        className={cn(
          'min-h-48 flex-1 overflow-y-auto overscroll-contain px-1 [scrollbar-gutter:stable]',
          listMaxHeightClassName,
        )}
      >
        {notes.length === 0 ? (
          <p className="px-4 py-10 text-center text-sm text-slate-500 dark:text-slate-400">
            {emptyMessage}
          </p>
        ) : (
          <ul className="divide-y divide-slate-200/80 dark:divide-slate-700/90">
            {notes.map((note) => (
              <li
                key={note.id}
                className="group relative px-4 py-3.5 pl-5 transition-colors hover:bg-slate-50/90 dark:hover:bg-slate-900/50"
              >
                <span
                  className="absolute top-3.5 bottom-3.5 left-0 w-1 rounded-full bg-linear-to-b from-indigo-400 to-sky-400 opacity-80 group-hover:opacity-100"
                  aria-hidden
                />
                <div className="flex flex-col gap-1.5 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {note.author}
                    </p>
                    <p className="mt-0.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      {note.content}
                    </p>
                  </div>
                  <span
                    className="inline-flex w-fit shrink-0 rounded-full border-2 border-emerald-500 bg-emerald-50 px-2.5 h-7
                     py-1 text-xs font-semibold whitespace-nowrap text-emerald-900 shadow-sm dark:border-emerald-500 dark:bg-emerald-950/60 dark:text-emerald-100"
                    title={note.date}
                  >
                    {note.date}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
