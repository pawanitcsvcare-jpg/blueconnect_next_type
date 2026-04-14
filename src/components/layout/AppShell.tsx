'use client'

import { usePathname } from 'next/navigation'
import { Toaster } from 'sonner'

import AppShellPageHeader from '@/components/Common/AppShellPageHeader'
import Footer from './Footer'
import Header from './Header'
import Sidebar from './Sidebar'
import VnocFooter from '@/app/vnoc/components/layout/VnocFooter'
import VnocHeader from '@/app/vnoc/components/layout/VnocHeader'
import VnocSidebar from '@/app/vnoc/components/layout/VnocSidebar'

const AUTH_ONLY_PREFIXES = ['/login']
const VNOC_PREFIX = '/vnoc'

function isAuthOnlyPath(pathname: string) {
  return AUTH_ONLY_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  )
}

function isVnocPath(pathname: string) {
  return pathname === VNOC_PREFIX || pathname.startsWith(`${VNOC_PREFIX}/`)
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? ''
  const authOnly = isAuthOnlyPath(pathname)
  const vnocShell = !authOnly && isVnocPath(pathname)

  return (
    <>
      {authOnly ? (
        <div className="min-h-svh bg-transparent" data-auth-page>
          {children}
        </div>
      ) : vnocShell ? (
        <div className="vnoc-layout" data-shell="vnoc">
          <VnocHeader />
          <div className="vnoc-layout__body">
            <VnocSidebar />
            <div className="vnoc-main">
              <div className="vnoc-main__inner">
                <AppShellPageHeader />
                {children}
              </div>
            </div>
          </div>
          <VnocFooter />
        </div>
      ) : (
        <>
          <div id="layout-wrapper">
            <Header />
            <Sidebar />
            <div className="main-content">
              <div className="page-content">
                <div className="parent-wrapper">
                  <main className="flex flex-1 flex-col">
                    <AppShellPageHeader />
                    <div className="min-h-0 flex-1">{children}</div>
                  </main>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
      <Toaster position="top-center" richColors closeButton />
    </>
  )
}
