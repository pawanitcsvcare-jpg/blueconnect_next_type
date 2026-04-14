'use client'

import * as React from 'react'

import { Button } from '@/components/ui/button'
import { FormFieldControl } from '@/components/ui/form-field-control'
import type {
  TwoStepVerification,
  UserManagementGroupOption,
  UserManagementStatusOption,
} from '@/types/user-management'

function UserManagement(): React.ReactElement {
  const [twoStep, setTwoStep] = React.useState<TwoStepVerification>('no')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    console.log('User list filter', e.currentTarget)
  }

  const accountStatus: UserManagementStatusOption[] = [
    { label: 'Select Status', value: null },
    { label: 'Active', value: 'Active' },
    { label: 'Inactive', value: 'Inactive' },
  ]

  const groups: UserManagementGroupOption[] = [
    { label: 'Select Group', value: '__placeholder__' },
    { label: 'Sigmatelchild', value: 'Sigmatelchild' },
    { label: 'DellAdchildgroup', value: 'DellAdchildgroup' },
    { label: 'WattsHolmesTraders_group', value: 'WattsHolmesTraders_group' },
  ]

  return (
    <div>
      <div className="card">
        <div className="card-body">
          <form
            id="user-management-form"
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-3 pt-2 md:grid-cols-4"
          >
            <FormFieldControl
              type="text"
              id="user-name"
              label="User Name"
              required
              placeholder="Enter User Name"
            />

            <FormFieldControl
              type="text"
              id="user-email"
              label="Email"
              required
              placeholder="Enter email"
              inputType="email"
              autoComplete="email"
            />

            <FormFieldControl
              type="text"
              id="user-password"
              label="Password"
              required
              placeholder="Enter Password"
              inputType="password"
              autoComplete="new-password"
            />

            <FormFieldControl
              type="select"
              id="accountStatus"
              label="Status"
              items={accountStatus}
              triggerClassName="w-full"
            />

            <FormFieldControl
              type="select"
              id="groups"
              label="Group"
              required
              items={groups}
              defaultValue="__placeholder__"
              triggerClassName="w-full"
              labelEnd={
                <Button type="button" variant="primary" className="small-btns">
                  <i className="ri-add-line w-2"></i> Add New Group
                </Button>
              }
            />

            <FormFieldControl
              type="text"
              id="user-first-name"
              label="First Name"
              placeholder="Enter First Name"
            />

            <FormFieldControl
              type="text"
              id="user-last-name"
              label="Last Name"
              placeholder="Enter Last Name"
            />

            <FormFieldControl
              type="text"
              id="user-address"
              label="Address"
              placeholder="Enter Address"
            />

            <FormFieldControl
              type="text"
              id="user-contact"
              label="Contact Number"
              required
              placeholder="Enter Contact Number"
              inputType="tel"
              autoComplete="tel"
            />

            <FormFieldControl
              type="radio"
              id="two-step-verification"
              label="Two-Step Verification"
              name="twoStepVerification"
              value={twoStep}
              onValueChange={(v) => setTwoStep(v as TwoStepVerification)}
              orientation="horizontal"
              radioGroupClassName="gap-6 pt-4"
              options={[
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' },
              ]}
            />

            <FormFieldControl
              type="text"
              id="user-about"
              label="About me"
              placeholder="Enter About me"
            />

            <Button type="submit" className="mt-6 h-12 w-min-w" variant="primary">
              Create User
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UserManagement
