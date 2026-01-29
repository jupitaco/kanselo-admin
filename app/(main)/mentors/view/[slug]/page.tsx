import Reviews from "@/components/main/users/mentors/reviews";
import Template from "@/components/main/users/mentors/template";
import { MentorAction, MentorAvatar } from "@/components/main/verifications/components";
import Field from "@/components/ui/field";
import { mentorsData } from "@/mock";
import { Mentor } from "@/types/global";
import { formatNumInThousands } from "@/utils/helper";
import Link from "next/link";
import React, { use } from "react";
import { BsStarFill } from "react-icons/bs";

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  const mentor = mentorsData.find((i) => i.id === slug) as Mentor;
  return (
    <main className="flex flex-wrap gap-4 p-5">
      <section className="min-h-5/6 w-full space-y-8 rounded-xl bg-white p-4 lg:w-4/12">
        <MentorAvatar {...mentor} />

        <ul className="space-y-4">
          <li  >
            <Field
              label="Email"
              value={mentor.email}
              className="flex flex-col-reverse gap-1"
              valueClassName="text-start font-semibold" />
          </li>
          <li  >
            <Field
              label="Phone Number"
              value={mentor.phoneNumber}
              className="flex flex-col-reverse gap-1"
              valueClassName="text-start font-semibold" />
          </li>
          <li  >
            <Field
              label="per session"
              value={`₦${formatNumInThousands(mentor.sessionRate)}`}
              className="flex flex-col-reverse gap-1"
              valueClassName="text-start font-semibold" />
          </li>

          <li  >
            <Field
              label="Bio"
              value={mentor.bio}
              className="flex flex-col gap-1"
              valueClassName="text-start" />
          </li>

          <li className="flex items-center justify-between gap-3">
            <h5 className="font-semibold">Rating</h5>
            <h5 className="flex items-center gap-1 font-semibold">
              <BsStarFill className="rated" />
              <span>{mentor.rating}.0</span>
            </h5>
          </li>
        </ul>

        <MentorAction data={mentor} />
      </section>

      <aside className="flex-1 space-y-8">
        <section className="space-y-4 rounded-xl bg-white p-4">
          <div className="flex items-center justify-between gap-4">
            <h4 className="font-semibold">Templates</h4>
          </div>
          <Template />
        </section>
        <section className="space-y-4 rounded-xl bg-white p-4">
          <div className="flex items-center justify-between gap-4">
            <h4 className="font-semibold">Reviews</h4>
          </div>
          <Reviews />
        </section>

      </aside>
    </main>
  );
}
