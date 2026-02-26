import RenderBookingByStatus from "@/components/main/booking/renderBookingByStatus";
import TableSkeleton from "@/components/ui/tableComponent/tableSkeleton";
import { SearchParams } from "@/types/global";
import { Metadata } from "next";
import React, { Suspense, use } from "react";

export const metadata: Metadata = { title: "Appointments" };

export const tabData = [
  { label: "New", path: "pending" },
  { label: "Completed", path: "completed" },
  { label: "Cancelled", path: "cancelled" },
];

export default function Pages({ searchParams }: SearchParams) {
  const p = use(searchParams);

  return (
    <main className="space-y-14 p-5">
      <Suspense fallback={<TableSkeleton />}>
        <RenderBookingByStatus searchParams={p} />
      </Suspense>
    </main>
  );
}
