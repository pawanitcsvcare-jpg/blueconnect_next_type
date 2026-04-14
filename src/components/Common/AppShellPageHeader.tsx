'use client'

import { usePathname } from 'next/navigation'

import PageTopBar from '@/components/Common/PageTopBar'
import useBreadcrumbs, {
  normalizePath,
  usePageTitle,
} from '@/components/Common/useBreadcrumbs'
import { Button } from '@/components/ui/button'

export default function AppShellPageHeader() {
  const pathname = normalizePath(usePathname() ?? '/')
  if (pathname === '/dashboard' || pathname.startsWith('/vnoc')) {
    return null
  }

  const breadcrumbs = useBreadcrumbs()
  const title = usePageTitle()

  const right =
    pathname === '/user-management' ? (
      <Button
        type="submit"
        form="user-management-form"
        className="h-10 w-min-w bg-white hover:bg-blue-50"
        variant="outlinePrimary"
        outlineWidth="bold"
      >
        <i className="ri-add-line"></i> Manage User
      </Button>
    ) : undefined

  return (
    <PageTopBar
      title={title}
      breadcrumbs={breadcrumbs as never[]}
      right={right}
    />
  )
}
