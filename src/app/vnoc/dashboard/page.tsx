import { redirect } from 'next/navigation'

/** Legacy URL: wholesale chart lives under `/vnoc/wholesale-request-chart`. */
export default function VnocDashboardPage() {
  redirect('/vnoc/wholesale-request-chart')
}
