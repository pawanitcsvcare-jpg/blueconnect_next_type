'use client'

import PageTitle from '@/components/Common/PageTitle'
import { Button } from '@/components/ui/button'
import { FormFieldControl } from '@/components/ui/form-field-control'
import { useState } from 'react'
import VnocLastSevenDaysAPIChart from '@/app/vnoc/components/VnocLastSevenDaysAPIChart'
import VnocTopFiveApiCallsChart from '@/app/vnoc/components/VnocTopFiveApiCallsChart'
import WholesaleChartDateWiseChart from '@/app/vnoc/components/WholesaleChartDateWiseChart'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const companies = [
  { label: 'Select Company', value: null },
  { label: 'ABC Company', value: 'ABC Company' },
  { label: 'Admin Company', value: 'Admin Company' },
  { label: 'AdminQAFinal Company', value: 'AdminQAFinal Company' },
  { label: 'Asus India ltd.', value: 'Asus India ltd.' },
  { label: 'Books and Guy Co', value: 'Books and Guy Co' },
]

const vendors = [
  { label: 'Please choose the vendor', value: null },
  { label: 'Vendor 1', value: 'Vendor 1' },
  { label: 'Vendor 2', value: 'Vendor 2' },
  { label: 'Vendor 3', value: 'Vendor 3' },
  { label: 'Vendor 4', value: 'Vendor 4' },
]

