'use client'

import * as React from 'react'
import { Info } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { FieldGroup } from '@/components/ui/field'
import { FormFieldControl, type FormSelectOption } from '@/components/ui/form-field-control'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const TYPE_OF_CHANGE = [
  { value: '__placeholder__', label: 'Select' },
  { value: 'suspend', label: 'Suspend service' },
  { value: 'restore', label: 'Restore service' },
  { value: 'reconnect', label: 'Reconnect service' },
  { value: 'cancel', label: 'Cancel service' },
] as const

const PROCESS_TYPE = [
  { value: 'electronic', label: 'Electronically Change' },
  { value: 'manual', label: 'Manual / Offline' },
] as const

const TYPE_OF_CHANGE_ITEMS: FormSelectOption[] = TYPE_OF_CHANGE.map((row) => ({
  label: row.label,
  value: row.value,
}))

const PROCESS_TYPE_ITEMS: FormSelectOption[] = PROCESS_TYPE.map((row) => ({
  label: row.label,
  value: row.value,
}))

const infoTriggerClass =
  'inline-flex size-7 shrink-0 items-center justify-center rounded-md text-slate-400 outline-none transition-colors hover:bg-slate-100 hover:text-slate-600 focus-visible:ring-2 focus-visible:ring-indigo-300/50 dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-slate-300'

/** Invalid field flags — border only, no inline messages (extend for more fields). */
type StatusFieldInvalid = {
  typeOfChange?: boolean
}

function validateStatusForm(values: {
  typeOfChange: string
  processType: string
}): StatusFieldInvalid {
  const next: StatusFieldInvalid = {}
  if (values.typeOfChange === '__placeholder__') {
    next.typeOfChange = true
  }
  return next
}

export default function CustomerProfileStatus() {
  const [typeOfChange, setTypeOfChange] = React.useState<string>(
    TYPE_OF_CHANGE[0].value,
  )
  const [processType, setProcessType] = React.useState<string>(
    PROCESS_TYPE[0].value,
  )
  const [invalid, setInvalid] = React.useState<StatusFieldInvalid>({})
  const [savedHint, setSavedHint] = React.useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSavedHint(null)
    const nextInvalid = validateStatusForm({ typeOfChange, processType })
    setInvalid(nextInvalid)
    if (Object.keys(nextInvalid).length > 0) {
      return
    }
    setSavedHint(
      'Status change request recorded (demo). Replace this with your API call.',
    )
  }

  const typeOfChangeHelp = (
    <Tooltip>
      <TooltipTrigger
        type="button"
        className={infoTriggerClass}
        aria-label="Help: type of change"
      >
        <Info className="size-3.5 shrink-0" aria-hidden />
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-xs text-balance">
        Select the type of status change you want to perform
      </TooltipContent>
    </Tooltip>
  )

  const processTypeHelp = (
    <Tooltip>
      <TooltipTrigger
        type="button"
        className={infoTriggerClass}
        aria-label="Help: process type"
      >
        <Info className="size-3.5 shrink-0" aria-hidden />
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-xs text-balance">
        Select how the status change should be processed
      </TooltipContent>
    </Tooltip>
  )

  return (
    <TooltipProvider delay={200}>
      <div className="overflow-hidden rounded-2xl border border-indigo-100/60 bg-white shadow-[6px_4px_32px_-14px_rgba(15,23,42,0.12),8px_0_24px_-16px_rgba(15,23,42,0.08)] dark:border-indigo-900/45 dark:bg-slate-950 dark:shadow-[6px_4px_36px_-12px_rgba(0,0,0,0.45)]">
        <div className="bg-white px-5 py-6 sm:px-6 dark:bg-slate-950/90">
          <div className="w-full">
            <h3 className="text-base font-medium text-slate-900 dark:text-slate-100">
              Update Customer Status
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              Modify the account status by suspending, restoring, reconnecting, or
              canceling the service.
            </p>

            <form onSubmit={handleSubmit} className="mt-8" noValidate>
              {savedHint ? (
                <p
                  className="mb-6 rounded-lg border border-emerald-200/80 bg-emerald-50/90 px-3 py-2 text-sm text-emerald-900 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-100"
                  role="status"
                >
                  {savedHint}
                </p>
              ) : null}
              <FieldGroup className="gap-0">
                <div className="grid grid-cols-1 gap-6 sm:gap-5 lg:grid-cols-1 lg:gap-6 xl:grid-cols-3">
                  <FormFieldControl
                    type="select"
                    id="type-of-change"
                    label="Type of Change"
                    required
                    className="min-w-0"
                    items={TYPE_OF_CHANGE_ITEMS}
                    value={typeOfChange}
                    invalid={!!invalid.typeOfChange}
                    labelAccessory={typeOfChangeHelp}
                    triggerClassName="w-full"
                    onValueChange={(v) => {
                      const next = v ?? '__placeholder__'
                      setSavedHint(null)
                      setTypeOfChange(next)
                      setInvalid((prev) => {
                        if (next === '__placeholder__') return prev
                        const rest = { ...prev }
                        delete rest.typeOfChange
                        return rest
                      })
                    }}
                  />

                  <FormFieldControl
                    type="select"
                    id="process-type"
                    label="Process Type"
                    className="min-w-0"
                    items={PROCESS_TYPE_ITEMS}
                    value={processType}
                    labelAccessory={processTypeHelp}
                    triggerClassName="w-full"
                    onValueChange={(v) => {
                      setSavedHint(null)
                      setProcessType(v ?? PROCESS_TYPE[0].value)
                    }}
                  />

                  <Button
                    type="submit"
                    className="mt-9 h-12 w-min-w"
                    variant="primary"
                  >
                    <i className="ri-search-line"></i> Change Status
                  </Button>
                </div>
              </FieldGroup>

              <div className="mt-10 flex justify-end border-t border-slate-100 pt-6 dark:border-slate-800" />
            </form>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
