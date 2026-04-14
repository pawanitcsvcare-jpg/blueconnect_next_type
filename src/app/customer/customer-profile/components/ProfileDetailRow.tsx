import type { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

type ProfileDetailRowProps = {
  icon: LucideIcon
  label: string
  value: string
  /** Subtle hover highlight (e.g. main subscription column). */
  interactive?: boolean
  className?: string
}

export default function ProfileDetailRow({
  icon: Icon,
  label,
  value,
  interactive = false,
  className,
}: ProfileDetailRowProps) {
  return (
    <div
      className={cn(
        'flex gap-3 last:border-b-0 dark:border-neutral-700/80',
        interactive ? 'py-3' : 'py-2.5',
        interactive &&
          'rounded-xl px-2 -mx-2 transition-colors hover:bg-[#f0f4ff]/95 dark:hover:bg-indigo-950/45',
        className
      )}
    >
      <Icon
        className={cn(
          'mt-0.5 size-4 shrink-0 text-neutral-400 dark:text-neutral-500',
          interactive && 'text-indigo-400/90 dark:text-indigo-400/70'
        )}
        aria-hidden
      />
      {/* One row per field: icon | label column | value column (aligned like City / State / Zip) */}
      <div className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-x-6 sm:gap-y-0">
        <span className="shrink-0 text-xs text-neutral-700 sm:w-42 sm:max-w-[50%] dark:text-neutral-400">
          {label}
        </span>
        <span className="min-w-0 flex-1 wrap-break-word text-left text-[13px] font-medium text-neutral-900 dark:text-neutral-100">
          {value}
        </span>
      </div>
    </div>
  )
}
