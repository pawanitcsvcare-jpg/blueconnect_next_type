'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { ChevronDownIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { inputLikeTriggerClassNames } from '@/components/ui/input-like-trigger'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

export type FormSelectOption = { label: string; value: string | null }

type FieldShellProps = {
  id: string
  label: React.ReactNode
  required?: boolean
  className?: string
  /** Extra content on the same row as the label (e.g. action button). */
  labelEnd?: React.ReactNode
  /** Inline after the label (e.g. info tooltip). */
  labelAccessory?: React.ReactNode
  labelClassName?: string
  /** Sets `data-invalid` on the field for styling / a11y. */
  invalid?: boolean
  children: React.ReactNode
}

function FieldShell({
  id,
  label,
  required,
  className,
  labelEnd,
  labelAccessory,
  labelClassName,
  invalid,
  children,
}: FieldShellProps) {
  const mark = required ? <span className="text-red-500"> *</span> : null

  const labelNode = labelEnd ? (
    <div className="relative flex w-full items-start justify-between gap-2">
      <FieldLabel
        htmlFor={id}
        className={cn('relative mb-0', labelClassName)}
      >
        {label}
        {mark}
      </FieldLabel>
      {labelEnd}
    </div>
  ) : labelAccessory ? (
    <div className="flex flex-wrap items-center gap-1.5">
      <FieldLabel htmlFor={id} className={cn('mb-0', labelClassName)}>
        {label}
        {mark}
      </FieldLabel>
      {labelAccessory}
    </div>
  ) : (
    <FieldLabel htmlFor={id} className={labelClassName}>
      {label}
      {mark}
    </FieldLabel>
  )

  return (
    <Field data-invalid={invalid ? true : undefined} className={cn(className)}>
      {labelNode}
      {children}
    </Field>
  )
}

export type FormFieldControlText = {
  type: 'text'
  id: string
  label: React.ReactNode
  required?: boolean
  className?: string
  labelEnd?: React.ReactNode
  labelAccessory?: React.ReactNode
  labelClassName?: string
  invalid?: boolean
  inputClassName?: string
  placeholder?: string
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode']
  autoComplete?: string
  value?: string
  defaultValue?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  /** Passed to `<input type="...">` (default `text`). */
  inputType?: React.HTMLInputTypeAttribute
  readOnly?: boolean
}

export type FormFieldControlTextarea = {
  type: 'textarea'
  id: string
  label: React.ReactNode
  required?: boolean
  className?: string
  labelEnd?: React.ReactNode
  labelAccessory?: React.ReactNode
  labelClassName?: string
  invalid?: boolean
  placeholder?: string
  rows?: number
  value?: string
  defaultValue?: string
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>
  textareaClassName?: string
  disabled?: boolean
}

export type FormFieldControlSelect = {
  type: 'select'
  id: string
  label: React.ReactNode
  required?: boolean
  className?: string
  labelEnd?: React.ReactNode
  labelAccessory?: React.ReactNode
  labelClassName?: string
  /**
   * Styling for the select control. Defaults merge onto `SelectTrigger`.
   * If you pass more than `w-full` (e.g. border/height/background), classes are
   * applied to a parent wrapper around `Select` so the trigger stays an inset
   * control (matches surface styling on the parent).
   */
  triggerClassName?: string
  items: FormSelectOption[]
  value?: string | null
  defaultValue?: string | null
  onValueChange?: (value: string | null) => void
  invalid?: boolean
}

export type FormFieldControlRadioOption = { label: string; value: string }

