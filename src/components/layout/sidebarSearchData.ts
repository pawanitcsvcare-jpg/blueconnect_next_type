/**
 * Flattened sidebar navigation for the layout search.
 * `href: null` = menu label exists but route is not wired yet.
 */

export type SidebarSearchItem = {
  /** Stable id for listbox options */
  id: string
  breadcrumbs: string[]
  /** App route, or null when not implemented */
  href: string | null
}

type NavNode = {
  label: string
  /** Omit for section headers that only expand */
  href?: string | null
  children?: NavNode[]
}

const NAV_TREE: NavNode[] = [
  { label: 'Dashboard', href: '/dashboard' },
  {
    label: 'Customer',
    children: [
      { label: 'Subscribers', href: '/customer/subscribers' },
      { label: 'Async Response', href: null },
      { label: 'Reserve MSISDN Status', href: null },
      {
        label: 'Customer Profile',
        href: '/customer/customer-profile',
        children: [
          { label: 'Orders', href: null },
          { label: 'Purchase', href: null },
          { label: 'History', href: null },
          { label: 'Usage', href: null },
          { label: 'Adjust Balance', href: null },
          { label: 'Change Address', href: null },
        ],
      },
      { label: 'Recent Searches', href: null },
    ],
  },
  {
    label: 'Plan',
    children: [{ label: 'Lookup Tariff', href: null }],
  },
  {
    label: 'Action',
    children: [
      { label: 'Bulk / Single Upload', href: null },
      { label: 'Report', href: null },
    ],
  },
  {
    label: 'Inventory',
    children: [
      { label: 'Manage Inventory', href: null },
      { label: 'Add Inventory', href: null },
      { label: 'Search Inventory', href: null },
      { label: 'Total Assigned SIM', href: null },
      { label: 'Assign / Re-assign SIMs', href: null },
      { label: 'Inventory Report', href: null },
      { label: 'eSIM Unlock', href: null },
    ],
  },
  {
    label: 'Portin Order',
    children: [
      { label: 'Create New Order', href: null },
      { label: 'Pending Portin', href: null },
      { label: 'Cancel Portin', href: null },
      { label: 'Completed Ports', href: null },
      { label: 'Search Ports', href: null },
      { label: 'Portin Eligibility', href: null },
    ],
  },
  {
    label: 'Reports',
    children: [
      { label: 'MSISDN Snapshot', href: null },
      { label: 'Activation – Billing', href: null },
      { label: 'Deactivation', href: null },
      { label: 'PortOut', href: null },
      { label: 'PortIn', href: null },
      { label: 'Usage Reports', href: '/reports/usage-report' },
      { label: 'Billng Usage Reports', href: null },
      { label: 'MRC Subscriber', href: null },
      { label: 'Vendor MRC Subscriber', href: null },
      { label: 'Device Notification', href: null },
      { label: 'PortOut Notification', href: null },
      { label: 'Threshold Notification', href: null },
      { label: 'NetIP Report', href: null },
      { label: 'NetIP Report Summary', href: null },
      { label: 'NetIP Account Reload', href: null },
    ],
  },
  { label: 'Need Help?', href: null },
  {
    label: 'Inquiry',
    children: [
      { label: 'View Support Inquiry', href: null },
      { label: 'Completed Inquiry', href: null },
      { label: 'Summarize Report', href: null },
    ],
  },
  { label: 'Virtual NOC', href: '/vnoc' },
  {
    label: 'Checks',
    children: [
      { label: 'Query SIM', href: null },
      { label: 'Coverage', href: null },
      { label: 'Validate Device', href: null },
      { label: 'Get Vendor', href: null },
    ],
  },
]

function slugId(breadcrumbs: string[]) {
  return breadcrumbs.join(' › ').toLowerCase().replace(/[^a-z0-9]+/g, '-')
}

function collect(nodes: NavNode[], prefix: string[]): SidebarSearchItem[] {
  const out: SidebarSearchItem[] = []
  for (const n of nodes) {
    const bc = [...prefix, n.label]
    const hasChildren = Boolean(n.children?.length)

    if (hasChildren) {
      if (n.href !== undefined) {
        out.push({
          id: slugId(bc),
          breadcrumbs: bc,
          href: n.href ?? null,
        })
      }
      out.push(...collect(n.children!, bc))
    } else {
      out.push({
        id: slugId(bc),
        breadcrumbs: bc,
        href: n.href ?? null,
      })
    }
  }
  return out
}

export const SIDEBAR_SEARCH_ITEMS: SidebarSearchItem[] = collect(NAV_TREE, [])

export function filterSidebarSearchItems(
  query: string,
  max = 20,
): SidebarSearchItem[] {
  const q = query.trim().toLowerCase()
  if (!q) return []

  const tokens = q.split(/\s+/).filter(Boolean)

  const score = (item: SidebarSearchItem) => {
    const blob = item.breadcrumbs.join(' ').toLowerCase()
    if (!tokens.every((t) => blob.includes(t))) return -1
    const joined = item.breadcrumbs.join(' › ').toLowerCase()
    if (joined.startsWith(q)) return 100
    if (item.breadcrumbs[item.breadcrumbs.length - 1]!.toLowerCase().startsWith(q))
      return 80
    return 50
  }

  return SIDEBAR_SEARCH_ITEMS.map((item) => ({ item, s: score(item) }))
    .filter(({ s }) => s >= 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, max)
    .map(({ item }) => item)
}
