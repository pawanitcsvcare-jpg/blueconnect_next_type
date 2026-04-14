'use client'

import * as React from 'react'

import DataTable from '@/components/datatable/DataTable'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

import {
  createSubscriberColumns,
  SUBSCRIBER_SAMPLE_DATA,
  type SubscriberRow,
} from './subscribers-columns'

export type { SubscriberRow }
export { SUBSCRIBER_SAMPLE_DATA }

const PAGE_SIZE = 8

type SubscribersDataTableProps = {
  data?: SubscriberRow[]
  pageSize?: number
  className?: string
}

export default function SubscribersDataTable({
  data = SUBSCRIBER_SAMPLE_DATA,
  pageSize = PAGE_SIZE,
  className,
}: SubscribersDataTableProps) {
  const [reprocessRow, setReprocessRow] = React.useState<SubscriberRow | null>(
    null,
  )

  const columns = React.useMemo(
    () => createSubscriberColumns(setReprocessRow),
    [],
  )

  return (
    <div className={cn('space-y-4', className)}>
      <div className="table-responsive">
        <DataTable
        // searchable
       //  searchPlaceholder="Search by MSISDN, IMEI, ICCID, ZIP, Activation Date, Account Status, etc."
          data={data}
          columns={columns}
          paginated
          pageSize={pageSize}
          emptyMessage="No subscribers found."
        />
      </div>

      <Dialog
        open={reprocessRow !== null}
        onOpenChange={(open) => {
          if (!open) setReprocessRow(null)
        }}
      >
        <DialogContent className="max-w-4xl rounded-2xl sm:max-w-5xl lg:max-w-6xl">
          <DialogHeader>
            <DialogTitle>Reprocess subscriber</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <DialogDescription>
              Re-run processing for subscriber. Connect your API to perform the
              reprocess action.
            </DialogDescription>
          </DialogBody>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setReprocessRow(null)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="primary"
              onClick={() => {
                if (reprocessRow) {
                  console.log('Reprocess', reprocessRow.id)
                }
                setReprocessRow(null)
              }}
            >
              Confirm reprocess
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
