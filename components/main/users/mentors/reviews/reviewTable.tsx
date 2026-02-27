"use client";
import { EmptyState } from "@/components/ui/emptyState";
import TableComponent from "@/components/ui/tableComponent/tableComponent";
import TablePagination from "@/components/ui/tableComponent/tablePagination";
import TableSkeleton from "@/components/ui/tableComponent/tableSkeleton";
import { usePaginationContext } from "@/context/paginateContext";
import { reviewColData } from "@/mock";
import { ReviewType } from "@/types/template";

export const ReviewTable = () => {
  const { data, isPending } = usePaginationContext();

  if (data?.assets?.length === 0) {
    return (
      <EmptyState
        title="No Reviews"
        subTitle="This mentor has not been rated yet."
      />
    );
  }

  return (
    <>
      {isPending ? (
        <TableSkeleton columns={3} />
      ) : (
        <TableComponent
          title="Reviews"
          columns={reviewColData}
          data={data?.assets as ReviewType[]}
          containerClassName="!p-0"
        />
      )}
    </>
  );
};
