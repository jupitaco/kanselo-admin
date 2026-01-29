import { Appointments } from "@/components/main/dashboard/appointments";
import RecentMentorApplications from "@/components/main/dashboard/recentMentorApplications";
import RenderRevenue from "@/components/main/dashboard/renderRevenue";
import { Stats } from "@/components/main/dashboard/stats";
import { Welcome } from "@/components/main/dashboard/welcome";
import Link from "next/link";

export default function Page() {
  return (
    <main className="flex h-[calc(100vh-var(--main-header-height))] flex-wrap overflow-y-auto lg:overflow-hidden">
      <section className="no-scrollbar h-auto flex-1 space-y-8 overflow-y-auto p-5 pb-10 lg:h-screen lg:pb-40">
        <Welcome />
        <Stats />

        <RenderRevenue />

        <section className="space-y-6 rounded-xl bg-white p-5">
          <article className="flex flex-wrap justify-between gap-3">
            <h4>Recent Mentor Application</h4>
            <Link href='/verifications' className="px-3 py-2 card hover:bg-secondary hover:text-white">
              See All
            </Link>
          </article>
          <RecentMentorApplications />
        </section>
      </section>

      <Appointments />
    </main>
  );
}
