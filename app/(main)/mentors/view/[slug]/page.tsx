import MentorInfo from "@/components/main/users/mentors/mentorInfo";
import Reviews from "@/components/main/users/mentors/reviews/reviews";
import Template from "@/components/main/users/mentors/template/template";
import { UserInfoSkeleton } from "@/components/main/users/userComponents";
import GoBackBtn from "@/components/ui/goBackBtn";
import TableSkeleton from "@/components/ui/tableComponent/tableSkeleton";
import { getMentorByIdApi } from "@/services/apis/bookings.api";
import { SearchPageParams } from "@/types/global";
import { Metadata } from "next";
import React, { Suspense, use } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const mentor = await getMentorByIdApi(slug);

  return {
    title: mentor?.ok ? mentor?.body?.data?.fullName : "Mentee",
  };
}

export default function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<SearchPageParams>;
}) {
  const { slug } = use(params);
  const p = use(searchParams);

  return (
    <div className="space-y-4 p-5">
      <GoBackBtn title="Back" className="outline-btn btn" />
      <main className="flex flex-wrap gap-4">
        <Suspense fallback={<UserInfoSkeleton userType="Mentor" />}>
          <MentorInfo mentorId={slug} />
        </Suspense>

        <aside className="flex-1 space-y-8">
          <section className="space-y-4 rounded-xl bg-white p-4">
            <div className="flex items-center justify-between gap-4">
              <h4 className="font-semibold">Templates</h4>
            </div>
            <Suspense fallback={<TableSkeleton columns={3} />}>
              <Template mentorId={slug} params={p} />
            </Suspense>
          </section>

          <Suspense fallback={<TableSkeleton columns={3} />}>
            <Reviews mentorId={slug} params={p} />
          </Suspense>
        </aside>
      </main>
    </div>
  );
}
