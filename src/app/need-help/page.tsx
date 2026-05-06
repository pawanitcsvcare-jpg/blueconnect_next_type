'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Building2, FlaskConical, Wallet } from 'lucide-react'
import SubscriberService from './components/subscriber-service'



const pillList =
  'flex h-auto min-h-12 w-full gap-1 rounded-full border border-(--app-card-border) bg-(--app-pill-track-bg) p-1.5 shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1px_2px_rgba(0,0,0,0.35)] sm:min-h-[3.25rem]'

/** Overrides default `TabsTrigger` dark muted text so labels stay readable on the pill track. */
const pillTrigger =
  'flex min-h-10 flex-1 cursor-pointer items-center justify-center gap-2 rounded-full border-0 px-2 py-2.5 text-center text-xs font-normal text-(--app-text-muted) shadow-none ring-0 transition-[color,box-shadow,background] duration-200 sm:gap-2.5 sm:px-4 sm:text-sm [&_svg]:text-(--app-text-muted) data-active:bg-(--app-pill-active-bg) data-active:font-semibold data-active:text-(--app-text) data-active:shadow-sm data-active:[&_svg]:text-(--app-text) dark:text-(--app-text-muted) dark:data-active:bg-(--app-pill-active-bg) dark:data-active:text-(--app-text) dark:data-active:[&_svg]:text-(--app-text)'

export function NeedHelpPage() {
  return (
    <div>
      <Card className="border-none bg-transparent shadow-none">
        <CardContent className="p-0">
          <Tabs defaultValue="subscriber-tab" className="w-full">
            <TabsList className={pillList}>
              <TabsTrigger value="subscriber-tab" className={pillTrigger}>
                <Building2
                  className="size-4 shrink-0 sm:size-4.5"
                  aria-hidden
                />
                <span className="max-w-44 text-pretty leading-snug sm:max-w-none">
                Subscriber Service(s) Impacted
                </span>
              </TabsTrigger>
              <TabsTrigger value="partner-tab" className={pillTrigger}>
                <FlaskConical
                  className="size-4 shrink-0 sm:size-4.5"
                  aria-hidden
                />
                <span className="max-w-44 text-pretty leading-snug sm:max-w-none">
                Partner-specific inquiry
                </span>
              </TabsTrigger>
              <TabsTrigger value="IP-whitelist" className={pillTrigger}>
                <Wallet
                  className="size-4 shrink-0 sm:size-4.5"
                  aria-hidden
                />
                <span className="max-w-44 text-pretty leading-snug sm:max-w-none">
                IP Whitelisting
                </span>
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="subscriber-tab"
              className="mt-4 rounded-xl border border-(--app-card-border) bg-(--app-card-bg) p-0 text-sm text-(--app-text-muted)"
            >
              <SubscriberService />
            </TabsContent>

            <TabsContent
              value="partner-tab"
              className="mt-4 rounded-xl border border-(--app-card-border) bg-(--app-card-bg) p-4 text-sm text-(--app-text-muted)"
            >
             SSS TEST Usage Report here....
            </TabsContent>

            <TabsContent
              value="IP-whitelist"
              className="mt-4 rounded-xl border border-(--app-card-border) bg-(--app-card-bg) p-4 text-sm text-(--app-text-muted)"
            >
             SurgepaysWholesale Usage Report here...
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
export default NeedHelpPage;

