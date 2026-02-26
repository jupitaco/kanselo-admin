"use client";

import { EmptyState, ErrorUI } from "@/components/ui/emptyState";
import { Calendar } from "@/components/ui/formInput/datePicker/calendar";
import Skeleton from "@/components/ui/skeleton/skeleton";
import { BookingType } from "@/types/booking";
import { formatDateToLocale } from "@/utils/helper";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { ReactNode, useTransition } from "react";

export const AppointmentsCalendarWrapper = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const selectedDate = searchParams.get("selectedDate") || "";

  const updatePath = (date: string) => {
    const params = new URLSearchParams(searchParams);

    if (date) {
      params.set("selectedDate", date);
    } else {
      params.set("selectedDate", formatDateToLocale(new Date()));
    }

    startTransition(() => {
      return replace(`${pathname}?${params}`);
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-lg font-bold">Upcoming Appointments</h1>

      {/* Calendar */}
      <article className="flex justify-center">
        <Calendar
          mode="single"
          selected={selectedDate ? new Date(selectedDate) : new Date()}
          onSelect={(date) => date && updatePath(formatDateToLocale(date))}
          className="w-full rounded-lg p-4"
        />
      </article>

      {isPending ? <AppointmentSkeleton /> : children}
    </div>
  );
};

export const AppointmentsCalendar = ({ data }: { data: BookingType[] }) => {
  return (
    <AppointmentsCalendarWrapper>
      <ul className="divide-Line space-y-4 divide-y">
        {data.map((appointment) => (
          <li key={appointment._id} className="card flex gap-1 overflow-hidden">
            <div className="bg-secondary min-h-full w-4" />
            <div className="group flex items-center gap-4 p-2">
              <div className="flex-1">
                <h5 className="text-xs! font-medium">
                  {appointment.mentorId?.bio}
                </h5>
                <p className="text-grey-300 text-xs">
                  {appointment.selectedTime} - {appointment.selectedEndTime}
                </p>
              </div>
              <div className="flex">
                <Image
                  src={appointment.mentorId?.profilePhoto}
                  alt={appointment.mentorId?.fullName}
                  className="rounded-xl border-3 border-white object-cover"
                  width={48}
                  height={48}
                />
                <Image
                  src={appointment.userId?.profilePhoto}
                  alt={appointment.userId?.fullName}
                  className="-translate-x-5 rounded-xl border-3 border-white object-cover shadow-md transition-transform ease-in-out group-hover:translate-x-0"
                  width={48}
                  height={48}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </AppointmentsCalendarWrapper>
  );
};

export const AppointmentErrorUI = ({
  body,
}: {
  body: { code: number; message: string };
}) => {
  return (
    <AppointmentsCalendarWrapper>
      <ErrorUI code={body?.code} message={body?.message} />
    </AppointmentsCalendarWrapper>
  );
};

export const AppointmentNoDataUI = () => {
  return (
    <AppointmentsCalendarWrapper>
      <EmptyState
        title="No Data"
        subTitle="No upcoming appointments"
        iconClassName="w-3/12!"
      />
    </AppointmentsCalendarWrapper>
  );
};

export const AppointmentSkeleton = () => {
  return (
    <ul className="divide-Line space-y-4 divide-y">
      {Array.from({ length: 6 }).map((_, idx) => (
        <li key={idx} className="flex items-center gap-4 pb-4">
          <Skeleton className="size-12! rounded-full!" />
          <div className="flex-1">
            <Skeleton className="h-4!" />
            <div className="flex items-center gap-3">
              <Skeleton className="h-3! w-10!" /> -{" "}
              <Skeleton className="h-3! w-10!" />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
