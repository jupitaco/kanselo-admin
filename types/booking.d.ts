import { ApiResponse, UserData } from "./auths";

export type BookingStatus = "active" | "cancelled";

export type DayOfWeek =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type TimeRange = {
  startTime: string;
  endTime: string;
};

export type OfficeDay = {
  title: string;
  checked: boolean;
  time: TimeRange[];
};

export type BookingStatsType = {
  value: number;
  percentageChange: number;
  trend: "increase" | "decrease";
};

export type BookingStatsRsp = ApiResponse & {
  data: {
    totalConsultations: BookingStatsType;
    totalTemplates: BookingStatsType;
    totalRevenue: BookingStatsType;
  };
};

export type RevenueGraphType = {
  date: string;
  bookingRevenue: number;
  templateRevenue: number;
  totalRevenue: number;
};

export type RevenueGraphRsp = ApiResponse & {
  data: RevenueGraphType[];
};

export type BookedMentorType = {
  _id: string;
  fullName: string;
  profilePhoto: string;
  city: string;
  state: string;
  country: string;
  bio: string;
};

export type BookedMenteeType = {
  _id: string;
  fullName: string;
  profilePhoto: string;
  city: string;
  state: string;
  country: string;
};

export type BookingType = {
  _id: string;
  userId: BookedMenteeType;
  mentorId: BookedMentorType;
  message: string;
  session: number;
  selectedDate: string;
  selectedTime: string;
  selectedEndTime: string;
  status: string;
  ratings: number;
  totalAmountPaid: number;
  createdAt: string;
  updatedAt: string;
};

export type UpcomingEventsRsp = ApiResponse & {
  data: BookingType[];
};

export type TopMentorType = { bookingCount: number; mentor: UserData };
export type TopMentorsRsp = ApiResponse & {
  data: TopMentorType[];
};

export type BookingRsp = ApiResponse & {
  data: {
    bookings: BookingType[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};
