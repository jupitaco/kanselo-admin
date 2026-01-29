export type BookingStatus = "active" | "cancelled";

export type BookingType = {
  id: string;
  mentor: {
    name: string;
    avatar: string;
  };
  mentee: {
    name: string;
    avatar: string;
  };
  location: {
    city: string;
    country: string;
  };
  date: string;
  time: string;
  durationMinutes: number;
  sessions: string;
  review: string;
  status: BookingStatus;
  rating: number;
};

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