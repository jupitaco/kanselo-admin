import Administrator from "@/components/main/settings/admin/admin";
import Button from "@/components/ui/button";
import TableSkeleton from "@/components/ui/tableComponent/tableSkeleton";
import { SearchParams } from "@/types/global";
import { Metadata } from "next";
import React, { Suspense, use } from "react";

export const metadata: Metadata = { title: "Basic Settings" };

export default function Pages({ searchParams }: SearchParams) {
  const p = use(searchParams);
  return (
    <section className="space-y-6 rounded-2xl bg-white p-5">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <h4>All Administrators</h4>
        <Button
          link
          href="/settings/administrator/create-admin"
          className="pry-btn"
        >
          Add Administrators
        </Button>
      </header>
      <Suspense fallback={<TableSkeleton columns={5} />}>
        <Administrator params={p} />
      </Suspense>
    </section>
  );
}
