'use client'
import { bookingAssets, recentBookingColData, templateColData, templateData } from "@/mock";
import React from "react";
import TableComponent from "@/components/ui/tableComponent/tableComponent";

export default function MenteeConsultationTable() {
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


