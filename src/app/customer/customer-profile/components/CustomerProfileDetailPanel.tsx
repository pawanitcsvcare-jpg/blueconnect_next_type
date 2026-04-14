'use client'

import type { LucideIcon } from 'lucide-react'
import {
  Activity,
  Building2,
  CreditCard,
  Hash,
  Layers,
  Radio,
  Server,
  Smartphone,
  TabletSmartphone,
} from 'lucide-react'

import { demoProfile } from '../data/customer-profile-demo'
import ProfileDetailRow from './ProfileDetailRow'
import {
  GlobalAccordion,
  type SubscriptionAccordionPanel,
} from '@/components/Common/GlobalAccordion'

function techIcon(label: string): LucideIcon {
  const m: Record<string, LucideIcon> = {
    Status: Activity,
    'Status Reason Code': Hash,
    'Equipment Type': TabletSmartphone,
    'Technology Type': Radio,
    IMSI: Server,
    PUK1: Hash,
    PUK2: Hash,
    IMEI: Smartphone,
    'IMEI Type': Layers,
    SIM: Smartphone,
    'Manufacturer Make': Building2,
    'Manufacturer Model': Smartphone,
    'Billing Account Number': CreditCard,
    'Billing Market': Building2,
    'Billing Sub Market': Building2,
  }
  return m[label] ?? Hash
}

function buildSubscriptionPanels(
  p: typeof demoProfile,
): SubscriptionAccordionPanel[] {
  return [
    {
      value: 'offering',
      title: 'Offering and Feature Code Details',
      triggerClassName: 'rounded-xl',
      children: (
        <div className="mt-1 overflow-hidden rounded-xl border border-neutral-200/90 bg-white shadow-[2px_6px_20px_-10px_rgba(15,23,42,0.1)] dark:border-neutral-700 dark:bg-slate-900">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[#E8F0FE] dark:bg-[#1a2f4a]">
                <th
                  scope="col"
                  className="w-14 border-b-0 border-neutral-200/80 px-3 py-4 text-center text-[0.7rem] font-medium tracking-widest text-[#3C5A99] uppercase first:rounded-tl-xl dark:border-neutral-600 dark:text-[#9db7e8]"
                >
                  #
                </th>
                <th
                  scope="col"
                  className="border-b border-l border-neutral-200/80 px-4 py-4 text-left text-[0.7rem] font-medium tracking-widest text-[#3C5A99] uppercase dark:border-neutral-600 dark:text-[#9db7e8]"
                >
                  Offering Code
                </th>
                <th
                  scope="col"
                  className="border-b border-l border-neutral-200/80 px-4 py-4 text-left text-[0.7rem] font-medium tracking-widest text-[#3C5A99] uppercase dark:border-neutral-600 dark:text-[#9db7e8]"
                >
                  Description
                </th>
                <th
                  scope="col"
                  className="border-b border-l border-neutral-200/80 px-4 py-4 text-left text-[0.7rem] font-medium tracking-widest text-[#3C5A99] uppercase last:rounded-tr-xl dark:border-neutral-600 dark:text-[#9db7e8]"
                >
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {p.offeringRows.map((r) => (
                <tr
                  key={r.num}
                  className="border-b border-neutral-200/70 transition-colors last:border-b-0 hover:bg-slate-50/95 dark:border-neutral-700 dark:hover:bg-slate-800/55 [&:last-child>td:first-child]:rounded-bl-xl [&:last-child>td:last-child]:rounded-br-xl"
                >
                  <td className="px-3 py-4 text-center tabular-nums text-slate-700 dark:text-slate-300">
                    {r.num}
                  </td>
                  <td className="border-l border-neutral-200/70 px-4 py-4 text-xs text-slate-800 dark:border-neutral-700 dark:text-slate-200">
                    {r.code}
                  </td>
                  <td className="border-l border-neutral-200/70 px-4 py-4 text-slate-700 dark:border-neutral-700 dark:text-slate-300">
                    {r.description}
                  </td>
                  <td className="border-l border-neutral-200/70 px-4 py-4 text-slate-600 dark:border-neutral-700 dark:text-slate-400">
                    {r.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ),
    },
    {
      value: 'tpsp',
      title: 'TPSP Status',
      children: (
        <p className="px-2 pb-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          No TPSP records for this subscription.
        </p>
      ),
    },
    {
      value: 'balance',
      title: 'Balance Details',
      children: (
        <p className="px-2 pb-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          Balance data will load when available.
        </p>
      ),
    },
  ]
}

export default function CustomerProfileDetailPanel() {
  const p = demoProfile
  const accordionPanels = buildSubscriptionPanels(p)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-linear-to-r from-transparent via-indigo-200/90 to-indigo-100/30 dark:via-indigo-800/50" />
        <span className="shrink-0 text-[11px] font-medium tracking-[0.22em] text-slate-400 uppercase dark:text-slate-500">
          Subscription
        </span>
        <div className="h-px flex-1 bg-linear-to-l from-transparent via-indigo-200/90 to-indigo-100/30 dark:via-indigo-800/50" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
        <div className="rounded-2xl border border-indigo-100/50 bg-linear-to-b from-slate-50/90 to-white p-1 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.8)] dark:border-indigo-900/40 dark:from-slate-900/80 dark:to-slate-950">
          <div className="rounded-[0.85rem] bg-white/80 p-3 dark:bg-slate-950/50">
            {p.technicalRows.map((row) => (
              <ProfileDetailRow
                key={row.label}
                icon={techIcon(row.label)}
                label={row.label}
                value={row.value}
                interactive
              />
            ))}
          </div>
        </div>

        <div className="min-w-0">
          <div className="rounded-2xl border border-indigo-100/50 bg-linear-to-b from-slate-50/90 to-white p-1 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.8),6px_4px_32px_-14px_rgba(15,23,42,0.12),8px_0_24px_-16px_rgba(15,23,42,0.08)] dark:border-indigo-900/40 dark:from-slate-900/80 dark:to-slate-950 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04),6px_4px_36px_-12px_rgba(0,0,0,0.45)]">
            <div className="overflow-hidden rounded-[0.85rem] bg-white/90 p-2 sm:p-3 dark:bg-slate-950/50">
              <GlobalAccordion
                panels={accordionPanels}
                defaultValue={['offering']}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='h-8'></div>
    </div>
  )
}
