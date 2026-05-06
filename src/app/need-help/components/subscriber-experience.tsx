'use client'

import * as React from 'react'
import { Upload } from 'lucide-react'

import { Checkbox } from '@/components/ui/checkbox'
import { FormFieldControl } from '@/components/ui/form-field-control'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

import type { NeedHelpServiceSelection } from './voice-sms-data-tab'

const sectionTitleClass =
    'text-sm font-bold uppercase tracking-wide text-(--app-text)'

const checkboxListClass = 'flex flex-col gap-2'

function CheckRow({ id, label }: { id: string; label: string }) {
    return (
        <div className="flex items-start gap-2.5">
            <Checkbox id={id} className="mt-0.5" />
            <Label htmlFor={id} className="cursor-pointer text-pretty font-normal leading-snug">
                {label}
            </Label>
        </div>
    )
}

const fileFormatsFooter =
    'Allowed formats: PNG, JPG, JPEG, TIFF, GIF, BMP, BPG, PPM, PGM, PNM'

function FileDropSlot({ id, title }: { id: string; title: string }) {
    return (
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-(--app-card-border) bg-(--app-card-bg)">
            <div className="border-b border-(--app-card-border) bg-(--app-surface-muted)/40 px-3 py-2 text-sm font-semibold text-(--app-text) dark:bg-white/4">
                {title}
            </div>
            <div className="flex flex-1 flex-col gap-3 p-4">
                <div
                    className={cn(
                        'flex flex-1 flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-(--app-card-border)',
                        'bg-(--app-card-bg) px-3 py-6 text-center dark:border-white/12',
                    )}
                >
                    <label
                        htmlFor={id}
                        className="flex cursor-pointer flex-col items-center gap-2 text-sm text-(--app-text-muted)"
                    >
                        <span className="text-(--app-text)">
                            <span className="rounded-md border border-(--app-card-border) bg-(--app-surface-muted)/50 px-3 py-1.5 text-xs font-medium dark:bg-white/6">
                                Choose File
                            </span>
                            <span className="ml-2 text-xs text-(--app-text-muted)">No file chosen</span>
                        </span>
                        <span className="text-xs">Or drag it here.</span>
                        <Upload
                            className="size-8 text-(--app-text-muted) opacity-70"
                            aria-hidden
                        />
                        <Input id={id} name={id} type="file" className="sr-only" />
                    </label>
                </div>
                <p
                    className={cn(
                        'rounded-md px-2 py-1.5 text-center text-[11px] leading-snug text-(--app-text-muted)',
                        'bg-(--app-need-help-accordion-header)/70 dark:bg-white/8',
                    )}
                >
                    {fileFormatsFooter}
                </p>
            </div>
        </div>
    )
}

