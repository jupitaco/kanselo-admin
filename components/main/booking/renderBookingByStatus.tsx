import BookingTable from "./bookingTable";
import { tabData } from "@/app/(main)/appointments/page";
import Link from "next/link";
import Search from "@/components/ui/search";
import { SearchPageParams } from "@/types/global";
import { getAllBookingsApi } from "@/services/apis/bookings.api";
import PageLayout from "../pageLayout";
import { ErrorUI } from "@/components/ui/emptyState";

export default async function RenderBookingByStatus({
  searchParams,
}: {
  searchParams: SearchPageParams;
}) {
  const activeTab = searchParams?.tab || "pending";

  const rsp = await getAllBookingsApi({
    status: searchParams?.tab?.toUpperCase() || "NEW",
    page: searchParams?.page || "1",
  });

  if (!rsp?.ok) {
    return (
      <PageLayout headerChildren={<BookingHeader activeTab={activeTab} />}>
        <ErrorUI code={rsp?.body?.code} message={rsp?.body?.message} />
      </PageLayout>
    );
  }

  const { bookings, page, limit, total } = rsp?.body?.data;

  const bookingData = {
    page,
    total,
    limit,
    assets: bookings,
  };

  return (
    <PageLayout
      headerChildren={<BookingHeader activeTab={activeTab} />}
      data={bookingData}
    >
      <BookingTable />
    </PageLayout>
  );
}

export const BookingHeader = ({ activeTab }: { activeTab: string }) => {
  return (
    <header className="grid grid-cols-1 items-center justify-between gap-4 lg:grid-cols-3">
      <article className="space-y-2 capitalize">
        <h4>{activeTab === "pending" ? "New" : activeTab} appointments</h4>
      </article>

      <ul className="card flex min-h-10 w-full items-center justify-between gap-1 p-1 lg:w-fit">
        {tabData.map(({ label, path }, idx) => (
          <li key={idx}>
            <Link
              href={`/appointments?tab=${path}`}
              className={`text-xs font-medium ${activeTab === path ? "bg-primary rounded-lg text-white" : ""} px-4 py-2 md:px-7`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex justify-end">
        <Search placeholder="Search" className="max-w-fit" />
      </div>
    </header>
  );
};
