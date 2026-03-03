"use client";
import { WarningIcon } from "@/components/logout/logout";
import Button from "@/components/ui/button";
import ActionModals from "@/components/ui/modals/actionModals";
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
import { PayoutWithdrawalType } from "@/types/payout";
import { handleError, handleSuccess } from "@/utils/helper";
import React, { useTransition } from "react";

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
    </>
  );
};
