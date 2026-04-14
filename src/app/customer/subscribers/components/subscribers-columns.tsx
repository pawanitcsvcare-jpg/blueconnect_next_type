'use client'

import type { SortingFn } from '@tanstack/react-table'

import { createColumns } from '@/components/datatable/Column'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export type SubscriberRow = {
  id: string
  type: string
  carrier: string
  phone: string
  iccid: string
  imei: string
  zip: string
  timestamp: string
  status: string
}

function parseDisplayTimestamp(s: string): number {
  const m =
    /^(\d{2})-(\d{2})-(\d{4})\s+(\d{2}):(\d{2}):(\d{2})$/.exec(s.trim())
  if (!m) return 0
  const [, mm, dd, yyyy, hh, mi, ss] = m
  return new Date(
    Number(yyyy),
    Number(mm) - 1,
    Number(dd),
    Number(hh),
    Number(mi),
    Number(ss),
  ).getTime()
}

const timestampSort: SortingFn<SubscriberRow> = (rowA, rowB, columnId) => {
  const a = parseDisplayTimestamp(String(rowA.getValue(columnId)))
  const b = parseDisplayTimestamp(String(rowB.getValue(columnId)))
  return a - b
}

/** Sample data — replace with API rows. */
export const SUBSCRIBER_SAMPLE_DATA: SubscriberRow[] = [
  {
    id: '1',
    type: 'Porting',
    carrier: 'AttLiveTest',
    phone: '267-736-3732',
    iccid: '81280233173000000000',
    imei: '351998210575536',
    zip: '27527',
    timestamp: '03-13-2026 21:16:39',
    status: 'RESERVE',
  },
  {
    id: '2',
    type: 'Activation',
    carrier: 'AttLiveTest',
    phone: '332-280-1461',
    iccid: '89012802331621200000',
    imei: '354862090604286',
    zip: '10036',
    timestamp: '04-18-2025 03:22:26',
    status: 'REJECTED',
  },
  {
    id: '3',
    type: 'Activation',
    carrier: 'powermobile',
    phone: '332-214-8745',
    iccid: '89012802331570321149',
    imei: '352486292465882',
    zip: '11101',
    timestamp: '07-24-2024 05:45:05',
    status: 'ACTIVE',
  },
  {
    id: '4',
    type: 'Activation',
    carrier: 'powermobile',
    phone: '212-203-8745',
    iccid: '89012802331570321511',
    imei: '352496801093638',
    zip: '10016',
    timestamp: '07-24-2024 01:36:34',
    status: 'ACTIVE',
  },
  {
    id: '5',
    type: 'Activation',
    carrier: 'powermobile',
    phone: '212-203-3110',
    iccid: '89012802331570321503',
    imei: '350110541080225',
    zip: '10016',
    timestamp: '07-24-2024 01:03:32',
    status: 'ACTIVE',
  },
  {
    id: '6',
    type: 'Activation',
    carrier: 'Rivertel',
    phone: '929-707-6218',
    iccid: '89012802331570333318',
    imei: '359027152167938',
    zip: '11428',
    timestamp: '07-23-2024 23:45:07',
    status: 'ACTIVE',
  },
  {
    id: '7',
    type: 'Activation',
    carrier: 'powermobile',
    phone: '929-375-5129',
    iccid: '89012802331278238652',
    imei: '353893454362469',
    zip: '10018',
    timestamp: '07-23-2024 16:54:42',
    status: 'ACTIVE',
  },
  {
    id: '8',
    type: 'Activation',
    carrier: 'Infiniti',
    phone: '539-432-9532',
    iccid: '89012802331278223662',
    imei: '351464773070084',
    zip: '74131',
    timestamp: '07-23-2024 16:45:21',
    status: 'ACTIVE',
  },
]

export function createSubscriberColumns(onReprocess: (row: SubscriberRow) => void) {
  return createColumns<SubscriberRow>([
    { key: 'id', header: 'Sr No', sortable: false },
    { key: 'type', header: 'ACC Type', sortable: true },
    { key: 'carrier', header: 'Vendor/MVNO', sortable: true },
    {
      key: 'phone',
      header: 'MSISDN',
      sortable: true,
      cell: (row) => (
        <span
          className={cn(
            'inline-block rounded-md px-2 py-0.5 text-sm tabular-nums',
            'bg-[#8991f1] text-white text-[13px]',
          )}
        >
          {row.phone}
        </span>
      ),
    },
    { key: 'iccid', header: 'SIM', sortable: true },
    { key: 'imei', header: 'IMEI', sortable: true },
    { key: 'zip', header: 'Zip', sortable: true },
    {
      key: 'timestamp',
      header: 'Activation Date',
      sortable: true,
      sortingFn: timestampSort,
    },
    { key: 'status', header: 'Account Status', sortable: true },
    {
      id: 'actions',
      header: 'Action',
      cell: (row) =>
        row.status === 'REJECTED' ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className={cn(
              'h-7 border-red-200 bg-pink-100 px-2.5 text-xs font-semibold text-red-600',
              'hover:bg-pink-200 hover:text-red-700',
              'dark:border-red-900/50 dark:bg-red-950/50 dark:text-red-400 dark:hover:bg-red-950/70',
            )}
            onClick={() => onReprocess(row)}
          >
            Reprocess
          </Button>
        ) : null,
    },
  ])
}
