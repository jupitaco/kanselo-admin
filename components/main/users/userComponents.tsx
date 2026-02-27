"use client";
import {
  admincolData,
  menteesColData,
  mentorsColData,
  recentBookingColData,
  recentMentorsColData,
  reviewColData,
  reviewsData,
  templateColData,
  templateData,
} from "@/mock";
import React from "react";
import TableComponent from "@/components/ui/tableComponent/tableComponent";
import { usePaginationContext } from "@/context/paginateContext";
import { EmptyState } from "@/components/ui/emptyState";
import { UserData } from "@/types/auths";
import TableSkeleton from "@/components/ui/tableComponent/tableSkeleton";
import TablePagination from "@/components/ui/tableComponent/tablePagination";
import Search from "@/components/ui/search";
import Skeleton from "@/components/ui/skeleton/skeleton";
import { BsStarFill } from "react-icons/bs";
import Button from "@/components/ui/button";
import { BookingType } from "@/types/booking";

export const RecentMentorApplicationTable = ({
  data,
}: {
  data: UserData[];
}) => {
  return (
    <>
      <TableComponent
        title="Mentors"
        columns={recentMentorsColData}
        data={data}
      />
    </>
  );
};

export const MentorsTable = () => {
  const { data, isPending } = usePaginationContext();
  if (data?.assets?.length === 0) {
    return <EmptyState title="No Data" subTitle="No admin data" />;
  }

  return (
    <>
      {isPending ? (
        <TableSkeleton />
      ) : (
        <TableComponent
          title="Mentors"
          columns={mentorsColData}
          data={data?.assets as UserData[]}
        />
      )}

      <TablePagination />
    </>
  );
};

export const MentorTemplateTable = () => {
  return (
    <TableComponent
      title="Mentor Templates"
      columns={templateColData}
      data={templateData}
    />
  );
};

export const MentorReviewsTable = () => {
  return (
    <TableComponent
      title="Mentor Reviews"
      columns={reviewColData}
      data={reviewsData}
    />
  );
};

export const MenteeConsultationTable = () => {
  const { data, isPending } = usePaginationContext();
  if (data?.assets?.length === 0) {
    return <EmptyState title="No Data" subTitle="No mentees data" />;
  }

  return (
    <>
      {isPending ? (
        <TableSkeleton />
      ) : (
        <TableComponent
          title="Booking & Scheduling"
          columns={recentBookingColData}
          data={data?.assets as BookingType[]}
        />
      )}
      <TablePagination />
    </>
  );
};

export const MenteesTable = () => {
  const { data, isPending } = usePaginationContext();
  if (data?.assets?.length === 0) {
    return <EmptyState title="No Data" subTitle="No mentees data" />;
  }

  return (
    <>
      {isPending ? (
        <TableSkeleton />
      ) : (
        <TableComponent
          title="Mentees"
          columns={menteesColData}
          data={data?.assets as UserData[]}
        />
      )}

      <TablePagination />
    </>
  );
};

export const AdminTable = () => {
  const { data, isPending } = usePaginationContext();
  if (data?.assets?.length === 0) {
    return <EmptyState title="No Data" subTitle="No admin data" />;
  }

  return (
    <>
      {isPending ? (
        <TableSkeleton />
      ) : (
        <TableComponent
          title="Administrators"
          columns={admincolData}
          data={data?.assets as UserData[]}
        />
      )}

      <TablePagination />
    </>
  );
};

export const UserHeader = ({ pageTitle }: { pageTitle: string }) => {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4">
      <h4 className="font-semibold">All {pageTitle}</h4>
      <Search placeholder="Search" className="max-w-fit!" />
    </header>
  );
};

export function UserInfoSkeleton({ userType }: { userType: string }) {
  return (
    <section className="min-h-5/6 w-full space-y-8 rounded-xl bg-white p-4 lg:w-4/12">
      <div className="border-grey-200 space-y-3 overflow-hidden rounded-xl border bg-white">
        <Skeleton className="h-60!" />

        <div className="space-y-2 p-4">
          <Skeleton className="h-4! w-20!" />
          <Skeleton className="h-4! w-40!" />
        </div>
      </div>

      <ul className="space-y-6">
        <li className="space-y-3">
          <h5 className="font-semibold">Bio</h5>
          <Skeleton className="h-4! w-40!" />
          <Skeleton className="h-4! w-40!" />
        </li>
        <li className="space-y-1">
          <h5 className="flex items-center gap-1">
            $<Skeleton className="h-4! w-20!" />
          </h5>
          <p className="text-grey-400 text-xs font-medium">per session</p>
        </li>
        <li className="flex items-center justify-between gap-3">
          <h5 className="font-semibold">Consultations</h5>
          <Skeleton className="h-4! w-40!" />
        </li>
        <li className="flex items-center justify-between gap-3">
          <h5 className="font-semibold">Rating</h5>
          <h5 className="flex items-center gap-1 font-semibold">
            <BsStarFill className="rated" />
            <Skeleton className="h-4! w-6!" />
          </h5>
        </li>
      </ul>

      <Skeleton className="h-10!" />

      <div className="space-y-3">
        <Button className="alt-btn w-full">Suspend {userType}</Button>
        <Button className="outline-btn border-error! text-error! w-full">
          Delete {userType}
        </Button>
      </div>
    </section>
  );
}
