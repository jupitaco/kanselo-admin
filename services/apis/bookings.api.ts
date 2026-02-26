import { Api } from "./api";
import { ApiResponse, UserData } from "@/types/auths";
import { getUser } from "../session";
import {
  BookingRsp,
  BookingStatsRsp,
  BookingType,
  RevenueGraphRsp,
  TopMentorsRsp,
  UpcomingEventsRsp,
} from "@/types/booking";
import { queryBuilder } from "@/utils/helper";
import { MentorsRsp } from "@/types/users";

export const getAllBookingsApi = async ({
  page = "1",
  limit = "10",
  status,
}: {
  page?: string;
  limit?: string;
  status?: string;
}) => {
  return Api.get<BookingRsp>(
    `/booking/admin/all?${queryBuilder({ page, limit, status: String(status) })}`,
    true,
  );
};

export const getBookingByIdApi = async (bookingId: string) => {
  return Api.get<ApiResponse & { data: BookingType }>(
    `/booking/find-booking-by-id/${bookingId}`,
    true,
  );
};

export const getMentorByIdApi = (mentorId: string) => {
  return Api.get<ApiResponse & { data: UserData }>(
    `/booking/get-mentor-by-id/${mentorId}`,
    true,
  );
};

export const getAllStatsApi = () => {
  return Api.get<BookingStatsRsp>(
    `/booking/admin/analytics/summary-stats`,
    true,
  );
};

export const getTopMentorsApi = () => {
  return Api.get<TopMentorsRsp>(`/booking/admin/analytics/top-mentors`, true);
};

export const getAllUpcomingAppointments = ({ date }: { date: string }) => {
  return Api.get<UpcomingEventsRsp>(
    `/booking/admin/analytics/upcoming-bookings?${queryBuilder({ date })}`,
    true,
  );
};

export const getAllMentorRequestApi = ({
  status,
  page = "1",
  limit = "10",
}: {
  status: string;
  page?: string;
  limit?: string;
}) => {
  return Api.get<MentorsRsp>(
    `/user/admin/verification?${queryBuilder({ status, page, limit })}`,
    true,
  );
};

export const getRevenueGraphByDateApi = (
  startDate: string,
  endDate: string,
) => {
  return Api.get<RevenueGraphRsp>(
    `/booking/admin/analytics/revenue-graph?${queryBuilder({ startDate, endDate })}`,
    true,
  );
};
