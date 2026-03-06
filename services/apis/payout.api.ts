import { ApiResponse, UserData } from "@/types/auths";
import { Api } from "./api";
import { PayoutRsp } from "@/types/payout";
import { queryBuilder } from "@/utils/helper";

export const getAllPayoutsReqApi = ({
  page = "1",
  limit = "10",
  status,
}: {
  page?: string;
  limit?: string;
  status?: string;
}) => {
  return Api.get<PayoutRsp>(
    `/payouts/admin/all?${queryBuilder({ page, limit, status: String(status) })}`,
    true,
  );
};

export const getPayoutReqByIdApi = (mentorId: string) => {
  return Api.get<ApiResponse & { data: { _id: string; userId: UserData } }>(
    `/payouts/get-withdrawal/for-mentor/${mentorId}`,
    true,
  );
};

export const approvePayoutReqApi = (payoutId: string) => {
  return Api.patch<void, PayoutRsp>(
    `/payouts/admin/${payoutId}/approve`,
    undefined,
    true,
  );
};

export const declinePayoutReqApi = (payoutId: string) => {
  return Api.patch<void, PayoutRsp>(
    `/payouts/admin/${payoutId}/decline`,
    undefined,
    true,
  );
};
