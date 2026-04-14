'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

type SectionHeaderProps = {
  title: React.ReactNode
  description?: React.ReactNode
  /** Primary actions on the right (e.g. buttons). */
  right?: React.ReactNode
  className?: string
  as?: 'h2' | 'h3' | 'h4'
}

/**
 * Row with a section title on the left and optional actions on the right.
 */
export default function SectionHeader({
  title,
  description,
  right,
  className,
  as: Comp = 'h2',
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-center justify-between gap-3',
        className
      )}
    >
      <div className="min-w-0 flex-1">
        <Comp className="text-lg font-semibold tracking-tight text-gray-700 dark:text-(--app-text)">
          {title}
        </Comp>
        {description ? (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {right ? (
        <div className="flex shrink-0 flex-wrap items-center gap-2">{right}</div>
      ) : null}
    </div>
  )
}
