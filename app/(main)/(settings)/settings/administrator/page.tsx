import Administrator from "@/components/main/settings/admin/admin";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = { title: "Basic Settings" };

export default function page() {
  return <Administrator />;
}
