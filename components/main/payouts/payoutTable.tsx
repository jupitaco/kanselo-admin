"use client";
import { WarningIcon } from "@/components/logout/logout";
import Button from "@/components/ui/button";
import ActionModals from "@/components/ui/modals/actionModals";
import TableComponent from "@/components/ui/tableComponent/tableComponent";
import TablePagination from "@/components/ui/tableComponent/tablePagination";
import TableSkeleton from "@/components/ui/tableComponent/tableSkeleton";
import { useModalContext } from "@/context/modalContext";
import { usePaginationContext } from "@/context/paginateContext";
import { approvePayyoutReqAction } from "@/libs/actions/payout.actions";
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

  return (
    <>
      <Button
        className="pry-btn w-full"
        onClick={() => openModal(`approve-${data?._id}`)}
      >
        Approve
      </Button>

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
    </>
  );
};
