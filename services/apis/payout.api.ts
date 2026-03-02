import { Api } from "./api";
import { PayoutRsp } from "@/types/payout";
import { queryBuilder } from "@/utils/helper";

export const getAllPayoutReqApi = ({
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

export const approvePayoutReqApi = (payoutId: string) => {
  return Api.patch<void, PayoutRsp>(
    `/payouts/admin/${payoutId}/approve`,
    undefined,
    true,
  );
};
