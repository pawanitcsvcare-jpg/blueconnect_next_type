'use client';

import { useMemo } from 'react';
import { usePathname } from 'next/navigation';

// Map route segments to human labels. Extend as you add routes.
const SEGMENT_LABELS = {
  dashboard: 'Dashboard',
  customer: 'Customer',
  subscribers: 'Subscribers',
  plan: 'Plan',
  action: 'Action',
  inventory: 'Inventory',
};

export default function useBreadcrumbs() {
  const pathname = usePathname() || '/';

  return useMemo(() => {
    const segments = pathname.split('/').filter(Boolean);
    const crumbs = [];
    let href = '';
    segments.forEach((seg, idx) => {
      href += `/${seg}`;
      const label = SEGMENT_LABELS[seg] || seg.charAt(0).toUpperCase() + seg.slice(1);
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

