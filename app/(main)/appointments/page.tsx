import RenderBookingByStatus from "@/components/main/booking/renderBookingByStatus";
import Search from "@/components/ui/search";
import { Metadata } from "next";
import Link from "next/link";
import React, { use } from "react";

export const metadata: Metadata = { title: "Appointments" };

const tabData = [
  { label: "New", path: "all" },
  { label: "Completed", path: "completed" },
  { label: "Cancelled", path: "cancelled" },
];

export default function Pages({
  searchParams,
}: {
  searchParams: Promise<{ tab: string }>;
}) {
  const { tab } = use(searchParams);
  const activeTab = tab || "all";

  return (
    <main className="space-y-14 p-5">
      <header className="grid grid-cols-1 lg:grid-cols-3 items-center justify-between gap-4">
        <article className="space-y-2 capitalize">
          <h4>{activeTab === "all" ? "New" : activeTab} appointments</h4>
        </article>

        <ul className="card flex min-h-10 w-full items-center justify-between gap-1 p-1 lg:w-fit">
          {tabData.map(({ label, path }, idx) => (
            <li key={idx}>
              <Link
                href={`/appointments?tab=${path}`}
                className={`text-xs font-medium ${activeTab === path ? "bg-primary rounded-lg text-white" : ""} px-4 md:px-7 py-2`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex justify-end">
          <Search placeholder="Search" className="max-w-fit" />
        </div>
      </header>

      <RenderBookingByStatus />
    </main>
  );
}
