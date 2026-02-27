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

export type TransactionType = {
  _id: string;
  userId: UserData;
  type: string;
  category: string;
  amount: number;
  description: string;
  relatedUserId: UserData;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type TransactionRsp = ApiResponse & {
  data: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    transactions: TransactionType[];
  };
};
