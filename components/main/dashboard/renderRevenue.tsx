import React from "react";
import RevenueChart, { RevenueStats } from "./revenueChart";
import Field from "@/components/ui/field";
import { FaSquare } from "react-icons/fa6";
import { getDayXAgo } from "@/utils/helper";
import { getRevenueGraphByDateApi } from "@/services/apis/bookings.api";
import { ErrorUI } from "@/components/ui/emptyState";
import Skeleton from "@/components/ui/skeleton/skeleton";
import { SelectDateFilter } from "@/components/ui/dateFilter";
import { SearchPageParams } from "@/types/global";

export default async function RenderRevenue({
  startDate,
  endDate,
}: SearchPageParams) {
  const initStartDate = getDayXAgo(7);
  const initEndDate = new Date();

  const rsp = await getRevenueGraphByDateApi(
    startDate ? startDate : initStartDate?.toISOString(),
    endDate ? endDate : initEndDate?.toISOString(),
  );

  if (!rsp?.ok) {
    return <ErrorUI code={rsp?.body?.code} message={rsp?.body?.message} />;
  }

  const chartData = rsp?.body?.data;
  return (
    <section className="w-full overflow-hidden rounded-2xl bg-white p-5">
      <article className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <RevenueStats chartData={chartData} />

        <div className="flex flex-col items-end gap-3 text-xs font-medium">
          <div className="flex items-start justify-end gap-3 text-xs font-medium">
            <p className="flex items-center gap-2">
              <FaSquare className="text-primary" /> Consultation
            </p>
            <p className="flex items-center gap-2">
              <FaSquare className="text-secondary" /> Template
            </p>
          </div>
          <SelectDateFilter />
        </div>
      </article>

      <RevenueChart chartData={chartData} />
    </section>
  );
}

export const RevenueGraphSkeleton = () => {
  return (
    <section className="w-full space-y-5 overflow-hidden rounded-2xl bg-white p-5">
      <article className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-6">
          <h2>Revenue</h2>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Field
              label="Consultations"
              value={<Skeleton className="h-3! w-20" />}
            />
            <Field
              label="Templates"
              value={<Skeleton className="h-3! w-20" />}
            />
          </div>
        </div>
        <div className="flex flex-col items-end gap-3 text-xs font-medium">
          <div className="flex items-start justify-end gap-3 text-xs font-medium">
            <p className="flex items-center gap-2">
              <FaSquare className="text-primary" /> Consultation
            </p>
            <p className="flex items-center gap-2">
              <FaSquare className="text-secondary" /> Template
            </p>
          </div>
          <SelectDateFilter />
        </div>
      </article>

      <Skeleton className="h-60! w-full" />
    </section>
  );
};
