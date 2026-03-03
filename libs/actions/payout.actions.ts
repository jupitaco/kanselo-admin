"use server";

import {
  approvePayoutReqApi,
  declinePayoutReqApi,
} from "@/services/apis/payout.api";
import { revalidatePath } from "next/cache";

export const approvePayyoutReqAction = async (payoutId: string) => {
  try {
    const rsp = await approvePayoutReqApi(payoutId);

    if (!rsp?.ok) {
      return {
        error: true,
        message: rsp?.body.message || "Something went wrong",
      };
    }

    revalidatePath("/payouts");
    return {
      error: false,
      message: rsp?.body.message || "Payout approved successfully",
    };
  } catch (err) {
    console.log(err);
    return {
      error: true,
      message: "Something went wrong",
    };
  }
};

export const declinePayoutReqAction = async (payoutId: string) => {
  try {
    const rsp = await declinePayoutReqApi(payoutId);

    if (!rsp?.ok) {
      return {
        error: true,
        message: rsp?.body.message || "Something went wrong",
      };
    }

    revalidatePath("/payouts");
    return {
      error: false,
      message: rsp?.body.message || "Payout declined successfully",
    };
  } catch (err) {
    console.log(err);
    return {
      error: true,
      message: "Something went wrong",
    };
  }
};
