
import Transaction from "@/components/main/transactions/transactions";
import Search from "@/components/ui/search";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = { title: "Transactions" };

export default function Pages() {
  return (
    <main className="space-y-7 p-5 ">
      <section className="space-y-5 rounded-2xl bg-white p-5">
        <header className="flex flex-wrap justify-between gap-3 items-center">
          <div className="space-y-3">
            <h4 className="font-semibold">History</h4>
            <p>View all transactions below</p>
          </div>
          <Search placeholder="Search" className="max-w-fit" />
        </header>
        <Transaction />
      </section>
    </main>
  );
}
