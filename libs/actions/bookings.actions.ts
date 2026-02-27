"use server";

import { manageMentorRequestApi } from "@/services/apis/bookings.api";
import { ManageMentorReqType } from "@/types/booking";
import { revalidatePath } from "next/cache";

export const manageMentorRequestAction = async (
  mentorId: string,
  body: ManageMentorReqType,
) => {
  try {
    const rsp = await manageMentorRequestApi(mentorId, body);

    if (!rsp.ok) {
      return {
        error: true,
        message: rsp?.body?.message || "Something went wrong",
      };
    }

    revalidatePath("/dashboard");
    revalidatePath("/verifications");

    return {
      error: false,
      message: rsp?.body?.message || "Session cancelled successfully",
    };
  } catch (error) {
    console.log(error);

    return {
      error: true,
      message: "Something went wrong",
    };
  }
};
