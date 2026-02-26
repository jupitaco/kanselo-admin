import React from "react";
import { MenteesTable, UserHeader } from "../userComponents";
import { SearchPageParams } from "@/types/global";
import PageLayout from "../../pageLayout";
import { ErrorUI } from "@/components/ui/emptyState";
import { getAllMentees } from "@/services/apis/users.api";

export default async function Mentees({
  searchParams,
}: {
  searchParams: SearchPageParams;
}) {
  const rsp = await getAllMentees({
    search: searchParams?.search,
    page: searchParams?.page || "1",
  });

  if (!rsp?.ok) {
    return (
      <PageLayout headerChildren={<UserHeader pageTitle="Mentees" />}>
        <ErrorUI code={rsp?.body?.code} message={rsp?.body?.message} />
      </PageLayout>
    );
  }

  const { mentees, page, limit, total } = rsp?.body?.data;

  const menteeData = {
    page,
    total,
    limit,
    assets: mentees,
  };
  return (
    <PageLayout
      headerChildren={<UserHeader pageTitle="Mentees" />}
      data={menteeData}
    >
      <MenteesTable />
    </PageLayout>
  );
}
