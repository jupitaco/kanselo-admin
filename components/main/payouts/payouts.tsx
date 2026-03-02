import React from "react";
import { PayoutTable } from "./payoutTable";
import { PaginationProvider } from "@/context/paginateContext";
import { SearchPageParams } from "@/types/global";
import { ErrorUI } from "@/components/ui/emptyState";
import { getAllPayoutReqApi } from "@/services/apis/payout.api";

export default async function Payouts({
  params,
}: {
  params: SearchPageParams;
}) {
  const rsp = await getAllPayoutReqApi({ page: params?.page || "1" });

  if (!rsp?.ok) {
    return <ErrorUI code={rsp?.body?.code} message={rsp?.body?.message} />;
  }

  const { withdrawals, page, limit, total } = rsp?.body?.data;

  const payoutData = {
    page,
    total,
    limit,
    assets: withdrawals,
  };

  return (
    <PaginationProvider data={payoutData}>
      <PayoutTable />
    </PaginationProvider>
  );
}
