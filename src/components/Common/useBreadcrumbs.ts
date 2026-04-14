'use client';

import { useMemo } from 'react';
import { usePathname } from 'next/navigation';

// Map route segments to human labels. Extend as you add routes.
const SEGMENT_LABELS = {
  vnoc: 'Virtual NOC',
  dashboard: 'Dashboard',
  customer: 'Customer',
  subscribers: 'Subscribers',
  plan: 'Plan',
  action: 'Action',
  inventory: 'Inventory',
  'user-management': 'User Management',
  reports: 'Reports',
  'usage-report': 'Usage Report',
  'customer-profile': 'Overview',
  'usage-report-child': 'Detail',
} as const

/** Full-path overrides for the global `PageTopBar` title (optional). */
const ROUTE_PAGE_TITLES: Record<string, string> = {
  '/': 'Home',
  '/dashboard': 'Dashboard',
  '/customer/subscribers': 'Subscribers',
  '/customer/customer-profile': 'Customer profile',
  '/reports/usage-report': 'Usage Report',
  '/reports/usage-report/usage-report-child': 'Usage Report',
  '/user-management': 'User Management',
}

export function normalizePath(pathname: string) {
  if (pathname.length > 1 && pathname.endsWith('/')) {
    return pathname.slice(0, -1)
  }
  return pathname
}

export function usePageTitle(): string {
  const pathname = normalizePath(usePathname() || '/')
  if (ROUTE_PAGE_TITLES[pathname]) {
    return ROUTE_PAGE_TITLES[pathname]
  }
  const segments = pathname.split('/').filter(Boolean)
  if (segments.length === 0) {
    return 'BlueConnects'
  }
  const last = segments[segments.length - 1]
  const mapped =
    SEGMENT_LABELS[last as keyof typeof SEGMENT_LABELS] ??
    last.charAt(0).toUpperCase() + last.slice(1).replace(/-/g, ' ')
  return mapped
}

export default function useBreadcrumbs() {
  const pathname = usePathname() || '/';

  return useMemo(() => {
    const segments = pathname.split('/').filter(Boolean);
    const crumbs: { label: string; href?: string }[] = [];
    let href = '';
    segments.forEach((seg, idx) => {
      href += `/${seg}`;
      const label = SEGMENT_LABELS[seg as keyof typeof SEGMENT_LABELS] || seg.charAt(0).toUpperCase() + seg.slice(1);
      // All but last should be links
      if (idx < segments.length - 1) {
        crumbs.push({ label, href });
      } else {
        crumbs.push({ label });
      }
    });
    return crumbs;
  }, [pathname]);
}

