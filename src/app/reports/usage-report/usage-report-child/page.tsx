

'use client';

import SubscribersDataTable from '../../../customer/subscribers/components/SubscribersDataTable'
import { FormFieldControl } from '@/components/ui/form-field-control'

import { Button } from "@/components/ui/button"
import { useState } from 'react';

function UsageReportChild() {

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        console.log('Filter', e.target);
    };
    const vendors = [
        { label: "Select Vendor", value: null },
        { label: "Vendor 1", value: "Vendor 1" },
        { label: "Vendor 2", value: "Vendor 2" },
        { label: "Vendor 3", value: "Vendor 3" },
        { label: "Vendor 4", value: "Vendor 4" },
    ]
    const [date, setDate] = useState<Date | undefined>(undefined)
    const [dateTo, setDateTo] = useState<Date | undefined>(undefined)

    return (
        <div>
            <div className="card shadow-none border-none">
                <div className="card-body border-none outline-none">
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-3 pt-2 md:flex-row md:flex-nowrap md:items-end md:gap-3">
                        <FormFieldControl
                            type="text"
                            id="usage-report-msisdn"
                            label="MSISDN"
                            required
                            placeholder="Enter MSISDN"
                            className="min-w-0 flex-1"
                        />

                        <FormFieldControl
                            type="select"
                            id="usage-report-vendor"
                            label="Vendor / MVNO"
                            items={vendors}
                            className="min-w-0 flex-1"
                        />

                        <FormFieldControl
                            type="date"
                            id="usage-report-date"
                            label="From Date"
                            required
                            value={date}
                            onChange={setDate}
                            className="min-w-0 flex-1"
                        />

                        <FormFieldControl
                            type="date"
                            id="usage-report-date-to"
                            label="To Date"
                            required
                            value={dateTo}
                            onChange={setDateTo}
                            className="min-w-0 flex-1"
                        />


                        <div className="mt-2 flex shrink-0 flex-wrap gap-3 md:mt-0">
                            <Button type="submit" className="h-12 w-auto min-w-28" variant="primary"><i className="ri-search-line"></i> Submit</Button>
                            <Button type="reset" className="h-12 w-auto min-w-28" variant="outlinePrimary" outlineWidth="bold"><i className="ri-eraser-line"></i> Clear</Button>
                        </div>



                    </form>
                </div>
            </div>

            <div className="card">
                <div className="card-body pt-0">

                    <div className="table-responsive">
                        <SubscribersDataTable />
                    </div>
                </div>
            </div>


        </div>
    )
}

export default UsageReportChild;
