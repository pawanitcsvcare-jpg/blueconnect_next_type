'use client'

import * as React from 'react'
import { Expand, PenLine } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { CopyButton } from '@/components/ui/copy-button'
import { FormFieldControl } from '@/components/ui/form-field-control'
import { cn } from '@/lib/utils'

export type CustomerAddNotesProps = {
  /** Shown in the read-only Customer ID field and copied by the copy control. */
  customerId: string
  /** Called after validation when the user submits. */
  onSubmit?: (detail: {
    customerId: string
    notes: string
  }) => void | Promise<void>
  /** Panel title */
  title?: string
  notesLabel?: string
  customerIdLabel?: string
  placeholder?: string
  submitLabel?: string
  /** Disable the submit button */
  isSubmitting?: boolean
  /** Show copy control beside Customer ID */
  showCopyCustomerId?: boolean
  /** Header expand control */
  onExpand?: () => void
  className?: string
}

export default function CustomerAddNotes({
  customerId,
  onSubmit,
  title = 'Add Notes',
  notesLabel = 'Notes',
  customerIdLabel = 'Customer ID',
  placeholder = 'Begin typing your notes',
  submitLabel = 'Submit',
  isSubmitting = false,
  showCopyCustomerId = true,
  onExpand,
  className,
}: CustomerAddNotesProps) {
  const [body, setBody] = React.useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const trimmed = body.trim()
    if (!trimmed) {
      toast.error('Enter a note before submitting.')
      return
    }
    try {
      if (onSubmit) {
        await onSubmit({ customerId, notes: trimmed })
      }
      toast.success('Note saved')
      setBody('')
    } catch {
      toast.error('Could not save note')
    }
  }

  return (
    <section
      className={cn(
        'flex flex-col overflow-hidden rounded-2xl border border-indigo-100/70 bg-white shadow-[0_8px_28px_-12px_rgba(79,70,229,0.14)] dark:border-indigo-900/45 dark:bg-slate-950',
        className,
      )}
    >
      <header className="relative flex items-center justify-between gap-3 border-b border-indigo-100/60 bg-linear-to-r from-slate-100/95 via-white to-sky-50/35 px-4 py-3 dark:border-indigo-900/50 dark:from-slate-900/90 dark:via-slate-950 dark:to-sky-950/25">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white/90 text-indigo-600 shadow-sm ring-1 ring-indigo-100/80 dark:bg-slate-900 dark:text-indigo-300 dark:ring-indigo-900/60">
            <PenLine className="size-4" strokeWidth={1.75} aria-hidden />
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

      <form
        onSubmit={(e) => void handleSubmit(e)}
        className="flex flex-col gap-4 p-4 pt-4"
      >
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:gap-2">
          <div className="min-w-0 flex-1">
            <FormFieldControl
              type="text"
              id="add-notes-customer-id"
              label={customerIdLabel}
              value={customerId}
              readOnly
              inputClassName="cursor-default bg-slate-100 text-slate-800 dark:bg-slate-800/90 dark:text-slate-100"
            />
          </div>
        </div>

        <FormFieldControl
          type="textarea"
          id="add-notes-body"
          label={notesLabel}
          textareaClassName="h-24"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder={placeholder}
          disabled={isSubmitting}
          rows={6}
        />

        <div className="flex justify-end pt-1">
          <Button
            type="submit"
            variant="primary"
            className="min-w-28 px-6"
            disabled={isSubmitting}
          >
            {submitLabel}
          </Button>
        </div>
      </form>
    </section>
  )
}
