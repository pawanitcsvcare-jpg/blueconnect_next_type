"use client"

import * as React from "react"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { XIcon } from "lucide-react"

function Dialog({ ...props }: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({ ...props }: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({ ...props }: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({ ...props }: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
  className,
  ...props
}: DialogPrimitive.Backdrop.Props) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 isolate z-50 bg-black/35 supports-backdrop-filter:backdrop-blur-sm",
        "motion-safe:data-open:animate-in motion-safe:data-open:fade-in-0 motion-safe:data-open:duration-300 motion-safe:data-open:ease-out",
        "motion-safe:data-closed:animate-out motion-safe:data-closed:fade-out-0 motion-safe:data-closed:duration-200 motion-safe:data-closed:ease-in",
        "motion-reduce:data-open:animate-none motion-reduce:data-closed:animate-none",
        className
      )}
      {...props}
    />
  )
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: DialogPrimitive.Popup.Props & {
  showCloseButton?: boolean
}) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Popup
        data-slot="dialog-content"
        className={cn(
          "fixed top-1/2 left-1/2 z-50 flex w-full max-w-[calc(100%-2rem)] origin-center -translate-x-1/2 -translate-y-1/2 flex-col gap-4",
          "min-h-0 max-h-[min(90dvh,48rem)] overflow-hidden p-6 pb-0",
          "rounded-2xl border border-border/60 bg-popover text-sm text-popover-foreground antialiased",
          "shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] ring-1 ring-black/5 dark:border-border/50 dark:bg-popover dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.45)] dark:ring-white/10",
          "outline-none will-change-[transform,opacity]",
          "sm:max-w-md",
          /* Open: fade + scale up + rise from below */
          "motion-safe:data-open:animate-in motion-safe:data-open:fade-in-0 motion-safe:data-open:zoom-in-95 motion-safe:data-open:slide-in-from-bottom-5",
          "motion-safe:data-open:duration-300 motion-safe:data-open:ease-[cubic-bezier(0.16,1,0.3,1)]",
          /* Close: quicker ease-in, slight drop + scale down */
          "motion-safe:data-closed:animate-out motion-safe:data-closed:fade-out-0 motion-safe:data-closed:zoom-out-95 motion-safe:data-closed:slide-out-to-bottom-3",
          "motion-safe:data-closed:duration-200 motion-safe:data-closed:ease-in",
          "motion-reduce:data-open:animate-none motion-reduce:data-closed:animate-none",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            render={
              <Button
                variant="ghost"
                className="absolute top-3 right-3 z-10 size-9 rounded-full text-muted-foreground hover:bg-muted/90 hover:text-foreground"
                size="icon-sm"
              />
            }
          >
            <XIcon className="size-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Popup>
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn(
        "shrink-0 flex flex-col gap-2 pr-10 text-left sm:pr-12",
        className
      )}
      {...props}
    />
  )
}

function DialogBody({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-body"
      className={cn(
        "min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-y-contain [-webkit-overflow-scrolling:touch]",
        className
      )}
      {...props}
    />
  )
}

function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  showCloseButton?: boolean
}) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "gap-2 border-0 bg-transparent px-6 py-4 sm:flex-row sm:justify-end shrink-0 -mx-6 mb-2 mt-2 flex flex-col-reverse rounded-b-2xl ",
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close render={<Button variant="outline" />}>
          Close
        </DialogPrimitive.Close>
      )}
    </div>
  )
}

function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(
        "font-heading text-lg font-semibold leading-snug tracking-tight text-foreground",
        className
      )}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        "text-sm leading-relaxed text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
