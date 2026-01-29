'use client'
import { bookingAssets, mentorsColData, mentorsData, recentBookingColData, reviewColData, reviewsData, templateColData, templateData } from "@/mock";
import React from "react";
import TableComponent from "@/components/ui/tableComponent/tableComponent";


export const MentorsTable = () => {
    return (
        <TableComponent title='Mentors' columns={mentorsColData} data={mentorsData} />
    )
}

export const MentorTemplateTable = () => {
    return (
        <TableComponent title='Mentor Templates' columns={templateColData} data={templateData} />
    )
}

export const MentorReviewsTable = () => {
    return (
        <TableComponent title='Mentor Reviews' columns={reviewColData} data={reviewsData} />
    )
}


export const MenteeConsultationTable = () => {
    return (
        <TableComponent
            title="Booking & Scheduling"
            columns={recentBookingColData}
            data={bookingAssets}
        />
    );
}




