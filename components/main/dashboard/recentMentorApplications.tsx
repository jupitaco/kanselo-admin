import React from "react";
import { mentorsData } from "@/mock";
import { RecentMentorApplicationTable } from "../users/userComponents";
import { getAllMentorRequestApi } from "@/services/apis/bookings.api";
import { ErrorUI } from "@/components/ui/emptyState";

export default async function RecentMentorApplications() {
  const rsp = await getAllMentorRequestApi({ status: "NEW" });

  if (!rsp?.ok) {
    return <ErrorUI code={rsp?.body?.code} message={rsp?.body?.message} />;
  }

  return <RecentMentorApplicationTable data={rsp?.body?.data?.mentors} />;
}
