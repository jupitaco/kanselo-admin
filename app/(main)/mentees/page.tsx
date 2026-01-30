
import Mentees from '@/components/main/users/mentees/mentees';
import Search from '@/components/ui/search';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "Mentors"
}

export default function Page() {
    return (
        <main className="p-5 space-y-7">
            <section className='p-4 bg-white rounded-xl space-y-10'>
                <header className='flex flex-wrap justify-between gap-4 items-center'>
                    <h4 className='font-semibold'>All Mentees</h4>
                    <Search placeholder='Search' className='max-w-fit!' />
                </header>

                <Mentees />
            </section>
        </main>
    )
}
