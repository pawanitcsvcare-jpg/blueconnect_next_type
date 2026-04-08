

 'use client';

import PageTopBar from '../../components/Common/PageTopBar'
import useBreadcrumbs from '../../components/Common/useBreadcrumbs'
import Input from '../../components/Common/Input'
import { useState } from 'react'

function Subscribers() {
    const breadcrumbs = useBreadcrumbs();
    const [form, setForm] = useState({ search: '', sim: '', status: '' });
    const handleChange = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, [name]: value }));

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        console.log('Filter', form);
    };
    return (
        <div>
            <PageTopBar
                title="Subscribers"
                breadcrumbs={breadcrumbs as never[]}
              //  right={<button type="submit" className="btn btn-primary">Apply</button>}
            />
            <div className="card">
                <div className="card-body">
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-3">
                        <Input
                            label="MSISDN"
                            type="text"
                            name="search"
                            value={form.search}
                            onChange={handleChange}
                        />

                         <Input
                            label="SIM"
                            type="text"
                            name="sim"
                            value={form.sim}
                            onChange={handleChange}
                        />
                       
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Subscribers;