"use client";
import {
  admincolData,
  bookingAssets,
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
  return (
    <TableComponent
      title="Booking & Scheduling"
      columns={recentBookingColData}
      data={bookingAssets}
    />
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
