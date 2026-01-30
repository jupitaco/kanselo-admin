"use client";
import Button from "@/components/ui/button";
import TableComponent from "@/components/ui/tableComponent/tableComponent";
import { transactionAssets, transactionolData } from "@/mock";
import { TransactionType } from "@/types/payout";
import React from "react";
import { FaEye } from "react-icons/fa6";

export const TransactionTable = () => {
  return (
    <section>
      <TableComponent
        title="Transactions"
        columns={transactionolData}
        data={transactionAssets}
      />
    </section>
  );
};


export const TransactionAction = ({ data }: { data: TransactionType }) => {
  return (
    <Button className='outline-btn bg-grey-100 min-h-[35px] px-3!'> <FaEye /> View</Button>
  )
}