import React from 'react'
import RevenueChart from './revenueChart'
import Field from '@/components/ui/field'
import { FaSquare } from 'react-icons/fa6'

export default function RenderRevenue() {
    return (
        <section className="w-full overflow-hidden bg-white rounded-2xl p-5">
            <article className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='space-y-6'>
                    <h2>Revenue</h2>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                        <Field label="Consultations" value="$251,70" />
                        <Field label="Templates" value="$137,25" />
                    </div>
                </div>

                <div className='flex gap-3 justify-end items-start text-xs font-medium '>
                    <p className='flex items-center gap-2 '><FaSquare className='text-primary' /> Consultation</p>
                    <p className='flex items-center gap-2'><FaSquare className='text-secondary' /> Template</p>
                </div>
            </article>

            <RevenueChart />
        </section>
    )
}