export default function WholesaleRequestChartPage() {
  const [dateFrom, setDateFrom] = useState<Date | undefined>(
    new Date(2024, 3, 9, 11, 25)
  )
  const [dateTo, setDateTo] = useState<Date | undefined>(
    new Date(2024, 3, 10, 11, 25)
  )

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log('Wholesale chart filter', {
      dateFrom,
      dateTo,
    })
  }

  return (
    <div className="space-y-5">
      <PageTitle title="MVNO API Success & Fail Record" />

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 pt-2 md:flex-row md:flex-nowrap md:items-end md:gap-3"
      >
        <FormFieldControl
          type="select"
          id="vnoc-company"
          label="Company"
          className="min-w-0 flex-1"
          items={companies}
          defaultValue={null}
          triggerClassName=""
        />

        <FormFieldControl
          type="select"
          id="vnoc-vendor"
          label="Vendor / MVNO"
          className="min-w-0 flex-1"
          items={vendors}
          defaultValue={null}
          triggerClassName=""
        />

        <FormFieldControl
          type="date"
          id="vnoc-date-from"
          label="From Date"
          required
          className="min-w-0 flex-1"
          value={dateFrom}
          onChange={setDateFrom}
          dateTriggerClassName=""
        />

        <FormFieldControl
          type="date"
          id="vnoc-date-to"
          label="To Date"
          required
          className="min-w-0 flex-1"
          value={dateTo}
          onChange={setDateTo}
          dateTriggerClassName=""
        />

        <div className="mt-2 flex shrink-0 flex-wrap gap-3 md:mt-0">
          <Button type="submit" className="h-11 min-w-28 px-6" variant="primary">
            Search
          </Button>
        </div>
      </form>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <VnocTopFiveApiCallsChart title="Top Five API Calls" height={280} />
        <VnocLastSevenDaysAPIChart title="Last Seven Days API Calls" height={280} />
      </div>

      <div className="mx-auto">
        <Accordion
          defaultValue={[]}
          className="vnoc-wholesale-actions-panel grid grid-cols-1 items-start gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          <AccordionItem
            value="validate-device"
            className="vnoc-wholesale-accordion-item not-last:border-b-0"
          >
            <AccordionTrigger className="vnoc-wholesale-accordion-trigger">
              Validate Device
            </AccordionTrigger>
            <AccordionContent className="vnoc-wholesale-accordion-content">
              <WholesaleChartDateWiseChart hideHeader />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="validate-sim"
            className="vnoc-wholesale-accordion-item not-last:border-b-0"
          >
            <AccordionTrigger className="vnoc-wholesale-accordion-trigger">
              Validate SIM
            </AccordionTrigger>
            <AccordionContent className="vnoc-wholesale-accordion-content">
              <WholesaleChartDateWiseChart hideHeader />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="activate"
            className="vnoc-wholesale-accordion-item not-last:border-b-0"
          >
            <AccordionTrigger className="vnoc-wholesale-accordion-trigger">
              Activate
            </AccordionTrigger>
            <AccordionContent className="vnoc-wholesale-accordion-content">
              <WholesaleChartDateWiseChart hideHeader />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="subscriber-inquiry"
            className="vnoc-wholesale-accordion-item not-last:border-b-0"
          >
            <AccordionTrigger className="vnoc-wholesale-accordion-trigger">
              Subscriber Inquiry
            </AccordionTrigger>
            <AccordionContent className="vnoc-wholesale-accordion-content">
              <WholesaleChartDateWiseChart hideHeader />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="suspend-subscriber"
            className="vnoc-wholesale-accordion-item not-last:border-b-0"
          >
            <AccordionTrigger className="vnoc-wholesale-accordion-trigger">
              Suspend Subscriber
            </AccordionTrigger>
            <AccordionContent className="vnoc-wholesale-accordion-content">
              <WholesaleChartDateWiseChart hideHeader />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="restore-subscriber"
            className="vnoc-wholesale-accordion-item not-last:border-b-0"
          >
            <AccordionTrigger className="vnoc-wholesale-accordion-trigger">
              Restore Subscriber
            </AccordionTrigger>
            <AccordionContent className="vnoc-wholesale-accordion-content">
              <WholesaleChartDateWiseChart hideHeader />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="deactivate-subscriber"
            className="vnoc-wholesale-accordion-item not-last:border-b-0"
          >
            <AccordionTrigger className="vnoc-wholesale-accordion-trigger">
              Deactivate Subscriber
            </AccordionTrigger>
            <AccordionContent className="vnoc-wholesale-accordion-content">
              <WholesaleChartDateWiseChart hideHeader />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="swap-msisdn"
            className="vnoc-wholesale-accordion-item not-last:border-b-0"
          >
            <AccordionTrigger className="vnoc-wholesale-accordion-trigger">
              Swap MSISDN
            </AccordionTrigger>
            <AccordionContent className="vnoc-wholesale-accordion-content">
              <WholesaleChartDateWiseChart hideHeader />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="swap-sim"
            className="vnoc-wholesale-accordion-item not-last:border-b-0"
          >
            <AccordionTrigger className="vnoc-wholesale-accordion-trigger">
              Swap SIM
            </AccordionTrigger>
            <AccordionContent className="vnoc-wholesale-accordion-content">
              <WholesaleChartDateWiseChart hideHeader />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="validate-port-in"
            className="vnoc-wholesale-accordion-item not-last:border-b-0"
          >
            <AccordionTrigger className="vnoc-wholesale-accordion-trigger">
              Validate Port-in
            </AccordionTrigger>
            <AccordionContent className="vnoc-wholesale-accordion-content">
              <WholesaleChartDateWiseChart hideHeader />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="port-in-request"
            className="vnoc-wholesale-accordion-item not-last:border-b-0"
          >
            <AccordionTrigger className="vnoc-wholesale-accordion-trigger">
              Port-in Request
            </AccordionTrigger>
            <AccordionContent className="vnoc-wholesale-accordion-content">
              <WholesaleChartDateWiseChart hideHeader />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="cancel-port-in"
            className="vnoc-wholesale-accordion-item not-last:border-b-0"
          >
            <AccordionTrigger className="vnoc-wholesale-accordion-trigger">
              Cancel Port-in
            </AccordionTrigger>
            <AccordionContent className="vnoc-wholesale-accordion-content">
              <WholesaleChartDateWiseChart hideHeader />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="query-port-in"
            className="vnoc-wholesale-accordion-item not-last:border-b-0"
          >
            <AccordionTrigger className="vnoc-wholesale-accordion-trigger">
              Query Port-in
            </AccordionTrigger>
            <AccordionContent className="vnoc-wholesale-accordion-content">
              <WholesaleChartDateWiseChart hideHeader />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="update-port"
            className="vnoc-wholesale-accordion-item not-last:border-b-0"
          >
            <AccordionTrigger className="vnoc-wholesale-accordion-trigger">
              Update Port
            </AccordionTrigger>
            <AccordionContent className="vnoc-wholesale-accordion-content">
              <WholesaleChartDateWiseChart hideHeader />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="change-imei"
            className="vnoc-wholesale-accordion-item not-last:border-b-0"
          >
            <AccordionTrigger className="vnoc-wholesale-accordion-trigger">
              Change IMEI
            </AccordionTrigger>
            <AccordionContent className="vnoc-wholesale-accordion-content">
              <WholesaleChartDateWiseChart hideHeader />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="get-coverage"
            className="vnoc-wholesale-accordion-item not-last:border-b-0"
          >
            <AccordionTrigger className="vnoc-wholesale-accordion-trigger">
              Get Coverage
            </AccordionTrigger>
            <AccordionContent className="vnoc-wholesale-accordion-content">
              <WholesaleChartDateWiseChart hideHeader />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="adjustment"
            className="vnoc-wholesale-accordion-item not-last:border-b-0"
          >
            <AccordionTrigger className="vnoc-wholesale-accordion-trigger">
              Adjustment
            </AccordionTrigger>
            <AccordionContent className="vnoc-wholesale-accordion-content">
              <WholesaleChartDateWiseChart hideHeader />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="retrieve-account"
            className="vnoc-wholesale-accordion-item not-last:border-b-0"
          >
            <AccordionTrigger className="vnoc-wholesale-accordion-trigger">
              Retrieve Account
            </AccordionTrigger>
            <AccordionContent className="vnoc-wholesale-accordion-content">
              <WholesaleChartDateWiseChart hideHeader />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="update-airtime-expiry"
            className="vnoc-wholesale-accordion-item not-last:border-b-0"
          >
            <AccordionTrigger className="vnoc-wholesale-accordion-trigger">
              Update Airtime Expiry
            </AccordionTrigger>
            <AccordionContent className="vnoc-wholesale-accordion-content">
              <WholesaleChartDateWiseChart hideHeader />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="update-service-package"
            className="vnoc-wholesale-accordion-item not-last:border-b-0"
          >
            <AccordionTrigger className="vnoc-wholesale-accordion-trigger">
              Update Service Package
            </AccordionTrigger>
            <AccordionContent className="vnoc-wholesale-accordion-content">
              <WholesaleChartDateWiseChart hideHeader />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        
      </div>

    </div>
  )
}
