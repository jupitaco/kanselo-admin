"use server";

import { widthdrawalApi } from "@/services/apis/payout.api";
import { revalidatePath } from "next/cache";

export const widthdrawalAction = async (body: { amount: number }) => {
  try {
    const rsp = await widthdrawalApi(body);

    if (!rsp?.ok) {
      return {
        error: true,
        message: rsp?.body.message || "Something went wrong",
      };
    }

    revalidatePath("/payouts");
    return {
      error: false,
      message: rsp?.body.message || "Template created successfully",
    };
  } catch (err) {
    console.log(err);
    return {
      error: true,
      message: "Something went wrong",
    };
  }
};
