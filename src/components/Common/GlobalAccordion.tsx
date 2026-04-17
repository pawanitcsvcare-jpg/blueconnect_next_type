'use client'

import * as React from 'react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { cn } from '@/lib/utils'

export type SubscriptionAccordionPanel = {
  /** Unique id for this panel (passed to `AccordionItem` `value`). */
  value: string
  /** Trigger label. */
  title: React.ReactNode
  /** Panel body. */
  children: React.ReactNode
  /** Merged onto the default item shell classes. */
  itemClassName?: string
  /** Merged onto the default trigger classes (e.g. `rounded-xl` for the first row). */
  triggerClassName?: string
  /** Merged onto `AccordionContent` (wrapper keeps `pb-3`). */
  contentClassName?: string
}

export type GlobalAccordionProps = {
  panels: SubscriptionAccordionPanel[]
  /** Initially expanded item values (single- or multi-open depending on `multiple`). */
  defaultValue?: string[]
  /** Allow more than one section open at once. */
  multiple?: boolean
  /** Classes on the Accordion root. */
  className?: string
}

const itemShellClass =
  ''

const triggerShellClass = cn(
  'accrodian-bg items-center bg-blue-100 hover:bg-blue-100 dark:bg-[#101928] cursor-pointer dark:hover:bg-[#101928] dark:text-white mb-2 gap-3 rounded-lg py-4 pr-1 pl-2 text-sm font-medium text-slate-800 no-underline transition-colors hover:no-underline focus-visible:ring-2 focus-visible:ring-indigo-200/80 focus-visible:ring-offset-1  **:data-[slot=accordion-trigger-icon]:text-slate-400 dark:**:data-[slot=accordion-trigger-icon]:text-slate-500',
)

/**
 * Subscription-style accordion: shared trigger chrome and item borders, driven by `panels`.
 */
export function GlobalAccordion({
  panels,
  defaultValue,
  multiple = false,
  className,
}: GlobalAccordionProps) {
  return (
    <Accordion
      multiple={multiple}
      defaultValue={defaultValue}
      className={cn(
        'flex w-full flex-col gap-0 border-0 bg-transparent shadow-none',
        className,
      )}
    >
      {panels.map((panel) => (
        <AccordionItem
          key={panel.value}
          value={panel.value}
          className={cn(itemShellClass, panel.itemClassName)}
        >
          <AccordionTrigger
            className={cn(triggerShellClass, panel.triggerClassName)}
          >
            {panel.title}
          </AccordionTrigger>
          <AccordionContent
            className={cn('pb-3', panel.contentClassName)}
          >
            {panel.children}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
