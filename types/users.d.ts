import { ApiResponse, UserData } from "./auths";

export type MenteesRsp = ApiResponse & {
  data: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    mentees: UserData[];
  };
};

export type MenteeByIdRsp = ApiResponse & {
  data: UserData;
};

export type MentorsRsp = ApiResponse & {
  data: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    mentors: UserData[];
  };
};

export type MentorByIdRsp = ApiResponse & {
  data: UserData;
};

export type ApproveMentorType = {
  status: string;
};

export type DeclineMentorType = {
  status: string;
  declineReason: string;
  canReapplyAsMentor: boolean;
};
