
import React from "react";
import { mentorsData } from "@/mock";
import { RecentMentorApplicationTable } from "../users/userComponents";

export default function RecentMentorApplications() {
  return (

    <RecentMentorApplicationTable
      data={mentorsData}
    />
  );
}
