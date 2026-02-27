import { ErrorUI } from "@/components/ui/emptyState";
import { PaginationProvider } from "@/context/paginateContext";
import { SearchPageParams } from "@/types/global";
import React from "react";
import { ReviewTable } from "./reviewTable";
import { getMentorReviewsApi } from "@/services/apis/users.api";

export default async function Reviews({
  mentorId,
}: {
  mentorId: string;
  params: SearchPageParams;
}) {
  const rsp = await getMentorReviewsApi(mentorId);

  if (!rsp?.ok) {
    return <ErrorUI code={rsp?.body?.code} message={rsp?.body?.message} />;
  }

  const { ratings, page, limit, total } = rsp?.body?.data;
  const reviewData = {
    page,
    total,
    limit,
    assets: ratings,
  };

  return (
    <section className="space-y-4 rounded-xl bg-white p-4">
      <div className="flex items-center justify-between gap-4">
        <h4 className="font-semibold">Reviews ({total})</h4>
      </div>
      <PaginationProvider data={reviewData}>
        <ReviewTable />
      </PaginationProvider>
    </section>
  );
}