export default function SubscriberExperience({
    services,
}: {
    services: NeedHelpServiceSelection
}) {
    const [receivingError, setReceivingError] = React.useState(false)
    const [dataLastUsed, setDataLastUsed] = React.useState<Date | undefined>(
        undefined,
    )

    const serviceSectionCount =
        Number(services.voice) + Number(services.sms) + Number(services.data)

    return (
        <div className="w-full overflow-hidden rounded-lg border border-(--app-card-border) bg-(--app-card-bg) shadow-sm mt-6">
            <div
                className={cn(
                    'border-b border-(--app-card-border) px-4 py-3 text-base font-bold text-(--app-text)',
                    'bg-(--app-need-help-accordion-header)',
                )}
            >
                Subscriber experience
            </div>

            <form
                className="flex flex-col gap-8 p-4 sm:p-5"
                onSubmit={(e) => e.preventDefault()}
                noValidate
            >
                <div
                    className={cn(
                        'grid gap-6',
                        serviceSectionCount === 2 && 'sm:grid-cols-2',
                        serviceSectionCount >= 3 && 'sm:grid-cols-2 xl:grid-cols-3',
                    )}
                >
                {services.voice ? (
                <section className="space-y-3" aria-labelledby="exp-section-voice">
                    <h2
                        id="exp-section-voice"
                        className="text-sm font-bold text-(--app-text)"
                    >
                        <span className="uppercase tracking-wide">Voice</span>{' '}
                        <span className="text-xs font-semibold normal-case text-(--app-text-muted)">
                            (check all that apply)
                        </span>
                    </h2>
                    <div className={checkboxListClass} data-slot="checkbox-group">
                        <CheckRow
                            id="exp-voice-no-out"
                            label="Subscriber cannot make calls"
                        />
                        <CheckRow
                            id="exp-voice-no-in"
                            label="Subscriber cannot receive calls"
                        />
                        <CheckRow id="exp-voice-fast-busy" label="Fast busy" />
                        <CheckRow id="exp-voice-cid" label="Caller ID issue" />
                        <CheckRow
                            id="exp-voice-vm"
                            label="Subscriber cannot access voicemail"
                        />
                    </div>
                </section>
                ) : null}

                {services.sms ? (
                <section className="space-y-3" aria-labelledby="exp-section-sms">
                    <h2 id="exp-section-sms" className={sectionTitleClass}>
                        SMS
                    </h2>
                    <div className={checkboxListClass} data-slot="checkbox-group">
                        <CheckRow
                            id="exp-sms-no-send"
                            label="Subscriber cannot send SMS (text only)."
                        />
                        <CheckRow
                            id="exp-sms-no-recv"
                            label="Subscriber cannot receive SMS (text only)."
                        />
                        <CheckRow
                            id="exp-sms-no-send-mms"
                            label="Subscriber cannot send MMS (photos, videos, texts > 160 characters, and group texts.)"
                        />
                        <CheckRow
                            id="exp-sms-no-recv-mms"
                            label="Subscriber cannot receive MMS (photos, videos, texts > 160 characters, and group texts.)"
                        />
                    </div>
                </section>
                ) : null}

                {services.data ? (
                <section className="space-y-3" aria-labelledby="exp-section-data">
                    <div>
                    <h2 id="exp-section-data" className={sectionTitleClass + ' mb-3'}>
                        Data
                    </h2>
                    <div className={cn(checkboxListClass, 'gap-2')} data-slot="checkbox-group">
                        <CheckRow
                            id="exp-data-no-access"
                            label="Subscriber cannot access data"
                        />
                        <div className="space-y-3">

                            <div className="flex items-start gap-2.5">
                                <Checkbox
                                    id="exp-data-error-msg"
                                    className="mt-0.5"
                                />
                                <Label
                                    htmlFor="exp-data-error-msg"
                                    className="cursor-pointer text-pretty font-normal leading-snug"
                                >
                                    Subscriber receiving error message
                                </Label>
                            </div>

                            <FormFieldControl
                        type="text"
                        id="exp-examples"
                        label="What is the error message?"
                        className="w-full"
                    />
                        </div>
                    </div>
                    </div>
                </section>
                ) : null}

            </div>
                

                <div className="space-y-5">
                    <div className="flex items-start gap-2.5">
                        <Checkbox id="exp-other" className="mt-0.5" />
                        <Label
                            htmlFor="exp-other"
                            className="cursor-pointer font-normal leading-snug"
                        >
                            Other
                        </Label>
                    </div>

                    <FormFieldControl
                        type="textarea"
                        id="exp-examples"
                        label="Please include two specific examples of what the customer has experienced in the last 24-48 hours."
                        rows={5}
                        className="w-full"
                    />

                    {services.data ? (
                    <FormFieldControl
                        type="date"
                        id="exp-data-last-used"
                        label="When was data last used successfully?"
                        value={dataLastUsed}
                        onChange={setDataLastUsed}
                        emptyLabel="Select date"
                        className="w-full"
                    />
                    ) : null}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="relative"> <FileDropSlot id="exp-file-input-request" title="Input Request" /></div>
                    <div className="relative"> <FileDropSlot id="exp-file-response" title="Response received" /></div>
                </div>
            </form>
        </div>
    )
}
