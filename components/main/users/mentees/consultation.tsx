import React from "react";
import { MenteeConsultationTable } from "../userComponents";
import { PaginationProvider } from "@/context/paginateContext";
import { SearchPageParams } from "@/types/global";
import { getAllMenteeBookingsApi } from "@/services/apis/users.api";
import { ErrorUI } from "@/components/ui/emptyState";

export default async function Consultation({
  menteeId,
  searchParams,
}: {
  menteeId: string;
  searchParams: SearchPageParams;
}) {
  const rsp = await getAllMenteeBookingsApi({
    menteeId,
    page: searchParams?.page || "1",
  });

  if (!rsp?.ok) {
    return <ErrorUI code={rsp?.body?.code} message={rsp?.body?.message} />;
  }

  const { bookings, page, limit, total } = rsp?.body?.data;

  const menteeBookingData = {
    page,
    total,
    limit,
    assets: bookings,
  };
  return (
    <PaginationProvider data={menteeBookingData}>
      <MenteeConsultationTable />
    </PaginationProvider>
  );
}
