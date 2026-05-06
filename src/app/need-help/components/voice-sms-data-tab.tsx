'use client'

import * as React from 'react'
import {
    CircleCheck,
    MessageSquare,
    Phone,
    Radio,
} from 'lucide-react'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { cn } from '@/lib/utils'

const accordionItemClass = cn(
    'group/item overflow-hidden rounded-lg border border-(--app-card-border) bg-(--app-card-bg)',
    'shadow-none transition-[border-color,background-color] duration-200 ease-out',
    'hover:border-(--app-border)',
)

const accordionTriggerClass = cn(
    'relative w-full items-center overflow-hidden rounded-none border-0 bg-(--app-need-help-accordion-header)',
    'px-4 py-3 text-left text-sm font-bold tracking-wide text-(--app-text) uppercase',
    'cursor-pointer shadow-none outline-none transition-colors duration-200 ease-out',
    'hover:bg-(--app-surface-muted)/80 hover:no-underline dark:hover:bg-white/6',
    'focus-visible:ring-2 focus-visible:ring-(--app-accent)/35 focus-visible:ring-offset-0',
    /* Chevron in a light circular control */
    '[&_[data-slot=accordion-trigger-icon]]:size-4 [&_[data-slot=accordion-trigger-icon]]:shrink-0',
    '[&_[data-slot=accordion-trigger-icon]]:rounded-full [&_[data-slot=accordion-trigger-icon]]:border [&_[data-slot=accordion-trigger-icon]]:border-(--app-card-border)',
    '[&_[data-slot=accordion-trigger-icon]]:bg-(--app-card-bg) [&_[data-slot=accordion-trigger-icon]]:p-1',
    '[&_[data-slot=accordion-trigger-icon]]:text-(--app-text-muted)',
    'dark:[&_[data-slot=accordion-trigger-icon]]:border-white/12 dark:[&_[data-slot=accordion-trigger-icon]]:bg-(--app-card-bg)',
)

const accordionContentClass = cn(
    'border-t border-(--app-card-border) bg-(--app-card-bg)',
    'px-4 py-4 text-sm font-normal leading-relaxed text-(--app-text)',
)

function CheckLine({ children }: { children: React.ReactNode }) {
    return (
        <div
            className={cn(
                'mt-4 flex gap-3 rounded-lg border px-3 py-3',
                'border-emerald-200/80 bg-emerald-50/90 text-(--app-text)',
                'dark:border-emerald-900/45 dark:bg-emerald-950/35 dark:text-emerald-50/95',
            )}
        >
            <CircleCheck
                className="mt-0.5 size-4.5 shrink-0 text-emerald-600 dark:text-emerald-400"
                aria-hidden
            />
            <p className="min-w-0 flex-1 text-pretty">{children}</p>
        </div>
    )
}

function ListCard({ children }: { children: React.ReactNode }) {
    return (
        <div
            className={cn(
                'mt-4 ',
            )}
        >
            {children}
        </div>
    )
}

function HollowItem({ children }: { children: React.ReactNode }) {
    return (
        <li className="flex gap-3">
            <span
                className="mt-1 size-2 shrink-0 rounded-full border-2 border-(--app-text-muted) bg-transparent"
                aria-hidden
            />
            <span className="text-pretty">{children}</span>
        </li>
    )
}

const introTextClass =
    'text-pretty text-[15px] font-normal leading-relaxed text-(--app-text)'

export type NeedHelpServiceSelection = {
    voice: boolean
    sms: boolean
    data: boolean
}

type SectionHeaderProps = {
    icon: React.ReactNode
    label: string
}

function SectionHeader({ icon, label }: SectionHeaderProps) {
    return (
        <span className="flex min-w-0 flex-1 items-center gap-2.5">
            <span className="flex shrink-0 text-(--app-text)" aria-hidden>
                {icon}
            </span>
            <span className="truncate">{label}</span>
        </span>
    )
}

