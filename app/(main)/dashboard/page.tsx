import { Appointments } from "@/components/main/dashboard/appointments";
import {
  AppointmentsCalendarWrapper,
  AppointmentSkeleton,
} from "@/components/main/dashboard/manageAppointments";
import RecentMentorApplications from "@/components/main/dashboard/recentMentorApplications";
import RenderRevenue, {
  RevenueGraphSkeleton,
} from "@/components/main/dashboard/renderRevenue";
import { Stats, StatsSkeleton } from "@/components/main/dashboard/stats";
import {
  TopMentors,
  TopMentorsSkeleton,
} from "@/components/main/dashboard/topMentors";
import { SearchParams } from "@/types/global";
import Link from "next/link";
import { Suspense, use } from "react";

export default function Page({ searchParams }: SearchParams) {
  const p = use(searchParams);
  return (
    <main className="flex h-[calc(100vh-var(--main-header-height))] flex-wrap overflow-y-auto lg:overflow-hidden">
      <section className="no-scrollbar h-auto flex-1 space-y-8 overflow-y-auto p-5 pb-10 lg:h-screen lg:pb-40">
        <Suspense fallback={<StatsSkeleton />}>
          <Stats />
        </Suspense>

        <Suspense fallback={<RevenueGraphSkeleton />}>
          <RenderRevenue {...p} />
        </Suspense>

        <section className="space-y-6 rounded-xl bg-white p-5">
          <article className="flex flex-wrap justify-between gap-3">
            <h4>Recent Mentor Application</h4>
            <Link
              href="/verifications"
              className="card hover:bg-secondary px-3 py-2 hover:text-white"
            >
              See All
            </Link>
          </article>
          <RecentMentorApplications />
        </section>
      </section>
      <aside className="border-grey-100 custom-scrollbar h-auto w-full space-y-10 overflow-y-auto border-l bg-white p-4 pb-40 lg:h-screen lg:w-[30%]">
        <Suspense
          fallback={
            <AppointmentsCalendarWrapper>
              <AppointmentSkeleton />
            </AppointmentsCalendarWrapper>
          }
        >
          <Appointments {...p} />
        </Suspense>

        <article className="space-y-4">
          <h4> Top Mentors</h4>

          <Suspense fallback={<TopMentorsSkeleton />}>
            <TopMentors />
          </Suspense>
        </article>
      </aside>
    </main>
  );
}
