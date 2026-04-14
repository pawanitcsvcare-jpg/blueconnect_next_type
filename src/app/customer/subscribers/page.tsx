'use client'

import SectionHeader from '@/components/Common/SectionHeader'
import SubscribersDataTable from './components/SubscribersDataTable'
import { Button } from '@/components/ui/button'
import { FormFieldControl } from '@/components/ui/form-field-control'

function Subscribers() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    console.log('Filter', e.target)
  }

  const items = [
    { label: 'Select Company', value: null },
    { label: 'ABC Company', value: 'ABC Company' },
    { label: 'Admin Company', value: 'Admin Company' },
    { label: 'AdminQAFinal Company', value: 'AdminQAFinal Company' },
    { label: 'Asus India ltd.', value: 'Asus India ltd.' },
    { label: 'Books and Guy Co', value: 'Books and Guy Co' },
  ]
  const vendors = [
    { label: 'Select Vendor', value: null },
    { label: 'Vendor 1', value: 'Vendor 1' },
    { label: 'Vendor 2', value: 'Vendor 2' },
    { label: 'Vendor 3', value: 'Vendor 3' },
    { label: 'Vendor 4', value: 'Vendor 4' },
  ]
  const accountStatus = [
    { label: 'Select Account Status', value: null },
    { label: 'Active', value: 'Active' },
    { label: 'Deactivated', value: 'Deactivated' },
    { label: 'Reactivated', value: 'Reactivated' },
    { label: 'Suspended', value: 'Suspended' },
    { label: 'Reserved', value: 'Reserved' },
  ]
  const accountType = [
    { label: 'Select Account Type', value: null },
    { label: 'Activation', value: 'Activation' },
    { label: 'Porting', value: 'Porting' },
  ]

  return (
    <div>
      <div className="card">
        <div className="card-body">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-3 pt-2 md:grid-cols-4"
          >
            <FormFieldControl
              type="text"
              id="subscribers-msisdn"
              label="MSISDN"
              placeholder="Enter MSISDN"
            />

            <FormFieldControl
              type="select"
              id="subscribers-company"
              label="Company"
              items={items}
              triggerClassName="w-full"
            />

            <FormFieldControl
              type="select"
              id="subscribers-vendor"
              label="Vendor / MVNO"
              items={vendors}
              triggerClassName="w-full"
            />

            <FormFieldControl
              type="text"
              id="subscribers-sim"
              label="SIM"
              placeholder="Enter SIM"
            />

            <FormFieldControl
              type="select"
              id="subscribers-account-status"
              label="Account Status"
              items={accountStatus}
              triggerClassName="w-full"
            />

            <FormFieldControl
              type="select"
              id="subscribers-account-type"
              label="Account Type"
              items={accountType}
              triggerClassName="w-full"
            />

            <div className="mt-6 flex gap-3 md:col-span-4">
              <Button
                type="submit"
                className="h-12 w-min-w"
                variant="primary"
              >
                <i className="ri-search-line"></i> Submit
              </Button>
              <Button
                type="reset"
                className="h-12 w-min-w"
                variant="outlinePrimary"
                outlineWidth="bold"
              >
                <i className="ri-eraser-line"></i> Clear
              </Button>
            </div>
          </form>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <SectionHeader
            title="Subscriber's List"
            right={
              <Button
                type="button"
                variant="outlinePrimary"
                outlineWidth="bold"
                className="h-10"
              >
                <i className="ri-download-line"></i> Download
              </Button>
            }
          />
          <div className="table-responsive">
            <SubscribersDataTable />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Subscribers
