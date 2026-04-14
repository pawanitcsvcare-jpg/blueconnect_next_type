import { cn } from '@/lib/utils'

/**
 * Tailwind classes aligned with `Input` (`input.tsx`) for triggers such as
 * date pickers and popovers so height, border, and focus match text inputs.
 */
export const inputLikeTriggerClassName =
  'h-12 mb-0 w-full min-w-0 justify-between rounded-lg border border-input bg-transparent px-2.5 py-1 text-left text-base font-normal text-foreground shadow-none md:text-sm hover:bg-transparent data-[empty=true]:text-muted-foreground dark:data-[empty=true]:text-(--app-input-placeholder) dark:bg-(--app-input-bg) focus-visible:border-blue-300 focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:outline-none'

export function inputLikeTriggerClassNames(...classes: (string | undefined | false)[]) {
  return cn(inputLikeTriggerClassName, ...classes)
}