export default function VoiceSmsDataTab({
    services,
}: {
    services: NeedHelpServiceSelection
}) {
    const visibleValues = React.useMemo(() => {
        const v: ('voice' | 'sms' | 'data')[] = []
        if (services.voice) v.push('voice')
        if (services.sms) v.push('sms')
        if (services.data) v.push('data')
        return v
    }, [services.voice, services.sms, services.data])

    const defaultOpen =
        visibleValues.length > 0 ? [visibleValues[0]] : ([] as string[])

    return (
        <div className="w-full">
            <Accordion
                key={visibleValues.join('-')}
                className="flex w-full flex-col gap-3"
                defaultValue={defaultOpen}
            >
                {services.voice ? (
                <AccordionItem value="voice" className={accordionItemClass}>
                    <AccordionTrigger className={accordionTriggerClass}>
                        <SectionHeader
                            icon={<Phone className="size-4" strokeWidth={1.5} />}
                            label="Voice"
                        />
                    </AccordionTrigger>
                    <AccordionContent className={accordionContentClass}>
                        <p className={introTextClass}>
                            AtomicMobile has found that many issues with making calls can be
                            corrected by powering the device off and on.
                        </p>
                        <CheckLine>
                            If powering the device off and back on does not resolve the
                            issue:
                        </CheckLine>
                        <ListCard>
                            <ul className="list-none space-y-3 ps-0.5">
                                <HollowItem>
                                    Confirm the Subscriber has{' '}
                                    <strong>sufficient signal</strong> to place the call
                                    (normally three bars).
                                </HollowItem>
                                <HollowItem>
                                    Check the <strong>HLR STATUS</strong> if the status is
                                    anything other than IDLE OR BUSY,{' '}
                                    <strong>cancel location</strong>, and have the subscriber{' '}
                                    <strong>power cycle</strong> their device.
                                </HollowItem>
                            </ul>
                        </ListCard>
                    </AccordionContent>
                </AccordionItem>
                ) : null}

                {services.sms ? (
                <AccordionItem value="sms" className={accordionItemClass}>
                    <AccordionTrigger className={accordionTriggerClass}>
                        <SectionHeader
                            icon={
                                <MessageSquare className="size-4" strokeWidth={1.5} />
                            }
                            label="SMS"
                        />
                    </AccordionTrigger>
                    <AccordionContent className={accordionContentClass + ' pt-0 mt-0'}>
                        <CheckLine>Is sufficient SMS balance available?</CheckLine>
                        <ListCard>
                            <ul className="list-none space-y-3 ps-0.5">
                                <HollowItem>
                                    If <strong>YES</strong>, remove the SMS feature and re-add
                                    it via the{' '}
                                    <a
                                        href="#"
                                        className="font-semibold text-(--app-accent) underline decoration-(--app-accent)/40 underline-offset-2 transition-colors hover:text-(--app-accent-hover)"
                                    >
                                        AtomicMobile-MVNO Portal
                                    </a>
                                    .
                                </HollowItem>
                                <HollowItem>
                                    <strong>Next</strong>, have the Subscriber{' '}
                                    <strong>power cycle</strong> their device.
                                </HollowItem>
                                <HollowItem>
                                    <strong>Lastly</strong>, send the Subscriber a test message
                                    to verify functionality.
                                </HollowItem>
                            </ul>
                        </ListCard>
                    </AccordionContent>
                </AccordionItem>
                ) : null}

                {services.data ? (
                <AccordionItem value="data" className={accordionItemClass}>
                    <AccordionTrigger className={accordionTriggerClass}>
                        <SectionHeader
                            icon={<Radio className="size-4" strokeWidth={1.5} />}
                            label="Data"
                        />
                    </AccordionTrigger>
                    <AccordionContent className={accordionContentClass + ' pt-0 mt-0'}>
                        <CheckLine>
                            If Mobile Data, balance, and APN checks do not restore
                            connectivity:
                        </CheckLine>
                        <ListCard>
                            <ul className="list-none space-y-3 ps-0.5">
                                <HollowItem>
                                    Ensure <strong>Mobile Data</strong> is enabled on the
                                    device.
                                </HollowItem>
                                <HollowItem>
                                    Ensure there is <strong>sufficient data balance</strong>.
                                </HollowItem>
                                <HollowItem>
                                    <strong>Confirm APN settings</strong>.
                                </HollowItem>
                                <HollowItem>
                                    Delete and re-add all APN setting — ensure{' '}
                                    <strong>Telgoo5</strong> is selected as default.
                                </HollowItem>
                                <HollowItem>
                                    Have the Subscriber <strong>power cycle</strong> their
                                    handset.
                                </HollowItem>
                                <HollowItem>
                                    <strong>If still unresolved:</strong> check coverage{' '}
                                    <a
                                        href="#"
                                        className="font-semibold text-(--app-accent) underline decoration-(--app-accent)/40 underline-offset-2 transition-colors hover:text-(--app-accent-hover)"
                                    >
                                        here
                                    </a>
                                    .
                                </HollowItem>
                                <HollowItem>
                                    <strong>If still unresolved:</strong> check Usage — when was
                                    data last used successfully?
                                </HollowItem>
                            </ul>
                        </ListCard>
                    </AccordionContent>
                </AccordionItem>
                ) : null}
            </Accordion>
        </div>
    )
}
