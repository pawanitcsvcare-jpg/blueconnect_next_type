'use client'

import * as React from 'react'


import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import VoiceSmsDataTab from './voice-sms-data-tab'
import { Info } from 'lucide-react'
import VoiceSmsDataForm from './voice-sms-data-form'
import SubscriberExperience from './subscriber-experience'

const serviceIds = {
    voice: 'need-help-subscriber-voice',
    sms: 'need-help-subscriber-sms',
    data: 'need-help-subscriber-data',
    all: 'need-help-subscriber-all',
} as const

const msisdnLabelId = 'need-help-msisdn-impacted-label'
const msisdnSingleId = 'need-help-msisdn-single'
const msisdnAllId = 'need-help-msisdn-all'

function coerceChecked(
    checked: boolean | 'indeterminate',
): checked is boolean {
    return checked === true
}


export default function SubscriberService() {
    const [voice, setVoice] = React.useState(true)
    const [sms, setSms] = React.useState(true)
    const [data, setData] = React.useState(true)
    const [allServices, setAllServices] = React.useState(true)
    const [msisdnImpact, setMsisdnImpact] = React.useState<'single' | 'all'>(
        'single',
    )

    const setAllFour = React.useCallback((next: boolean) => {
        setVoice(next)
        setSms(next)
        setData(next)
        setAllServices(next)
    }, [])

    const showServiceHelpSections = voice || sms || data

    return (
        <TooltipProvider delay={200}>
            <div className="space-y-8 p-4 sm:p-6">

                <div className="grid grid-cols-3 gap-x-8 gap-y-4">
                    <div>
                        <div className="text-sm leading-none font-medium block mb-3 text-(--app-text)">
                            Check all that apply
                        </div>
                        <div className="flex flex-row gap-12 pt-2">
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id={serviceIds.voice}
                                    checked={voice}
                                    onCheckedChange={(c) => {
                                        if (!coerceChecked(c)) {
                                            setVoice(false)
                                            setAllServices(false)
                                            return
                                        }
                                        setVoice(true)
                                        setAllServices(sms && data)
                                    }}
                                />
                                <Label htmlFor={serviceIds.voice} className="cursor-pointer font-normal">
                                    Voice
                                </Label>
                            </div>
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id={serviceIds.sms}
                                    checked={sms}
                                    onCheckedChange={(c) => {
                                        if (!coerceChecked(c)) {
                                            setSms(false)
                                            setAllServices(false)
                                            return
                                        }
                                        setSms(true)
                                        setAllServices(voice && data)
                                    }}
                                />
                                <Label htmlFor={serviceIds.sms} className="cursor-pointer font-normal">
                                    SMS
                                </Label>
                            </div>
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id={serviceIds.data}
                                    checked={data}
                                    onCheckedChange={(c) => {
                                        if (!coerceChecked(c)) {
                                            setData(false)
                                            setAllServices(false)
                                            return
                                        }
                                        setData(true)
                                        setAllServices(voice && sms)
                                    }}
                                />
                                <Label htmlFor={serviceIds.data} className="cursor-pointer font-normal">
                                    Data
                                </Label>
                            </div>
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id={serviceIds.all}
                                    checked={allServices}
                                    onCheckedChange={(c) => {
                                        if (!coerceChecked(c)) {
                                            setAllFour(false)
                                            return
                                        }
                                        setAllFour(true)
                                    }}
                                />
                                <Label htmlFor={serviceIds.all} className="cursor-pointer font-normal">
                                    All
                                </Label>
                            </div>
                        </div>
                    </div>
                    <div className='ps-4'>
                        <div className="flex flex-wrap items-top gap-1.5  mb-3">

                            <span
                                id={msisdnLabelId}
                                className="text-sm leading-none font-medium block text-(--app-text)">
                                MSISDN(s) Impacted
                            </span>
                            <span className="text-red-500">*</span> <Tooltip>
                                <TooltipTrigger
                                    type="button"
                                    className={cn(
                                        'inline-flex size-5 shrink-0 items-center justify-center rounded-full text-(--app-text-muted) outline-none transition-colors',
                                        'hover:text-(--app-text) focus-visible:ring-2 focus-visible:ring-ring/50',
                                    )}
                                    aria-label="About MSISDN(s) impacted"
                                >
                                    <Info className="size-4" aria-hidden />
                                </TooltipTrigger>
                                <TooltipContent side="top" className="max-w-xs">
                                    If Multiple MSISDNs are impacted use the '+' below to report specific MSISDNs, SIMs and Device details
                                </TooltipContent>
                            </Tooltip>
                        </div>
                        <div className="flex flex-row gap-2 justify-between">
                            <RadioGroup
                                name="msisdn-impacted"
                                value={msisdnImpact}
                                onValueChange={(v) => {
                                    if (v === 'single' || v === 'all') setMsisdnImpact(v)
                                }}
                                aria-labelledby={msisdnLabelId}
                                className="flex flex-row flex-wrap gap-x-6 gap-y-3 pt-1"
                            >
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="single" id={msisdnSingleId} />
                                    <Label htmlFor={msisdnSingleId} className="cursor-pointer font-normal">
                                        Single
                                    </Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="all" id={msisdnAllId} />
                                    <Label htmlFor={msisdnAllId} className="cursor-pointer font-normal">
                                        All MSISDNs are impacted
                                    </Label>
                                </div>
                            </RadioGroup>

                        </div>
                    </div>
                </div>

                {showServiceHelpSections ? (
                    <div className="need-help-data-show-section">
                        <VoiceSmsDataTab
                            services={{ voice, sms, data }}
                        />
                        <VoiceSmsDataForm />
                        <SubscriberExperience
                            services={{ voice, sms, data }}
                        />
                    </div>
                ) : null}


            </div>
        </TooltipProvider>
    )
}
