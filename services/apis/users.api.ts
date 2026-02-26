import { ApiResponse } from "@/types/auths";
import { Api } from "./api";
import { ApproveMentorType, DeclineMentorType } from "@/types/users";

export const blockUserByIdApi = (userId: string) => {
  return Api.patch<
    {
      approve: boolean;
      declineReason: string;
    },
    ApiResponse
  >(
    `/user/admin/block-user/${userId}`,
    {
      approve: true,
      declineReason: "Incomplete documentation",
    },
    true,
  );
};

export const unblockUserByIdApi = (userId: string) => {
  return Api.patch<
    {
      approve: boolean;
      declineReason: string;
    },
    ApiResponse
  >(
    `/user/admin/block-user/${userId}`,
    {
      approve: false,
      declineReason: "Incomplete documentation",
    },
    true,
  );
};

export const suspendUserByIdApi = (userId: string) => {
  return Api.patch<void, ApiResponse>(
    `/user/admin/users/${userId}/suspend`,
    undefined,
    true,
  );
};

export const unsuspendUserByIdApi = (userId: string) => {
  return Api.patch<void, ApiResponse>(
    `/user/admin/users/${userId}/unsuspend`,
    undefined,
    true,
  );
};

export const deleteUserByIdApi = (userId: string) => {
  return Api.delete<void, ApiResponse>(
    `/user/admin/users/${userId}`,
    undefined,
    true,
  );
};

export const approveMentorApi = (mentorId: string, body: ApproveMentorType) => {
  return Api.patch<ApproveMentorType, ApiResponse>(
    `/user/admin/verification/${mentorId}/approval`,
    body,
    true,
  );
};

export const declineMentorApi = (mentorId: string, body: DeclineMentorType) => {
  return Api.patch<DeclineMentorType, ApiResponse>(
    `/user/admin/verification/${mentorId}/approval`,
    body,
    true,
  );
};
