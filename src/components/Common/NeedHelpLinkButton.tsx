'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type NeedHelpLinkButtonProps = {
  href: string
  iconClass: string
  children: ReactNode
  /** Tighter sizing for `PageTopBar` header actions. */
  compact?: boolean
  title?: string
}

export function NeedHelpLinkButton({
  href,
  iconClass,
  children,
  compact,
  title,
}: NeedHelpLinkButtonProps) {
  const className = cn(
    buttonVariants({ variant: 'outlinePrimary', outlineWidth: 'bold' }),
    'inline-flex items-center justify-center gap-1.5 bg-white hover:bg-blue-50 no-underline',
    compact
      ? 'h-10 max-w-full px-2.5 text-xs sm:gap-2 sm:px-3 sm:text-sm'
      : 'h-11 min-w-[11rem] gap-2',
  )

  const isExternal = /^https?:\/\//i.test(href)
  const isInternal = href.startsWith('/') && !href.startsWith('//')

  if (isInternal) {
    return (
      <Link href={href} className={className} title={title}>
        <i className={iconClass} aria-hidden />
        {children}
      </Link>
    )
  }

  return (
    <a
      href={href}
      className={className}
      title={title}
      {...(isExternal
        ? { target: '_blank' as const, rel: 'noopener noreferrer' }
        : {})}
    >
      <i className={iconClass} aria-hidden />
      {children}
    </a>
  )
}
