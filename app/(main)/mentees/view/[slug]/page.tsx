import Consultation from "@/components/main/users/mentees/consultation";
import { UserAction } from "@/components/main/users/userComponents";
import { MentorAvatar } from "@/components/main/verifications/components";
import { ErrorUI } from "@/components/ui/emptyState";
import Field from "@/components/ui/field";
import GoBackBtn from "@/components/ui/goBackBtn";
import { getMenteeById } from "@/services/apis/users.api";
import { SearchPageParams } from "@/types/global";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const mentor = await getMenteeById(slug);

  return {
    title: mentor?.ok ? mentor?.body?.data?.fullName : "Mentee",
  };
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<SearchPageParams>;
}) {
  const { slug } = await params;
  const sPms = await searchParams;

  const rsp = await getMenteeById(slug);

  if (!rsp?.ok) {
    return <ErrorUI code={rsp?.body?.code} message={rsp?.body?.message} />;
  }

  const mentee = rsp?.body?.data;

  return (
    <div className="space-y-4 p-5">
      <GoBackBtn title="Back" className="outline-btn btn" />

      <main className="flex flex-wrap gap-4">
        <section className="min-h-5/6 w-full space-y-8 rounded-xl bg-white p-4 lg:w-4/12">
          <MentorAvatar {...mentee} />
          <ul className="space-y-4">
            <li>
              <Field
                label="Email"
                value={mentee.email}
                className="flex flex-col-reverse gap-1"
                valueClassName="text-start font-semibold"
              />
            </li>
            <li>
              <Field
                label="Phone Number"
                value={mentee.phoneNumber || "N/A"}
                className="flex flex-col-reverse gap-1"
                valueClassName="text-start font-semibold"
              />
            </li>

            <li>
              <Field
                label="Consultations"
                value={mentee?.totalBookings}
                className="flex flex-col-reverse gap-1"
                valueClassName="text-start font-semibold"
              />
            </li>

            <li>
              <Field
                label="Templates bought"
                value={mentee.totalTemplatesBought}
                className="flex flex-col-reverse gap-1"
                valueClassName="text-start font-semibold"
              />
            </li>
          </ul>
          <UserAction data={mentee} userType="Mentee" path="/mentees" />{" "}
        </section>

        <aside className="flex-1 space-y-8 rounded-xl bg-white p-4">
          <h4 className="font-semibold">Consultations</h4>
          <Consultation menteeId={slug} searchParams={sPms} />
        </aside>
      </main>
    </div>
  );
}
