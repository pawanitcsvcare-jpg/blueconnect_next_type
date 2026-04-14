'use client'

import { toast } from 'sonner'

import CustomerAddNotes from './components/CustomerAddNotes'
import CustomerProfileMainColumn from './components/CustomerProfileMainColumn'
import CustomerProfileNotes from './components/CustomerProfileNotes'
import CustomerProfileSidebar from './components/CustomerProfileSidebar'
import {
  demoCustomerNotes,
  demoProfile,
} from './data/customer-profile-demo'

function CustomerProfilePage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:gap-5">
        <CustomerProfileSidebar />
        <div className="min-w-0 flex-1">
          <CustomerProfileMainColumn />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-4 mt-4 mb-4">
        <CustomerProfileNotes
          notes={demoCustomerNotes}
          onExpand={() => toast.message('Open full notes view', { description: 'Wire this to a modal or route when ready.' })}
        />
        <CustomerAddNotes
          customerId={demoProfile.customerId}
          onExpand={() => toast.message('Expand add notes', { description: 'Wire this to a modal or route when ready.' })}
          onSubmit={async ({ customerId, notes }) => {
            // Replace with API call
            await new Promise((r) => setTimeout(r, 400))
            console.log('Add note', { customerId, notes })
          }}
        />
      </div>
    </div>
  )
}

export default CustomerProfilePage
