"use client";
import Button from "@/components/ui/button";
import CopyToClipboardBtn from "@/components/ui/copyToClipboardBtn";
import { EmptyState } from "@/components/ui/emptyState";
import Field from "@/components/ui/field";
import { DialogClose, DialogFooter } from "@/components/ui/modals/dialog";
import ModalWrapper from "@/components/ui/modals/modalWrapper";
import { OrderStatus } from "@/components/ui/tableComponent/tabelComps";
import TableComponent from "@/components/ui/tableComponent/tableComponent";
import TablePagination from "@/components/ui/tableComponent/tablePagination";
import TableSkeleton from "@/components/ui/tableComponent/tableSkeleton";
import { useModalContext } from "@/context/modalContext";
import { usePaginationContext } from "@/context/paginateContext";
import { transactioncolData } from "@/mock";
import { TransactionType } from "@/types/users";
import { formatDate, formatNumInThousands, formatTime } from "@/utils/helper";
import React from "react";
import { FaEye } from "react-icons/fa6";

export const TransactionTable = () => {
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
          columns={transactioncolData}
          data={data?.assets as TransactionType[]}
        />
      )}

      <TablePagination />
    </>
  );
};

export const TransactionAction = ({ data }: { data: TransactionType }) => {
  const { isOpen, openModal } = useModalContext();

  const transId = data?._id;

  return (
    <>
      <Button
        onClick={() => openModal(transId)}
        className="outline-btn bg-grey-100 min-h-[35px]"
      >
        <FaEye /> View
      </Button>

      {isOpen[transId] && (
        <ModalWrapper
          id={transId}
          title="Transaction Details"
          titleClass="text-center text-xl! font-semibold"
        >
          <ul className="grid grid-cols-1 justify-between gap-4 md:grid-cols-2">
            <li>
              <Field
                label="Transaction Type"
                value={data?.type}
                className="flex flex-col-reverse"
                valueClassName="text-grey-500"
              />
            </li>
            <li>
              <Field
                label="Amount"
                value={
                  <>
                    {data?.type === "withdrawl" ? "-" : "+"}$
                    {formatNumInThousands(data?.amount)}
                  </>
                }
                className="flex flex-col-reverse"
                valueClassName="text-grey-500"
              />
            </li>
            <li>
              <Field
                label="Status"
                value={<OrderStatus status={data?.status} />}
                className="flex flex-col-reverse"
                labelClassName="mt-1"
              />
            </li>
            <li>
              <Field
                label="Date & Time"
                value={
                  <p className="text-500 text-sm">
                    {formatDate(new Date(data?.createdAt))}{" "}
                    {formatTime(data?.createdAt)}
                  </p>
                }
                className="flex flex-col-reverse"
              />
            </li>
            <li>
              <Field
                label="Name"
                value={data?.userId?.fullName}
                className="flex flex-col-reverse"
              />
            </li>
            <li>
              <Field
                label="Transaction ID"
                value={
                  <small className="flex items-center gap-2">
                    {data?._id?.slice(0, 10)}{" "}
                    <CopyToClipboardBtn
                      id={data?._id}
                      valueToCopy={data?._id}
                    />
                  </small>
                }
                className="flex flex-col-reverse"
              />
            </li>
          </ul>

          <DialogFooter className="mt-10! justify-center!">
            <DialogClose asChild>
              <Button className="outline-btn">Close</Button>
            </DialogClose>
          </DialogFooter>
        </ModalWrapper>
      )}
    </>
  );
};
