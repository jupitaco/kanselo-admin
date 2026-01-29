import React, { Suspense } from "react";
import BookingTable from "./bookingTable";

export default function RenderBookingByStatus() {
  return (
    <Suspense>
      <BookingTable />
    </Suspense>
  );
}
