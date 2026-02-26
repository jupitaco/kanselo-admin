import Mentees from "@/components/main/users/mentees/mentees";
import Search from "@/components/ui/search";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Mentors",
};

export default function Page() {
  return (
    <main className="space-y-7 p-5">
      <section className="space-y-10 rounded-xl bg-white p-4">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <h4 className="font-semibold">All Mentees</h4>
          <Search placeholder="Search" className="max-w-fit!" />
        </header>

        <Mentees />
      </section>
    </main>
  );
}
