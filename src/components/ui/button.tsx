import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const outlineColorVariantNames = [
  "outlinePrimary",
  "outlineSecondary",
  "outlineSuccess",
  "outlineInfo",
  "outlineWarning",
  "outlineDanger",
  "outlineLight",
] as const

const buttonVariants = cva(
  "group/button inline-flex w-auto cursor-pointer shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/30 dark:aria-invalid:border-destructive/50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        /** Royal blue — Primary (default) */
        default:
          "border border-[#3558c4] bg-[#4169E1] text-white shadow-sm hover:border-[#2d4ba8] hover:bg-[#3558c4] active:border-[#2847a3] active:bg-[#2d4ba8] focus-visible:border-[#2d4ba8] focus-visible:ring-[#4169E1]/45 [a]:hover:bg-[#3558c4]",
        /** Same as default — explicit `primary` */
        primary:
          "border border-[#4a5dcb] bg-[#5b6eeb] text-white shadow-sm hover:border-[#3558c4] hover:bg-[#3558c4] active:border-[#2d4ba8] active:bg-[#2d4ba8] focus-visible:border-[#2d4ba8] focus-visible:ring-[#4169E1]/45 [a]:hover:bg-[#3558c4]",
        /** Purple — Secondary (solid) */
        secondary:
          "border border-[#7839e8] bg-[#8A4AF3] text-white shadow-sm hover:border-[#6b2fd4] hover:bg-[#7839e8] active:border-[#5f28c4] active:bg-[#6b2fd4] focus-visible:border-[#6b2fd4] focus-visible:ring-[#8A4AF3]/45 aria-expanded:bg-[#7839e8]",
        success:
          "border border-[#63a800] bg-[#74C300] text-white shadow-sm hover:border-[#558f00] hover:bg-[#63a800] active:border-[#4a7a00] active:bg-[#558f00] focus-visible:border-[#558f00] focus-visible:ring-[#74C300]/45",
        info:
          "border border-[#2fa5ae] bg-[#3AB7BF] text-white shadow-sm hover:border-[#28939b] hover:bg-[#2fa5ae] active:border-[#23848b] active:bg-[#28939b] focus-visible:border-[#28939b] focus-visible:ring-[#3AB7BF]/45",
        warning:
          "border border-[#cc660c] bg-[#E6730E] text-white shadow-sm hover:border-[#b3590a] hover:bg-[#cc660c] active:border-[#9d4f09] active:bg-[#b3590a] focus-visible:border-[#b3590a] focus-visible:ring-[#E6730E]/45",
        /** Solid red — Danger */
        danger:
          "border border-[#c00304] bg-[#D90404] text-white shadow-sm hover:border-[#a80203] hover:bg-[#c00304] active:border-[#8f0203] active:bg-[#a80203] focus-visible:border-[#a80203] focus-visible:ring-[#D90404]/45",
        light:
          "border border-neutral-200/90 bg-[#F8F9FC] text-neutral-900 shadow-sm hover:border-neutral-300 hover:bg-[#eef1f7] active:border-neutral-400 active:bg-[#e4e8f0] focus-visible:border-neutral-400 focus-visible:ring-neutral-400/35 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:border-zinc-500 dark:hover:bg-zinc-700 dark:active:border-zinc-500 dark:active:bg-zinc-700 dark:focus-visible:ring-zinc-500/40",

        /** Outline — blue border & text */
        outlinePrimary:
          "border bg-transparent text-[#4169E1] border-[#4169E1] shadow-sm hover:bg-[#4169E1]/10 active:bg-[#4169E1]/15 focus-visible:ring-[#4169E1]/40",
        /** Outline — gold / amber border & text (not solid purple) */
        outlineSecondary:
          "border bg-transparent text-[#D4A017] border-[#D4A017] shadow-sm hover:bg-[#D4A017]/10 active:bg-[#D4A017]/15 focus-visible:ring-[#D4A017]/40",
        outlineSuccess:
          "border bg-transparent text-[#74C300] border-[#74C300] shadow-sm hover:bg-[#74C300]/10 active:bg-[#74C300]/15 focus-visible:ring-[#74C300]/40",
        outlineInfo:
          "border bg-transparent text-[#3AB7BF] border-[#3AB7BF] shadow-sm hover:bg-[#3AB7BF]/10 active:bg-[#3AB7BF]/15 focus-visible:ring-[#3AB7BF]/40",
        outlineWarning:
          "border bg-transparent text-[#E6730E] border-[#E6730E] shadow-sm hover:bg-[#E6730E]/10 active:bg-[#E6730E]/15 focus-visible:ring-[#E6730E]/40",
        outlineDanger:
          "border bg-transparent text-[#D90404] border-[#D90404] shadow-sm hover:bg-[#D90404]/10 active:bg-[#D90404]/15 focus-visible:ring-[#D90404]/40",
        outlineLight:
          "border bg-transparent text-neutral-900 border-neutral-300 shadow-sm hover:bg-neutral-100 active:bg-neutral-200/80 focus-visible:ring-neutral-400/40 dark:border-zinc-500 dark:text-zinc-100 dark:hover:bg-zinc-800 dark:active:bg-zinc-800",

        /** Neutral outline (shadcn-style) */
        outline:
          "border-border bg-background font-medium shadow-sm hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground focus-visible:ring-ring/50 dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        ghost:
          "font-medium hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground focus-visible:ring-ring/50 dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 font-medium text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/25 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link:
          "font-medium text-primary underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:ring-ring/50",
      },
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        icon: "size-8",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9",
      },
      /** Bold 2px border for colored outline variants (like `.btn-outline-*-2x`). */
      outlineWidth: {
        default: "",
        bold: "",
      },
    },
    compoundVariants: [
      {
        variant: [...outlineColorVariantNames],
        outlineWidth: "bold",
        class: "border-2",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
      outlineWidth: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  outlineWidth = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  const isBoldOutline =
    outlineWidth === "bold" &&
    variant != null &&
    (outlineColorVariantNames as readonly string[]).includes(variant)

  return (
    <ButtonPrimitive
      data-slot="button"
      data-outline-bold={isBoldOutline ? true : undefined}
      className={cn(
        buttonVariants({ variant, size, outlineWidth }),
        className
      )}
      {...props}
    />
  )
}

export { Button, buttonVariants, outlineColorVariantNames }
