import React from "react";
import { MentorsTable, UserHeader } from "../userComponents";
import { SearchPageParams } from "@/types/global";
import { getAllMentors } from "@/services/apis/users.api";
import PageLayout from "../../pageLayout";
import { ErrorUI } from "@/components/ui/emptyState";

export default async function Mentors({
  searchParams,
}: {
  searchParams: SearchPageParams;
}) {
  const rsp = await getAllMentors({
    search: searchParams?.search,
    page: searchParams?.page || "1",
  });

  if (!rsp?.ok) {
    return (
      <PageLayout headerChildren={<UserHeader pageTitle="Mentors" />}>
        <ErrorUI code={rsp?.body?.code} message={rsp?.body?.message} />
      </PageLayout>
    );
  }

  const { mentors, page, limit, total } = rsp?.body?.data;

  const mentorData = {
    page,
    total,
    limit,
    assets: mentors,
  };
  return (
    <PageLayout
      headerChildren={<UserHeader pageTitle="Mentors" />}
      data={mentorData}
    >
      <MentorsTable />
    </PageLayout>
  );
}
