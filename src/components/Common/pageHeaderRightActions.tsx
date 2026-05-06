'use client'

import * as React from 'react'

import { NeedHelpLinkButton } from '@/components/Common/NeedHelpLinkButton'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { NEED_HELP_LINKS } from '@/lib/need-help-links'

const headerActionClass = 'h-10 bg-white hover:bg-blue-50'

/**
 * Top-right `PageTopBar` actions keyed by normalized pathname.
 * Add entries here when a page needs a header button.
 */
export function getPageHeaderRight(pathname: string): React.ReactNode {
  const actions: Record<string, React.ReactNode> = {
    '/user-management': (
      <Button
        type="submit"
        form="user-management-form"
        className={cn('w-min-w', headerActionClass)}
        variant="outlinePrimary"
        outlineWidth="bold"
      >
        <i className="ri-add-line" aria-hidden />
        Manage User
      </Button>
    ),
    '/need-help': (
      <div className="flex flex-wrap items-center justify-end gap-2">
        <NeedHelpLinkButton
          href={NEED_HELP_LINKS.apiDocument}
          iconClass="ri-file-text-line"
          compact
          title="API Document"
        >
          API Document
        </NeedHelpLinkButton>
        <NeedHelpLinkButton
          href={NEED_HELP_LINKS.postmanCollection}
          iconClass="ri-download-cloud-2-line"
          compact
          title="Postman Collection"
        >
          Postman Collection
        </NeedHelpLinkButton>
        <NeedHelpLinkButton
          href={NEED_HELP_LINKS.cdrDistribution}
          iconClass="ri-share-forward-line"
          compact
          title="CDR Distribution"
        >
          CDR Distribution
        </NeedHelpLinkButton>
      </div>
    ),
  }

  return actions[pathname]
}
