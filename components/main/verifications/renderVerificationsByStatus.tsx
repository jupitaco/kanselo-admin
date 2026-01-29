import { mentorsData } from "@/mock";
import React from "react";
import { MentorCard } from "./components";

export default function RenderVerificationsByStatus() {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {
        mentorsData?.map((item, idx) => (
          <MentorCard key={idx} data={item} />
        ))
      }
    </ul>
  );
}
