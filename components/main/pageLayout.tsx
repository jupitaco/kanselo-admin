import { PaginationProvider } from "@/context/paginateContext";
import React, { ReactNode } from "react";
import Search from "../ui/search";
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
    <main>
      <PaginationProvider data={data as UsePaginateData}>
        <header>
          {headerChildren}
          <div className="flex justify-end">
            <Search placeholder="Search" className="max-w-fit" />
          </div>
        </header>
        {children}
      </PaginationProvider>
    </main>
  );
}
