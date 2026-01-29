"use client";
import TableComponent from "@/components/ui/tableComponent/tableComponent";
import { bookingAssets, newBookingColData, } from "@/mock";

import React from "react";

export default function BookingTable() {

  return (

    <TableComponent
      title="Booking & Scheduling"
      columns={newBookingColData}
      data={bookingAssets}
    />

  );
}
