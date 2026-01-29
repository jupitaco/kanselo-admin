
import Mentors from '@/components/main/users/mentors/mentors';
import Search from '@/components/ui/search';
import React from 'react'

export default function Page() {
    return (
        <main className="p-5 space-y-7">
            <section className='p-4 bg-white rounded-xl space-y-10'>
                <header className='flex flex-wrap justify-between gap-4 items-center'>
                    <h4 className='font-semibold'>All Mentors</h4>
                    <Search placeholder='Search' className='max-w-fit!' />
                </header>

                <Mentors />
            </section>
        </main>
    )
}
