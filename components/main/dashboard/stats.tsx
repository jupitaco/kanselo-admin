import Skeleton from "@/components/ui/skeleton/skeleton";
import {
  ConsultationIcon,
  IncomeIcon,
  TemplatesIcon,
} from "@/public/svgs/svgs";
import { getAllStatsApi } from "@/services/apis/bookings.api";
import { BookingStatsRsp } from "@/types/booking";
import { formatNumInThousands } from "@/utils/helper";

export const Welcome = () => {
  return (
    <article className="space-y-3">
      <h3 className="font-bold">Welcome, Richard Hederson</h3>
      <p className="text-grey-400 font-medium">Consultations made simple</p>
    </article>
  );
};

export const Stats = async () => {
  const rsp = await getAllStatsApi();

  const statsData = rsp?.ok ? rsp?.body?.data : ({} as BookingStatsRsp["data"]);
  return (
    <ul className="grid grid-cols-1 items-center gap-4 rounded-xl bg-white p-5 lg:grid-cols-3">
      <li className="flex items-center gap-2">
        <ConsultationIcon />
        <div className="space-y-3">
          <small className="text-grey-300">Total Consultations</small>
          <h4 className="font-semibold">
            {statsData?.totalConsultations?.value}
          </h4>
        </div>
      </li>
      <li className="flex items-center gap-2">
        <TemplatesIcon />
        <div className="space-y-3">
          <small className="text-grey-300">Total Templates</small>
          <h4 className="font-semibold">
            ${formatNumInThousands(statsData?.totalTemplates?.value)}
          </h4>
        </div>
      </li>
      <li className="flex items-center gap-2">
        <IncomeIcon />
        <div className="space-y-3">
          <small className="text-grey-300">Total Income</small>
          <h4 className="font-semibold">
            ${formatNumInThousands(statsData?.totalRevenue?.value)}
          </h4>
        </div>
      </li>
    </ul>
  );
};

export const StatsSkeleton = () => {
  return (
    <ul className="grid grid-cols-1 items-center gap-4 rounded-xl bg-white p-5 lg:grid-cols-3">
      <li className="flex items-center gap-2">
        <ConsultationIcon />
        <div className="space-y-3">
          <small className="text-grey-300">Total Consultations</small>
          <Skeleton className="h-4!" />
        </div>
      </li>
      <li className="flex items-center gap-2">
        <TemplatesIcon />
        <div className="space-y-3">
          <small className="text-grey-300">Total Income</small>
          <h4 className="flex items-center gap-4 font-semibold">
            $<Skeleton className="h-4! w-20!" />
          </h4>
        </div>
      </li>
      <li className="flex items-center gap-2">
        <IncomeIcon />
        <div className="space-y-3">
          <small className="text-grey-300">Total Income</small>
          <h4 className="flex items-center gap-4 font-semibold">
            $<Skeleton className="h-4! w-20!" />
          </h4>
        </div>
      </li>
    </ul>
  );
};
