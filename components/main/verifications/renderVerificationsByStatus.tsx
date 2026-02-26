import React from "react";
import { MentorRequest } from "./components";
import { getAllMentorRequestApi } from "@/services/apis/bookings.api";
import { SearchPageParams } from "@/types/global";
import { ErrorUI } from "@/components/ui/emptyState";
import PageLayout from "../pageLayout";
import { tabData } from "@/app/(main)/verifications/page";
import Link from "next/link";
import Search from "@/components/ui/search";

export default async function RenderVerificationsByStatus({
  searchParams,
}: {
  searchParams: SearchPageParams;
}) {
  const activeTab = searchParams?.tab || "new";
  const rsp = await getAllMentorRequestApi({
    status: searchParams?.tab?.toUpperCase() || "NEW",
    page: searchParams?.page || "1",
  });

  if (!rsp?.ok) {
    return (
      <PageLayout
        headerChildren={<VerificationsHeader activeTab={activeTab} />}
      >
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
      headerChildren={<VerificationsHeader activeTab={activeTab} />}
      data={mentorData}
    >
      <MentorRequest />
    </PageLayout>
  );
}

export const VerificationsHeader = ({ activeTab }: { activeTab: string }) => {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4">
      <ul className="card flex min-h-10 w-full items-center justify-between gap-1 p-1 lg:w-fit">
        {tabData.map(({ label, path }, idx) => (
          <li key={idx}>
            <Link
              href={`/verifications?tab=${path}`}
              className={`text-xs font-medium ${activeTab === path ? "bg-primary rounded-lg text-white" : ""} px-4 py-2 md:px-7`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex justify-end">
        <Search placeholder="Search" />
      </div>
    </header>
  );
};
