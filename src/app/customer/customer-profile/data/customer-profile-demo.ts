/** Demo data for customer profile UI — replace with API data later. */

export const demoProfile = {
  customerId: '832559',
  msisdn: '206-845-3761',
  avatarLetter: 'B',
  sidebarRows: [
    { label: 'Vendor ID', value: 'VND-10492' },
    { label: 'City', value: 'Seattle' },
    { label: 'State', value: 'WA' },
    { label: 'Zip', value: '98101' },
    { label: 'IMEI', value: '353457789012345' },
    { label: 'Bill Cycle Frequency', value: 'Monthly' },
    { label: 'Bill Cycle Start Day', value: '12' },
    { label: 'Carrier', value: 'ATT' },
    { label: 'Last Action', value: 'Plan change' },
    { label: 'Assign Date', value: '2024-06-18' },
    { label: 'Plan Code', value: 'UNL-50' },
    { label: 'Billing Code', value: 'BC-7781' },
    { label: 'Voicemail Password', value: '••••' },
  ],
  netIpBalance: {
    status: '7017',
    description: 'FindAccount: No data found.',
  },
  technicalRows: [
    { label: 'Status', value: 'Active' },
    { label: 'Status Reason Code', value: '—' },
    { label: 'Equipment Type', value: 'Handset' },
    { label: 'Technology Type', value: 'GSM' },
    { label: 'IMSI', value: '310410987654321' },
    { label: 'PUK1', value: '12345678' },
    { label: 'PUK2', value: '87654321' },
    { label: 'IMEI', value: '353457789012345' },
    { label: 'IMEI Type', value: 'Primary' },
    { label: 'SIM', value: '89014103211118510720' },
    { label: 'Manufacturer Make', value: 'Samsung' },
    { label: 'Manufacturer Model', value: 'SM-G991B' },
    { label: 'Billing Account Number', value: 'BAN-009812' },
    { label: 'Billing Market', value: 'Northwest' },
    { label: 'Billing Sub Market', value: 'Seattle Metro' },
  ],
  offeringRows: [
    { num: 1, code: 'APNPREPO', description: 'APN prepaid offering', date: '2024-01-10' },
    { num: 2, code: 'RMABRO', description: 'Roaming bundle', date: '2024-02-14' },
    { num: 3, code: 'DATA5G', description: '5G data add-on', date: '2024-03-01' },
    { num: 4, code: 'VMAIL', description: 'Voicemail service', date: '2023-11-22' },
    { num: 5, code: 'SMSINT', description: 'International SMS', date: '2024-04-05' },
    { num: 6, code: 'HDVOICE', description: 'HD Voice codec', date: '2024-04-05' },
  ],
} as const

/** Note row for Customer Notes panel — wire from API later. */
export type CustomerNoteItem = {
  id: string
  author: string
  content: string
  /** Shown in the date pill (e.g. MM/DD/YYYY). */
  date: string
}

export const demoCustomerNotes: CustomerNoteItem[] = [
  {
    id: 'n1',
    author: 'supadmin',
    content: 'Resend Ota profile failed!',
    date: '12/20/2025',
  },
  {
    id: 'n2',
    author: 'supadmin',
    content: 'Line suspension requested by carrier.',
    date: '12/15/2025',
  },
  {
    id: 'n3',
    author: 'jsmith',
    content: 'Customer called regarding billing — follow up next week.',
    date: '12/10/2025',
  },
  {
    id: 'n4',
    author: 'supadmin',
    content: 'Line suspension requested by carrier.',
    date: '12/15/2025',
  },
]

export const profileTabItems = [
  { id: 'carrier', label: 'Carrier SIM Detail' },
  { id: 'status', label: 'Status' },
  { id: 'suspend', label: 'Suspend Service' },
  { id: 'restore', label: 'Restore Service' },
  { id: 'phone', label: 'Phone Config' },
  { id: 'bucket', label: 'Purchase Bucket' },
  { id: 'topup', label: 'Purchase Topup Bucket' },
] as const

/** Tabs opened from the ⋮ overflow menu (same panels as main tabs, not shown in the pill rail). */
export const profileOverflowMenuTabItems = [
  { id: 'product-features', label: 'Product/Features' },
  { id: 'resend-ota', label: 'Resend OTA' },
  { id: 'confirm-hlr', label: 'Confirm HLR Registration' },
  { id: 'update-call-forward', label: 'Update Call Forward Details' },
  { id: 'change-billing-code', label: 'Change Billing Code' },
  { id: 'reset-voicemail', label: 'Reset Voicemail Password' },
  { id: 'send-sms', label: 'Send SMS' },
  { id: 'net-ip', label: 'Net IP' },
  { id: 'switch-mvno', label: 'Switch MVNO' },
] as const

export const allProfileTabItems = [
  ...profileTabItems,
  ...profileOverflowMenuTabItems,
] as const
