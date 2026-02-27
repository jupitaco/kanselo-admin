import { PaginationProvider } from "@/context/paginateContext";
import React, { ReactNode } from "react";
import { UsePaginateData } from "@/hooks/usePagination";

export default function PageLayout({
  data,
  headerChildren,
  children,
}: {
  data?: UsePaginateData;
  headerChildren: ReactNode;
  children: ReactNode;
}) {
  return (
    <>
      <PaginationProvider data={data as UsePaginateData}>
        {headerChildren}

        {children}
      </PaginationProvider>
    </>
  );
}
