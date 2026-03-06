"use client";
import { WarningIcon } from "@/components/logout/logout";
import Button from "@/components/ui/button";
import CopyToClipboardBtn from "@/components/ui/copyToClipboardBtn";
import Field from "@/components/ui/field";
import ActionModals from "@/components/ui/modals/actionModals";
import ModalWrapper from "@/components/ui/modals/modalWrapper";
import Spinner from "@/components/ui/spinner";
import { OrderStatus } from "@/components/ui/tableComponent/tabelComps";
import TableComponent from "@/components/ui/tableComponent/tableComponent";
import TablePagination from "@/components/ui/tableComponent/tablePagination";
import TableSkeleton from "@/components/ui/tableComponent/tableSkeleton";
import { useModalContext } from "@/context/modalContext";
import { usePaginationContext } from "@/context/paginateContext";
import {
  approvePayyoutReqAction,
  declinePayoutReqAction,
} from "@/libs/actions/payout.actions";
import { payoutColData } from "@/mock";
import { UserData } from "@/types/auths";
import { PayoutWithdrawalType } from "@/types/payout";
import {
  formatDate,
  formatNumInThousands,
  formatTime,
  handleError,
  handleSuccess,
} from "@/utils/helper";
import { useQuery } from "@tanstack/react-query";
import React, { useTransition } from "react";

export type QueryResponse = {
  status: number;
  data: { _id: string; userId: UserData };
};

const getPayoutById = async (id: string) => {
  const rsp = await fetch(`/api/payout/${id}`);
  const result = await rsp.json();

  console.log("rsp>>>", result);

  if ("error" in result) {
    throw new Error(result.error);
  }

  return result?.data as QueryResponse;
};

export const PayoutTable = () => {
  const { data, isPending } = usePaginationContext();

  return (
    <>
      {isPending ? (
        <TableSkeleton columns={6} />
      ) : (
        <TableComponent
          title="Payouts"
          columns={payoutColData}
          data={data?.assets as PayoutWithdrawalType[]}
          containerClassName="!p-0"
        />
      )}

      <TablePagination />
    </>
  );
};

export const PayoutAction = ({ data }: { data: PayoutWithdrawalType }) => {
  const { isOpen, openModal, closeModal } = useModalContext();
  const [isPending, startTransition] = useTransition();

  const handleApprovePayout = () => {
    startTransition(async () => {
      const rsp = await approvePayyoutReqAction(data?._id);

      if (rsp?.error) {
        handleError(rsp?.message);
      } else {
        handleSuccess(rsp?.message);
        closeModal(`approve-${data?._id}`);
      }
    });
  };

  const handleDeclinePayout = () => {
    startTransition(async () => {
      const rsp = await declinePayoutReqAction(data?._id);

      if (rsp?.error) {
        handleError(rsp?.message);
      } else {
        handleSuccess(rsp?.message);
        closeModal(`decline-${data?._id}`);
      }
    });
  };

  return (
    <>
      {!["completed", "failed"]?.includes(data?.status?.toLowerCase()) && (
        <div className="flex items-center gap-3">
          <Button
            className="outline-btn w-fit"
            onClick={() => openModal(`view-${data?._id}`)}
          >
            View
          </Button>
          <Button
            className="pry-btn w-fit"
            onClick={() => openModal(`approve-${data?._id}`)}
          >
            Approve
          </Button>
          <Button
            className="alt-btn w-fit"
            onClick={() => openModal(`decline-${data?._id}`)}
          >
            Decline
          </Button>
        </div>
      )}

      {isOpen[`approve-${data?._id}`] && (
        <ActionModals
          icon={<WarningIcon />}
          id={`approve-${data?._id}`}
          title="Approve Payout"
          subTitle={`Are you sure you want to approve this payout?`}
          subtitleClass="text-grey-300!"
          actionTitle={`Yes, Approve`}
          closeTitle="No, Cancel"
          btnSecClass="outline-btn"
          action={handleApprovePayout}
          loading={isPending}
        />
      )}

      {isOpen[`decline-${data?._id}`] && (
        <ActionModals
          icon={<WarningIcon />}
          id={`decline-${data?._id}`}
          title="Decline Payout"
          subTitle={`Are you sure you want to decline this payout?`}
          subtitleClass="text-grey-300!"
          actionTitle={`Yes, Decline`}
          closeTitle="No, Cancel"
          btnSecClass="outline-btn"
          action={handleDeclinePayout}
          loading={isPending}
        />
      )}

      {isOpen[`view-${data?._id}`] && <ViewPayout data={data} />}
    </>
  );
};

const ViewPayout = ({ data }: { data: PayoutWithdrawalType }) => {
  const payoutId = data?._id;

  const { data: rspData, isLoading } = useQuery({
    queryKey: ["mentor", payoutId],
    queryFn: () => getPayoutById(payoutId),
    enabled: !!payoutId,
  });

  if (isLoading) {
    return (
      <ModalWrapper
        id={`view-${payoutId}`}
        title="Transaction Details"
        titleClass="text-center text-xl! font-semibold"
        wrapperClass="min-h-[70vh] "
      >
        <div className="grid place-items-center">
          <Spinner />
        </div>
      </ModalWrapper>
    );
  }

  const accountDeets = rspData?.data?.userId?.payoutAccount;
  console.log(accountDeets);
  return (
    <ModalWrapper
      id={`view-${payoutId}`}
      title="Payout request Details"
      titleClass="text-center text-xl! font-semibold"
    >
      <div>
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
                  {"-"}${formatNumInThousands(data?.amount)}
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
              value={rspData?.data?.userId?.fullName}
              className="flex flex-col-reverse"
            />
          </li>
          <li>
            <Field
              label="Transaction ID"
              value={
                <small className="flex items-center gap-2">
                  {data?._id?.slice(0, 10)}{" "}
                  <CopyToClipboardBtn id={data?._id} valueToCopy={data?._id} />
                </small>
              }
              className="flex flex-col-reverse"
            />
          </li>
        </ul>
        <div className="mt-5 space-y-4">
          <p className="border-Line border-b pb-2 font-bold">
            Mentor Bank Details
          </p>
          <ul className="space-y-4">
            <li>
              <Field
                label="Bank Name"
                value={accountDeets?.bankName}
                className="flex flex-col-reverse"
              />
            </li>
            <li>
              <Field
                label="Account Number"
                value={accountDeets?.accountName}
                className="flex flex-col-reverse"
              />
            </li>
            <li>
              <Field
                label="Accoun Name"
                value={accountDeets?.accountNumber}
                className="flex flex-col-reverse"
              />
            </li>
          </ul>
        </div>
      </div>
    </ModalWrapper>
  );
};
