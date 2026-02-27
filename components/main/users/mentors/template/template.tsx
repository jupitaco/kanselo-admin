import { ErrorUI } from "@/components/ui/emptyState";
import { PaginationProvider } from "@/context/paginateContext";
import { SearchPageParams } from "@/types/global";
import React from "react";
import { TemplateTable } from "./templateTable";
import { getMentorTemplatesApi } from "@/services/apis/users.api";

export default async function Template({
  mentorId,
  params,
}: {
  mentorId: string;
  params: SearchPageParams;
}) {
  const rsp = await getMentorTemplatesApi(mentorId, params?.page || "1");

  if (!rsp?.ok) {
    return <ErrorUI code={rsp?.body?.code} message={rsp?.body?.message} />;
  }

  const { templates, page, limit, total } = rsp?.body?.data;
  const templateData = {
    page,
    total,
    limit,
    assets: templates,
  };

  return (
    <PaginationProvider data={templateData}>
      <TemplateTable />
    </PaginationProvider>
  );
}
