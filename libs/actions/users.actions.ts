"use server";

import { createTemplatesApi } from "@/services/apis/template.api";
import { deleteUserByIdApi } from "@/services/apis/users.api";
import { CreateTemplateType } from "@/types/template";
import { revalidatePath } from "next/cache";

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
