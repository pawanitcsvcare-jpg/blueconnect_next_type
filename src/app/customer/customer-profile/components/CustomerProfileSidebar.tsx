'use client'

import type { LucideIcon } from 'lucide-react'
import {
  Building2,
  Calendar,
  CheckCircle2,
  CreditCard,
  Hash,
  MapPin,
  Radio,
  Smartphone,
  Voicemail,
  XCircle,
} from 'lucide-react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

import { demoProfile } from '../data/customer-profile-demo'
import ProfileDetailRow from './ProfileDetailRow'
import { CopyButton } from '@/components/ui/copy-button'

const iconForLabel = (label: string) => {
  const map: Record<string, LucideIcon> = {
    'Vendor ID': Building2,
    City: MapPin,
    State: MapPin,
    Zip: MapPin,
    IMEI: Smartphone,
    'Bill Cycle Frequency': Calendar,
    'Bill Cycle Start Day': Calendar,
    Carrier: Radio,
    'Last Action': Calendar,
    'Assign Date': Calendar,
    'Plan Code': Hash,
    'Billing Code': CreditCard,
    'Voicemail Password': Voicemail,
  }
  return map[label] ?? Hash
}

export default function CustomerProfileSidebar() {
  const p = demoProfile

  return (
    <aside className="w-full shrink-0 overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_-12px_rgba(79,70,229,0.12)] dark:border-indigo-900/40 dark:bg-slate-950 dark:shadow-[0_8px_32px_-12px_rgba(0,0,0,0.4)] xl:w-96 2xl:w-md">
      <div className="relative overflow-hidden rounded-t-2xl border-b border-indigo-100/50 bg-linear-to-b from-indigo-50/90 via-white to-white p-5 dark:border-indigo-900/40 dark:from-indigo-950/40 dark:via-slate-950 dark:to-slate-950">
        <div
          className="pointer-events-none absolute -right-10 -top-10 size-32  rounded-full bg-sky-300/25 blur-2xl dark:bg-indigo-600/15"
          aria-hidden
        />
        <div
          role="status"
          aria-label={
            p.lineStatus === 'active' ? 'Line status: active' : 'Line status: inactive'
          }
          className={`absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold tracking-wide text-white uppercase shadow-sm ${
            p.lineStatus === 'active'
              ? 'border-emerald-600/90 bg-emerald-500 dark:border-emerald-400 dark:bg-emerald-600'
              : 'border-red-600/90 bg-red-500 dark:border-red-400 dark:bg-red-600'
          }`}
        >
          {p.lineStatus === 'active' ? (
            <CheckCircle2 className="size-3.5 shrink-0" strokeWidth={2.25} aria-hidden />
          ) : (
            <XCircle className="size-3.5 shrink-0" strokeWidth={2.25} aria-hidden />
          )}
          {p.lineStatus === 'active' ? 'Active' : 'Inactive'}
        </div>
        <div className="relative flex flex-col items-center text-center">
          <div className="relative">
            <div
              className="absolute inset-[-3px] rounded-full bg-linear-to-br from-indigo-400 via-sky-400 to-cyan-400 opacity-75 blur-[2px] dark:opacity-50"
              aria-hidden
            />
            <Avatar
              size="lg"
              className="relative size-20 bg-linear-to-br from-sky-100 to-indigo-50 text-xl font-semibold text-indigo-800 ring-4 ring-white dark:from-indigo-950 dark:to-slate-900 dark:text-indigo-200 dark:ring-slate-950"
            >
              <AvatarFallback>{p.avatarLetter}</AvatarFallback>
            </Avatar>
            <span
              className={`absolute top-0 right-0 size-2.5 rounded-full shadow-[0_0_0_2px_rgba(255,255,255,1)] ring-2 ring-white dark:shadow-[0_0_0_2px_rgba(2,6,23,1)] dark:ring-slate-950 ${
                p.lineStatus === 'active' ? 'bg-emerald-500' : 'bg-red-500'
              }`}
              title={p.lineStatus === 'active' ? 'Line active' : 'Line inactive'}
              aria-hidden
            />
          </div>
          <p className="mt-3 text-sm text-neutral-500">Customer ID</p>
          <p className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
            {p.customerId}
          </p>
          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
            MSISDN{' '}
            <span className="font-medium text-neutral-900 dark:text-neutral-100">
              {p.msisdn}
            </span>
            <CopyButton
              text={p.msisdn}
              variant="outlineLight"
              successToast="MSISDN copied"
              className="h-7 shrink-0 shadow-sm font-normal font-size-11 absolute right-0 copyButtonTop"
              aria-label="Copy MSISDN"><i className="ri-copy-line text-base leading-none" aria-hidden />Copy MSISDN </CopyButton>
          </p>
        </div>
        <Button
          type="button"
          variant="outlinePrimary" outlineWidth="bold"
          className="mt-4 w-full shadow-none"
        >
          Submit Support Inquiry
        </Button>
      </div>

      <div className="px-4 py-3">
        {p.sidebarRows.map((row) => (
          <ProfileDetailRow
            key={row.label}
            icon={iconForLabel(row.label)}
            label={row.label}
            value={row.value}
            interactive
          />
        ))}
      </div>

      <div className="rounded-b-2xl border-t border-indigo-100/60 bg-linear-to-b from-slate-50/90 to-indigo-50/20 p-4 dark:border-indigo-900/40 dark:from-slate-900 dark:to-indigo-950/30">
        <h3 className="text-xs font-semibold tracking-wide text-neutral-500 uppercase">
          Net IP Balance
        </h3>
        <p className="mt-1 text-sm font-medium text-neutral-900 dark:text-neutral-100">
          Status: {p.netIpBalance.status}
        </p>
        <p className="mt-1 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
          {p.netIpBalance.description}
        </p>
      </div>
    </aside>
  )
}
