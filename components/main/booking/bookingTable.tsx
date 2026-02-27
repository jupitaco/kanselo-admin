"use client";
import { EmptyState } from "@/components/ui/emptyState";
import TableComponent from "@/components/ui/tableComponent/tableComponent";
import TablePagination from "@/components/ui/tableComponent/tablePagination";
import TableSkeleton from "@/components/ui/tableComponent/tableSkeleton";
import { usePaginationContext } from "@/context/paginateContext";
import { newBookingColData } from "@/mock";
import { BookingType } from "@/types/booking";

import React from "react";

export default function BookingTable() {
  const { data, isPending } = usePaginationContext();
  if (data?.assets?.length === 0) {
    return <EmptyState title="No Data" subTitle="No booking data" />;
  }

  return (
    <>
      {isPending ? (
        <TableSkeleton />
      ) : (
        <TableComponent
          title="Booking & Scheduling"
          columns={newBookingColData}
          data={data?.assets as BookingType[]}
        />
      )}

      <TablePagination />
    </>
  );
}
