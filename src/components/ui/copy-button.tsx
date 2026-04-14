'use client'

import * as React from 'react'
import { Check, Copy } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export type CopyButtonProps = Omit<
  React.ComponentProps<typeof Button>,
  'onClick' | 'type' | 'children'
> & {
  /** Plain text written to the clipboard when the button is activated. */
  text: string
  /** Sonner message on success. Pass `false` to suppress. */
  successToast?: string | false
  /** Sonner message when copy fails. Pass `false` to suppress. */
  errorToast?: string | false
  /** How long to show the check icon after a successful copy. */
  copiedDurationMs?: number
  children?: React.ReactNode
}

async function writeClipboard(value: string): Promise<void> {
  if (typeof window === 'undefined') return
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value)
    return
  }
  const textarea = document.createElement('textarea')
  textarea.value = value
  textarea.setAttribute('readonly', '')
  textarea.style.position = 'fixed'
  textarea.style.left = '-9999px'
  document.body.appendChild(textarea)
  textarea.select()
  try {
    const ok = document.execCommand('copy')
    if (!ok) throw new Error('copy command returned false')
  } finally {
    document.body.removeChild(textarea)
  }
}

export function CopyButton({
  text,
  successToast = 'Copied to clipboard',
  errorToast = 'Could not copy',
  copiedDurationMs = 2000,
  className,
  children,
  disabled,
  'aria-label': ariaLabel,
  ...buttonProps
}: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false)
  const timeoutRef = React.useRef<number | undefined>(undefined)

  React.useEffect(
    () => () => {
      if (timeoutRef.current !== undefined) {
        window.clearTimeout(timeoutRef.current)
      }
    },
    [],
  )

  const handleClick = async () => {
    try {
      await writeClipboard(text)
      if (successToast !== false) toast.success(successToast)
      setCopied(true)
      if (timeoutRef.current !== undefined) {
        window.clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = window.setTimeout(() => {
        setCopied(false)
        timeoutRef.current = undefined
      }, copiedDurationMs)
    } catch {
      if (errorToast !== false) toast.error(errorToast)
    }
  }

  const hasVisibleLabel = children != null && children !== false
  const fallbackA11y = !hasVisibleLabel ? 'Copy to clipboard' : undefined
  const accessibleName = ariaLabel ?? fallbackA11y
  const titleTip = !hasVisibleLabel ? (ariaLabel ?? 'Copy to clipboard') : undefined

  return (
    <Button
      type="button"
      disabled={disabled}
      aria-label={accessibleName}
      title={titleTip}
      onClick={() => void handleClick()}
      className={cn('gap-1', className)}
      {...buttonProps}
    >
      {copied ? (
        <Check
          className="size-4 shrink-0 text-emerald-600 dark:text-emerald-400"
          aria-hidden
        />
      ) : (
        <Copy className="size-4 shrink-0 opacity-80" aria-hidden />
      )}
      {children}
    </Button>
  )
}
