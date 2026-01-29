import RenderVerificationsByStatus from "@/components/main/verifications/renderVerificationsByStatus";
import Search from "@/components/ui/search";
import { Metadata } from "next";
import Link from "next/link";
import React, { use } from "react";

export const metadata: Metadata = { title: "Verifications" };

const tabData = [
  { label: "New", path: "new" },
  { label: "Approved", path: "approved" },
  { label: "Declined", path: "declined" },
];

export default function Pages({
  searchParams,
}: {
  searchParams: Promise<{ tab: string }>;
}) {
  const { tab } = use(searchParams);
  const activeTab = tab || "new";

  return (
    <main className="space-y-14 p-5">
      <header className="flex flex-wrap items-center justify-between gap-4">

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
          <Search placeholder="Search" />
        </div>
      </header>

      <RenderVerificationsByStatus />
    </main>
  );
}
