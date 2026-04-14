"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className={cn(
        "relative w-full overflow-x-auto overflow-hidden rounded-2xl mt-4",
        "border border-(--app-card-border) bg-(--app-card-bg)",
        "bg-linear-to-br from-(--app-card-bg) via-(--app-card-bg) to-[#4169E1]/6",
        "dark:border-(--app-card-border) dark:from-(--app-card-bg) dark:via-(--app-card-bg) dark:to-[#4169E1]/8",
        "dark:shadow-[0_4px_28px_-6px_rgba(0,0,0,0.25)]"
      )}
    >
      <table
        data-slot="table"
        className={cn(
          "w-full caption-bottom border-collapse border border-border text-sm",
          "[&_tbody_tr:nth-child(even)]:bg-(--app-table-row-stripe)",
          "[&_tbody_tr:last-child]:border-b-0 [&_tfoot_tr:last-child]:border-b-0",
          className
        )}
        {...props}
      />
    </div>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn(
        "relative z-1 [&_tr]:border-0",
        className
      )}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn(
        "[&_tr:last-child]:border-b-0",
        "[&>tr]:transition-[background-color,box-shadow] [&>tr]:duration-200",
        "[&>tr]:hover:bg-linear-to-r [&>tr]:hover:from-primary/7 [&>tr]:hover:via-primary/3 [&>tr]:hover:to-transparent",
        "[&>tr]:hover:shadow-[inset_3px_0_0_0_rgba(65,105,225,0.55)]",
        "dark:[&>tr]:hover:from-primary/12 dark:[&>tr]:hover:via-primary/5",
        "dark:[&>tr]:hover:shadow-[inset_3px_0_0_0_rgba(91,110,235,0.65)]",
        className
      )}
      {...props}
    />
  )
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "border-t border-border/60 bg-muted/40 font-medium backdrop-blur-[2px] dark:bg-muted/25 [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  )
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "group/row relative border-b border-border",
        "has-aria-expanded:bg-muted/60 data-[state=selected]:bg-muted/80",
        className
      )}
      {...props}
    />
  )
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "h-12 border-r border-(--app-card-border) px-4 text-left align-middle font-semibold whitespace-nowrap",
        "border-b border-(--app-card-border) bg-(--app-table-header-bg) text-[0.7rem] uppercase tracking-[0.12em] text-(--app-table-header-fg)",
        "last:border-r-0",
        "first:pl-5 last:pr-5 [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  )
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "border-r border-border px-4 py-3.5 align-middle text-foreground/95 whitespace-nowrap",
        "last:border-r-0 dark:border-border",
        "first:pl-5 last:pr-5 [&:has([role=checkbox])]:w-px [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  )
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn(
        "mt-4 px-1 text-center text-sm text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
