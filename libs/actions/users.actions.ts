"use server";

import {
  deleteUserByIdApi,
  toggleUserAccessByIdApi,
} from "@/services/apis/users.api";
import { revalidatePath } from "next/cache";

export const toggleUserAccessAction = async (
  userId: string,
  isSuspended: boolean,
  path: string,
) => {
  try {
    const rsp = await toggleUserAccessByIdApi(userId, isSuspended);

    if (!rsp?.ok) {
      return {
        error: true,
        message: rsp?.body.message || "Something went wrong",
      };
    }

    revalidatePath(path);
    return {
      error: false,
      message: rsp?.body.message || "User access updated successfully",
    };
  } catch (err) {
    console.log(err);
    return {
      error: true,
      message: "Something went wrong",
    };
  }
};

export const deleteUserAction = async (userId: string, path: string) => {
  try {
    const rsp = await deleteUserByIdApi(userId);

    if (!rsp?.ok) {
      return {
        error: true,
        message: rsp?.body.message || "Something went wrong",
      };
    }

    revalidatePath(path);
    return {
      error: false,
      message: rsp?.body.message || "User deleted successfully",
    };
  } catch (err) {
    console.log(err);
    return {
      error: true,
      message: "Something went wrong",
    };
  }
};
