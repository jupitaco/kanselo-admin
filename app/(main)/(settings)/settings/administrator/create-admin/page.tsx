import { CreateAdmin } from '@/components/main/settings/admin/createAdmin'
import GoBackBtn from '@/components/ui/goBackBtn'
import React from 'react'

export default function Page() {
    return (
        <main className='p-5 space-y-5'>
            <GoBackBtn title='Back' className='btn outline-btn' />
            <h4>
                New Administrator
            </h4>

            <section className='rounded-2xl bg-white p-5'>

                <CreateAdmin />
            </section>
        </main>
    )
}
