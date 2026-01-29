
import React from "react";
import { RecentMentorApplicationTable } from "../table";
import { mentorsData } from "@/mock";

export default function RecentMentorApplications() {
  return (

    <RecentMentorApplicationTable
      data={mentorsData}
    />
  );
}