export type FormFieldControlRadio = {
  type: 'radio'
  id: string
  label: React.ReactNode
  required?: boolean
  className?: string
  name: string
  options: FormFieldControlRadioOption[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  /** Layout for option rows. */
  orientation?: 'horizontal' | 'vertical'
  /** Merged into `RadioGroup` className (e.g. `gap-6 pt-4`). */
  radioGroupClassName?: string
}

export type FormFieldControlDate = {
  type: 'date'
  id: string
  label: React.ReactNode
  required?: boolean
  className?: string
  labelEnd?: React.ReactNode
  labelAccessory?: React.ReactNode
  labelClassName?: string
  invalid?: boolean
  value?: Date | undefined
  onChange?: (date: Date | undefined) => void
  emptyLabel?: string
  /** Merged via `inputLikeTriggerClassNames(...)` on the date trigger button. */
  dateTriggerClassName?: string
}

export type FormFieldControlProps =
  | FormFieldControlText
  | FormFieldControlTextarea
  | FormFieldControlSelect
  | FormFieldControlRadio
  | FormFieldControlDate

function RequiredMark() {
  return <span className="text-red-500"> *</span>
}

/** Default surface for text inputs, select triggers, date buttons, and select wrappers. */
const formFieldSurfaceClassName = cn(
  'border-neutral-300 bg-white shadow-none',
  'hover:bg-white dark:border-white/15 dark:bg-white/5 dark:hover:bg-white/5',
)

/** Trigger fills a bordered parent wrapper (`triggerClassName` on parent). */
const selectTriggerInsetClassName = cn(
  'mb-0 flex h-full min-h-0 w-full flex-1 items-center justify-between gap-1.5 rounded-none border-0 bg-transparent py-2 pr-2 pl-2.5 text-sm shadow-none outline-none select-none',
  'whitespace-nowrap text-foreground transition-colors',
  'data-placeholder:text-muted-foreground dark:data-placeholder:text-(--app-input-placeholder)',
  '*:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5',
  "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  'disabled:cursor-not-allowed disabled:opacity-50',
  'focus-visible:border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:ring-offset-0',
  'aria-invalid:border-transparent aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:bg-transparent dark:hover:bg-transparent',
)

export function FormFieldControl(props: FormFieldControlProps) {
  if (props.type === 'text') {
    const {
      id,
      label,
      required,
      className,
      labelEnd,
      labelAccessory,
      labelClassName,
      invalid,
      inputClassName,
      placeholder,
      inputMode,
      autoComplete,
      value,
      defaultValue,
      onChange,
      inputType = 'text',
      readOnly,
    } = props
    return (
      <FieldShell
        id={id}
        label={label}
        required={required}
        className={className}
        labelEnd={labelEnd}
        labelAccessory={labelAccessory}
        labelClassName={labelClassName}
        invalid={invalid}
      >
        <Input
          id={id}
          type={inputType}
          placeholder={placeholder}
          inputMode={inputMode}
          autoComplete={autoComplete}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          readOnly={readOnly}
          className={cn(
            'mb-0 h-11',
            formFieldSurfaceClassName,
            inputClassName,
          )}
        />
      </FieldShell>
    )
  }

  if (props.type === 'textarea') {
    const {
      id,
      label,
      required,
      className,
      labelEnd,
      labelAccessory,
      labelClassName,
      invalid,
      placeholder,
      rows = 4,
      value,
      defaultValue,
      onChange,
      textareaClassName,
      disabled,
    } = props
    return (
      <FieldShell
        id={id}
        label={label}
        required={required}
        className={className}
        labelEnd={labelEnd}
        labelAccessory={labelAccessory}
        labelClassName={labelClassName}
        invalid={invalid}
      >
        <Textarea
          id={id}
          placeholder={placeholder}
          rows={rows}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          disabled={disabled}
          className={cn(
            'mb-0 min-h-34 w-full resize-y',
            formFieldSurfaceClassName,
            'focus-visible:border-blue-300 focus-visible:ring-2 focus-visible:ring-blue-500/35 focus-visible:outline-none',
            textareaClassName,
          )}
        />
      </FieldShell>
    )
  }

  if (props.type === 'select') {
    const {
      id,
      label,
      required,
      className,
      labelEnd,
      labelAccessory,
      labelClassName,
      triggerClassName,
      items,
      value,
      defaultValue,
      onValueChange,
      invalid,
    } = props
    const isControlled = value !== undefined
    const trimmedTrigger = triggerClassName?.trim()
    const surfaceOnParent =
      Boolean(trimmedTrigger) && trimmedTrigger !== 'w-full'

    const selectTree = (
      <Select
        items={items}
        {...(isControlled
          ? {
              value,
              onValueChange: (v: string | null) =>
                onValueChange?.(v === '' ? null : v),
            }
          : {
              ...(defaultValue !== undefined ? { defaultValue } : {}),
              ...(onValueChange
                ? {
                    onValueChange: (v: string | null) =>
                      onValueChange(v === '' ? null : v),
                  }
                : {}),
            })}
      >
        <SelectTrigger
          id={id}
          className={
            surfaceOnParent
              ? selectTriggerInsetClassName
              : cn(
                  'mb-0 h-11 w-full',
                  formFieldSurfaceClassName,
                  triggerClassName,
                )
          }
          aria-invalid={invalid ? true : undefined}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {items.map((item) => (
              <SelectItem
                key={item.value === null ? '__null__' : item.value}
                value={item.value === null ? '' : item.value}
              >
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    )

    return (
      <FieldShell
        id={id}
        label={label}
        required={required}
        className={className}
        labelEnd={labelEnd}
        labelAccessory={labelAccessory}
        labelClassName={labelClassName}
        invalid={invalid}
      >
        {surfaceOnParent ? (
          <div
            className={cn(
              'flex h-11 min-h-11 w-full items-stretch overflow-hidden rounded-lg',
              formFieldSurfaceClassName,
              triggerClassName,
            )}
          >
            {selectTree}
          </div>
        ) : (
          selectTree
        )}
      </FieldShell>
    )
  }

  if (props.type === 'radio') {
    const {
      id,
      label,
      required,
      className,
      name,
      options,
      value,
      defaultValue,
      onValueChange,
      orientation = 'horizontal',
      radioGroupClassName,
    } = props
    const labelId = `${id}-label`
    return (
      <Field className={cn(className)}>
        <FieldLabel id={labelId}>
          {label}
          {required ? <RequiredMark /> : null}
        </FieldLabel>
        <RadioGroup
          {...(value !== undefined
            ? {
                value,
                ...(onValueChange ? { onValueChange } : {}),
              }
            : {
                ...(defaultValue !== undefined ? { defaultValue } : {}),
                ...(onValueChange ? { onValueChange } : {}),
              })}
          name={name}
          aria-labelledby={labelId}
          className={cn(
            'flex w-full gap-4 pt-1',
            orientation === 'horizontal'
              ? 'flex-row flex-wrap'
              : 'flex-col',
            radioGroupClassName,
          )}
        >
          {options.map((opt) => {
            const itemId = `${id}-${opt.value}`
            return (
              <div key={opt.value} className="flex items-center gap-2">
                <RadioGroupItem value={opt.value} id={itemId} />
                <Label htmlFor={itemId} className="cursor-pointer font-normal">
                  {opt.label}
                </Label>
              </div>
            )
          })}
        </RadioGroup>
      </Field>
    )
  }

  if (props.type === 'date') {
    const {
      id,
      label,
      required,
      className,
      labelEnd,
      labelAccessory,
      labelClassName,
      invalid,
      value,
      onChange,
      emptyLabel = 'Pick a date',
      dateTriggerClassName,
    } = props
    return (
      <FieldShell
        id={id}
        label={label}
        required={required}
        className={className}
        labelEnd={labelEnd}
        labelAccessory={labelAccessory}
        labelClassName={labelClassName}
        invalid={invalid}
      >
        <Popover>
          <PopoverTrigger
            id={id}
            render={
              <Button
                type="button"
                variant="outline"
                data-empty={!value}
                className={inputLikeTriggerClassNames(
                  'h-11',
                  formFieldSurfaceClassName,
                  dateTriggerClassName,
                )}
              >
                {value ? format(value, 'PPP') : <span>{emptyLabel}</span>}
                <ChevronDownIcon
                  data-icon="inline-end"
                  className="size-4 shrink-0 opacity-60"
                />
              </Button>
            }
          />
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={value}
              onSelect={onChange}
              defaultMonth={value}
            />
          </PopoverContent>
        </Popover>
      </FieldShell>
    )
  }

  return null
}
