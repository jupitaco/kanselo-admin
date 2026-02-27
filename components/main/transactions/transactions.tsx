import React from "react";
import { TransactionTable } from "./transactionTable";
import PageLayout from "../pageLayout";
import { TransactionHeader } from "@/app/(main)/transactions/page";
import { SearchPageParams } from "@/types/global";
import { getAllTransaction } from "@/services/apis/users.api";
import { ErrorUI } from "@/components/ui/emptyState";

export default async function Transaction({
  searchParams,
}: {
  searchParams: SearchPageParams;
}) {
  const rsp = await getAllTransaction({
    search: searchParams?.search,
    page: searchParams?.page || "1",
  });

  if (!rsp?.ok) {
    return (
      <PageLayout headerChildren={<TransactionHeader />}>
        <ErrorUI code={rsp?.body?.code} message={rsp?.body?.message} />
      </PageLayout>
    );
  }

  const { transactions, page, limit, total } = rsp?.body?.data;

  const transactionData = {
    page,
    total,
    limit,
    assets: transactions,
  };
  return (
    <PageLayout headerChildren={<TransactionHeader />} data={transactionData}>
      <TransactionTable />
    </PageLayout>
  );
}
