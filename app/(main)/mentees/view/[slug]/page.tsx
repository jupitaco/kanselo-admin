import Consultation from "@/components/main/users/mentees/consultation";
import { MenteeAction, MentorAvatar } from "@/components/main/verifications/components";
import Field from "@/components/ui/field";
import GoBackBtn from "@/components/ui/goBackBtn";
import { mentorsData } from "@/mock";
import { Mentor } from "@/types/global";
import { Metadata } from "next";
import React, { use } from "react";


export async function generateMetadata({ params }: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params
  const mentor = mentorsData.find((i) => i.id === slug) as Mentor;

  return {
    title: mentor?.name
  }
}

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  const mentor = mentorsData.find((i) => i.id === slug) as Mentor;
  return (
    <div className="space-y-4 p-5">
      <GoBackBtn title="Back" className=" outline-btn btn" />

      <main className="flex flex-wrap gap-4">

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
                label="Consultations"
                value={"258"}
                className="flex flex-col-reverse gap-1"
                valueClassName="text-start font-semibold" />
            </li>

            <li  >
              <Field
                label="Templates bought"
                value={"2"}
                className="flex flex-col-reverse gap-1"
                valueClassName="text-start font-semibold" />
            </li>


          </ul>

          <MenteeAction data={mentor} />
        </section>

        <aside className="flex-1  space-y-8 rounded-xl bg-white p-4">

          <h4 className="font-semibold">Consultations</h4>
          <Consultation />
        </aside>
      </main>
    </div>
  );
}
