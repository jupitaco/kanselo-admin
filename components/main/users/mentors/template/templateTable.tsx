"use client";
import { EmptyState } from "@/components/ui/emptyState";
import TableComponent from "@/components/ui/tableComponent/tableComponent";
import TablePagination from "@/components/ui/tableComponent/tablePagination";
import TableSkeleton from "@/components/ui/tableComponent/tableSkeleton";
import { usePaginationContext } from "@/context/paginateContext";
import { templateColData } from "@/mock";
import { TemplateType } from "@/types/template";

export const TemplateTable = () => {
  const { data, isPending } = usePaginationContext();

  if (data?.assets?.length === 0) {
    return (
      <EmptyState
        title="No Templates"
        subTitle="This does not have templates yet."
      />
    );
  }

  return (
    <>
      {isPending ? (
        <TableSkeleton columns={6} />
      ) : (
        <TableComponent
          title="Templates"
          columns={templateColData}
          data={data?.assets as TemplateType[]}
          containerClassName="!p-0"
        />
      )}

      <TablePagination />
    </>
  );
};
