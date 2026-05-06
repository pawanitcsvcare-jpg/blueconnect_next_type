'use client'

import * as React from 'react'
import { Info } from 'lucide-react'

import { FormFieldControl } from '@/components/ui/form-field-control'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

const companyItems = [
    { label: 'Select Company', value: null },
    { label: 'Acme Wholesale', value: 'acme-wholesale' },
    { label: 'BlueConnect Demo', value: 'blueconnect-demo' },
    { label: 'Partner Corp', value: 'partner-corp' },
]

const vendorItems = [
    { label: 'Select Vendor', value: null },
    { label: 'Vendor 1', value: 'vendor-1' },
    { label: 'Vendor 2', value: 'vendor-2' },
    { label: 'Vendor 3', value: 'vendor-3' },
    { label: 'Vendor 4', value: 'vendor-4' },
]

const priorityItems = [
    { label: 'P1', value: 'P1' },
    { label: 'P2', value: 'P2' },
    { label: 'P3', value: 'P3' },
    { label: 'P4', value: 'P4' },
]

const escalationItems = [
    { label: 'L1', value: 'L1' },
    { label: 'L2', value: 'L2' },
    { label: 'L3', value: 'L3' },
]

const infoTriggerClass = cn(
    'inline-flex size-5 shrink-0 items-center justify-center rounded-full text-(--app-text-muted)',
    'outline-none transition-colors hover:text-(--app-text)',
    'focus-visible:ring-2 focus-visible:ring-(--app-accent)/40',
)

function EmailLabelAccessory() {
    return (
        <Tooltip>
            <TooltipTrigger
                type="button"
                className={infoTriggerClass}
                aria-label="Help: representative email"
            >
                <Info className="size-4" aria-hidden />
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-xs">
                Multiple email addresses should be separated with a comma.
            </TooltipContent>
        </Tooltip>
    )
}

function PhysicalAddressLabelAccessory() {
    return (
        <Tooltip>
            <TooltipTrigger
                type="button"
                className={infoTriggerClass}
                aria-label="Help: physical address"
            >
                <Info className="size-4" aria-hidden />
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-xs">
                Include street address, city, state and zip code
            </TooltipContent>
        </Tooltip>
    )
}

export default function VoiceSmsDataForm() {
    const [dateIssueFirst, setDateIssueFirst] = React.useState<Date | undefined>(
        undefined,
    )

    return (
        <TooltipProvider delay={200}>
            <form
                className={cn(
                    'mt-6 flex flex-col gap-6 rounded-lg border border-(--app-card-border)',
                    'p-4 sm:p-5',
                    'dark:border-white/10 dark:bg-white/4',
                )}
                onSubmit={(e) => {
                    e.preventDefault()
                }}
                noValidate
            >
                <p className="text-pretty text-sm leading-relaxed text-(--app-text-muted)">
                    If the previous troubleshooting steps did not correct the issue, please
                    complete the{' '}
                    <strong className="font-semibold text-(--app-text)">
                        Support Inquiry Form
                    </strong>{' '}
                    below. Be sure to complete all required (
                    <span className="text-red-500">*</span>) fields:
                </p>

                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                    <FormFieldControl
                        type="select"
                        id="support-inquiry-company"
                        label="Company"
                        required
                        items={companyItems}
                        className="min-w-0"
                    />
                    <FormFieldControl
                        type="select"
                        id="support-inquiry-vendor"
                        label="Vendor"
                        required
                        items={vendorItems}
                        className="min-w-0"
                    />
                    <FormFieldControl
                        type="date"
                        id="support-inquiry-date-first"
                        label="Date issue first experienced"
                        required
                        value={dateIssueFirst}
                        onChange={setDateIssueFirst}
                        emptyLabel="Select date"
                        className="min-w-0"
                    />
                    <FormFieldControl
                        type="text"
                        id="support-inquiry-rep-name"
                        label="Representative name"
                        required
                        autoComplete="name"
                        className="min-w-0"
                    />
                    <FormFieldControl
                        type="text"
                        id="support-inquiry-rep-email"
                        label="Representative email address"
                        required
                        inputType="email"
                        autoComplete="email"
                        labelAccessory={<EmailLabelAccessory />}
                        className="min-w-0"
                    />
                    <FormFieldControl
                        type="text"
                        id="support-inquiry-physical-address"
                        label="Physical address"
                        className="min-w-0"
                        labelAccessory={<PhysicalAddressLabelAccessory />}
                    />
                    <FormFieldControl
                        type="select"
                        id="support-inquiry-priority"
                        label="Priority Level"
                        required
                        items={priorityItems}
                        defaultValue="P4"
                        className="min-w-0"
                    />
                    <FormFieldControl
                        type="select"
                        id="support-inquiry-escalation"
                        label="Escalation Level"
                        required
                        items={escalationItems}
                        defaultValue="L1"
                        className="min-w-0"
                    />
                    <FormFieldControl
                        type="text"
                        id="support-inquiry-att-ticket"
                        label="AT&T Ticket Number"
                        placeholder="e.g., c-023a"
                        className="min-w-0"
                    />
                </div>

                <div
                    className={cn(
                        'grid gap-4 rounded-lg border border-(--app-card-border)',
                        'bg-(--app-surface-muted)/50 p-4 sm:grid-cols-3',
                        'dark:border-white/10 dark:bg-white/4',
                    )}
                >
                    <FormFieldControl
                        type="text"
                        id="support-inquiry-msisdn"
                        label="MSISDN"
                        inputMode="numeric"
                        autoComplete="off"
                        className="min-w-0"
                    />
                    <FormFieldControl
                        type="text"
                        id="support-inquiry-sim"
                        label="SIM"
                        autoComplete="off"
                        className="min-w-0"
                    />
                    <FormFieldControl
                        type="text"
                        id="support-inquiry-device"
                        label="Device and model number"
                        className="min-w-0"
                    />
                </div>
            </form>
        </TooltipProvider>
    )
}
