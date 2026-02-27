import Transaction from "@/components/main/transactions/transactions";
import Search from "@/components/ui/search";
import { SearchParams } from "@/types/global";
import { Metadata } from "next";
import React, { use } from "react";

export const metadata: Metadata = { title: "Transactions" };

export default function Pages({ searchParams }: SearchParams) {
  const p = use(searchParams);
  return (
    <main className="space-y-7 p-5">
      <section className="space-y-5 rounded-2xl bg-white p-5">
        <Transaction searchParams={p} />
      </section>
    </main>
  );
}

export const TransactionHeader = () => {
  return (
    <header className="flex flex-wrap items-center justify-between gap-3">
      <div className="space-y-3">
        <h4 className="font-semibold">History</h4>
        <p>View all transactions below</p>
      </div>
      <Search placeholder="Search" className="max-w-fit" />
    </header>
  );
};
