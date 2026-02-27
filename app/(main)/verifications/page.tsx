import RenderVerificationsByStatus from "@/components/main/verifications/renderVerificationsByStatus";
import { SearchParams } from "@/types/global";
import { Metadata } from "next";
import React, { use } from "react";

export const metadata: Metadata = { title: "Verifications" };

export const tabData = [
  { label: "New", path: "new" },
  { label: "Approved", path: "approved" },
  { label: "Declined", path: "declined" },
];

export default function Pages({ searchParams }: SearchParams) {
  const p = use(searchParams);

  return (
    <main className="space-y-14 p-5">
      <RenderVerificationsByStatus searchParams={p} />
    </main>
  );
}
