'use client'
import { bookingAssets, recentBookingColData, recentMentorsColData, templateColData, templateData } from "@/mock";
import React from "react";
import TableComponent from "@/components/ui/tableComponent/tableComponent";
import { Mentor } from "@/types/global";

export const RecentMentorApplicationTable = ({ data }: { data: Mentor[] }) => {
    return (
        <TableComponent
            title="Mentor Applications"
            columns={recentMentorsColData}
            data={data}
        />
    );
}

export const MenteeConsultationTable = ({ data }: { data: any[] }) => {
    return (
        <TableComponent
            title="Booking & Scheduling"
            columns={recentBookingColData}
            data={bookingAssets}
        />
    );
}


export const MentorTemplateTable = () => {
    return (
        <TableComponent title='Templates' columns={templateColData} data={templateData} />
    )
}


