import { ApiResponse, UserData } from "@/types/auths";
import { Api } from "./api";
import {
  ApproveMentorType,
  DeclineMentorType,
  MenteesRsp,
  MentorsRsp,
  TransactionRsp,
} from "@/types/users";
import { queryBuilder } from "@/utils/helper";
import { BookingRsp } from "@/types/booking";
import { ReviewRsp, TemplatesRsp } from "@/types/template";

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

export const toggleUserAccessByIdApi = (
  userId: string,
  isSuspended: boolean,
) => {
  return Api.patch<void, ApiResponse>(
    `/user/admin/users/${userId}/${isSuspended ? "unsuspend" : "suspend"}`,
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

export const getAllMentees = ({
  page = "1",
  limit = "10",
  search,
}: {
  page?: string;
  limit?: string;
  search?: string;
}) => {
  return Api.get<MenteesRsp>(
    `/booking/admin/users/mentees?${queryBuilder({ page, limit, search: String(search) })}`,
    true,
  );
};

export const getMenteeById = (menteeId: string) => {
  return Api.get<ApiResponse & { data: UserData }>(
    `/booking/admin/users/mentees/${menteeId}`,
    true,
  );
};

export const getAllMenteeBookingsApi = async ({
  page = "1",
  limit = "10",
  menteeId,
}: {
  page?: string;
  limit?: string;
  menteeId: string;
}) => {
  return Api.get<BookingRsp>(
    `/booking/user/${menteeId}?${queryBuilder({ page, limit })}`,
    true,
  );
};

export const getAllMentors = ({
  page = "1",
  limit = "10",
  search,
}: {
  page?: string;
  limit?: string;
  search?: string;
}) => {
  return Api.get<MentorsRsp>(
    `/booking/admin/users/mentors?${queryBuilder({ page, limit, search: String(search) })}`,
    true,
  );
};

export const getMentorTemplatesApi = async (
  mentorId: string,
  page = "1",
  limit = "5",
) => {
  return Api.get<TemplatesRsp>(
    `/templates/user/${mentorId}?${queryBuilder({ page, limit })}`,
    true,
  );
};

export const getMentorReviewsApi = async (
  mentorId: string,
  page = "1",
  limit = "20",
) => {
  return Api.get<ReviewRsp>(
    `/ratings/mentor/${mentorId}?${queryBuilder({ page, limit })}`,
    true,
  );
};

export const getAllTransaction = ({
  page = "1",
  limit = "10",
  search,
}: {
  page?: string;
  limit?: string;
  search?: string;
}) => {
  return Api.get<TransactionRsp>(
    `/transactions/admin/all?${queryBuilder({ page, limit, search: String(search) })}`,
    true,
  );
};
