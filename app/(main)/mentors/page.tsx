import Mentors from "@/components/main/users/mentors/mentors";
import TableSkeleton from "@/components/ui/tableComponent/tableSkeleton";
import { SearchParams } from "@/types/global";
import { Metadata } from "next";
import React, { Suspense, use } from "react";

export const metadata: Metadata = {
  title: "Mentors",
};

export default function Page({ searchParams }: SearchParams) {
  const p = use(searchParams);
  return (
    <main className="space-y-7 p-5">
      <section className="space-y-10 rounded-xl bg-white p-4">
        <Suspense fallback={<TableSkeleton columns={6} />}>
          <Mentors searchParams={p} />
        </Suspense>
      </section>
    </main>
  );
}
