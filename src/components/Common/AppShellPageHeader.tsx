'use client'

import { usePathname } from 'next/navigation'

import PageTopBar from '@/components/Common/PageTopBar'
import { getPageHeaderRight } from '@/components/Common/pageHeaderRightActions'
import useBreadcrumbs, {
  normalizePath,
  usePageTitle,
} from '@/components/Common/useBreadcrumbs'

export default function AppShellPageHeader() {
  const pathname = normalizePath(usePathname() ?? '/')
  if (pathname === '/dashboard' || pathname.startsWith('/vnoc')) {
    return null
  }

  const breadcrumbs = useBreadcrumbs()
  const title = usePageTitle()
  const right = getPageHeaderRight(pathname)

  return (
    <PageTopBar
      title={title}
      breadcrumbs={breadcrumbs as never[]}
      right={right}
    />
  )
}
