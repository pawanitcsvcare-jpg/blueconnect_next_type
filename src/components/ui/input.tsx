import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-12 mb-4 w-full md:text-sm font-normal min-w-0 rounded-lg border border-input bg-white px-2.5 py-1 text-base text-foreground transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-white file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-blue-300 focus-visible:ring-2 focus-visible:ring-blue-500/40 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:bg-(--app-input-bg) dark:placeholder:text-(--app-input-placeholder) dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        "focus:border-blue-200 focus:ring-primary",
        className
      )}
      {...props}
    />
  )
}

export { Input }
