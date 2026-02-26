import Mentees from "@/components/main/users/mentees/mentees";
import Search from "@/components/ui/search";
import { SearchParams } from "@/types/global";
import { Metadata } from "next";
import React, { use } from "react";

export const metadata: Metadata = {
  title: "Mentors",
};

export default function Page({ searchParams }: SearchParams) {
  const p = use(searchParams);
  return (
    <main className="space-y-7 p-5">
      <section className="space-y-10 rounded-xl bg-white p-4">
        <Mentees searchParams={p} />
      </section>
    </main>
  );
}
