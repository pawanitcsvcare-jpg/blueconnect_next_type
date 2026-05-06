/** API docs, Postman export, CDR — set via `.env` or change defaults. */
export const NEED_HELP_LINKS = {
  apiDocument: process.env.NEXT_PUBLIC_API_DOCS_URL ?? '#',
  postmanCollection:
    process.env.NEXT_PUBLIC_POSTMAN_COLLECTION_URL ?? '#',
  cdrDistribution: process.env.NEXT_PUBLIC_CDR_DISTRIBUTION_URL ?? '#',
} as const
