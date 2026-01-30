'use client'
import { adminAssets, admincolData, bookingAssets, menteesColData, mentorsColData, mentorsData, recentBookingColData, reviewColData, reviewsData, templateColData, templateData } from "@/mock";
import React from "react";
import TableComponent from "@/components/ui/tableComponent/tableComponent";
import { Mentor } from "@/types/global";


export const RecentMentorApplicationTable = ({ data }: { data: Mentor[] }) => {
    return (
        <TableComponent title='Mentors' columns={mentorsColData} data={data} />
    )
}

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


export const MenteesTable = () => {

    const data = [...mentorsData].reverse()
    return (
        <TableComponent title='Mentees' columns={menteesColData} data={data} />
    )
}

export const AdminTable = () => {

    return (
        <TableComponent title='Administrators' columns={admincolData} data={adminAssets} />
    )
}



