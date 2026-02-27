import { ErrorUI } from "@/components/ui/emptyState";
import Skeleton from "@/components/ui/skeleton/skeleton";
import { allImages } from "@/public/images/images";
import { getTopMentorsApi } from "@/services/apis/bookings.api";
import Image from "next/image";
import Link from "next/link";

export const TopMentors = async () => {
  const rsp = await getTopMentorsApi();

  if (!rsp?.ok) {
    return <ErrorUI code={rsp?.body?.code} message={rsp?.body?.message} />;
  }

  const data = rsp?.body?.data;

  return (
    <ul className="divide-Line space-y-3 divide-y">
      {data.map(({ mentor, bookingCount }, idx) => (
        <li key={idx}>
          <Link
            href={`mentors/view/${mentor?._id}?mentorName=${encodeURIComponent(mentor?.fullName)}`}
            className="flex items-center gap-3 pb-2"
          >
            <Image
              src={mentor?.profilePhoto || allImages.noAvatar}
              alt={mentor?.fullName}
              className="rounded-xl border-3 border-white object-cover"
              width={48}
              height={48}
            />

            <div>
              <p className="font-medium">{mentor?.fullName}</p>
              <small className="text-grey-300">
                {bookingCount} Consultations
              </small>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export const TopMentorsSkeleton = async () => {
  return (
    <ul className="divide-Line space-y-3 divide-y">
      {Array.from({ length: 7 }).map((_, idx) => (
        <li key={idx} className="flex items-center gap-3 pb-2">
          <Skeleton className="size-12! rounded-xl border-3 border-white object-cover" />
          <div>
            <Skeleton className="h-3! w-20!" />
            <small className="text-grey-300 flex items-center gap-3">
              <Skeleton className="h-3!" /> Consultations
            </small>
          </div>
        </li>
      ))}
    </ul>
  );
};
