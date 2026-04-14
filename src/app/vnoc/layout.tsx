import type { Metadata } from 'next'

import '@/app/vnoc/assets/css/vnoc-shell.css'

export const metadata: Metadata = {
  title: 'Virtual NOC · BlueConnects',
  description: 'Virtual network operations center',
}

export default function VnocSegmentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
