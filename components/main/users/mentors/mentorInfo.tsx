import React from "react";
import { formatNumInThousands } from "@/utils/helper";
import { BsStarFill } from "react-icons/bs";
import { ErrorUI } from "@/components/ui/emptyState";
import { getMentorByIdApi } from "@/services/apis/bookings.api";
import { MentorAvatar } from "../../verifications/components";
import Field from "@/components/ui/field";
import { UserAction } from "../userComponents";

export default async function MentorInfo({ mentorId }: { mentorId: string }) {
  const rsp = await getMentorByIdApi(mentorId);

  if (!rsp?.ok) {
    return (
      <ErrorUI
        code={rsp?.body?.code}
        message={rsp?.body?.message}
        className="min-h-[80vh] pt-8"
      />
    );
  }

  const mentor = rsp?.body?.data;

  return (
    <section className="h-full w-full space-y-8 rounded-xl bg-white p-4 lg:w-4/12">
      <MentorAvatar {...mentor} />

      <ul className="space-y-4">
        <li>
          <Field
            label="Email"
            value={mentor.email}
            className="flex flex-col-reverse gap-1"
            valueClassName="text-start font-semibold"
          />
        </li>
        <li>
          <Field
            label="Phone Number"
            value={mentor.phoneNumber || "N/A"}
            className="flex flex-col-reverse gap-1"
            valueClassName="text-start font-semibold"
          />
        </li>

        <li>
          <Field
            label="per session"
            value={`$${formatNumInThousands(mentor.consultationFee)}`}
            className="flex flex-col-reverse gap-1"
            valueClassName="text-start font-semibold"
          />
        </li>
        <li>
          <Field
            label="Consultations"
            value={mentor?.totalBookings ?? "N/A"}
            className="flex flex-col-reverse gap-1"
            valueClassName="text-start font-semibold"
          />
        </li>
        <li>
          <Field
            label="Bio"
            value={mentor.bio}
            className="flex flex-col gap-1"
            valueClassName="text-start font-semibold"
          />
        </li>
        <li>
          <Field
            label="Ratings"
            value={
              <h5 className="flex items-center gap-1 font-semibold">
                <BsStarFill className="rated" />
                <span>{mentor.averageRating}</span>
              </h5>
            }
            className="flex justify-between gap-1"
            valueClassName="text-start font-semibold"
          />
        </li>
      </ul>

      <UserAction data={mentor} userType="Mentor" path="/mentors" />
    </section>
  );
}
