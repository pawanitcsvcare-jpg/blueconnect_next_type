/** Radio group for “Two-Step Verification”. */
export type TwoStepVerification = 'yes' | 'no'

/** Row for account status `<Select>` (placeholder row may use `value: null`). */
export type UserManagementStatusOption = {
  label: string
  value: string | null
}

/** Row for group `<Select>` — all values are non-null strings. */
export type UserManagementGroupOption = {
  label: string
  value: string
}
