import { cn } from '@/lib/utils'

/** Default empty state inside the blue-grey main canvas. */
export function VnocCanvasEmpty({ title }: { title: string }) {
  return (
    <div
      className={cn(
        'flex min-h-[min(420px,55vh)] flex-col items-center justify-center rounded-xl border border-dashed border-slate-400/40 bg-white/30 p-8 text-center dark:border-white/15 dark:bg-black/15'
      )}
    >
      <i className="ri-layout-4-line mb-3 text-4xl text-slate-500 dark:text-slate-400" aria-hidden />
      <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{title}</p>
      <p className="mt-1 max-w-md text-xs text-slate-600 dark:text-slate-400">
        Chart or table content goes here. Connect your API and drop a component into this route.
      </p>
    </div>
  )
}
