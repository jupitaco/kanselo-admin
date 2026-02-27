import { ApiResponse } from "./auths";
import { BookedMenteeType, BookedMentorType } from "./booking";

export type TemplateType = {
  _id: string;
  userId: string;
  price: number;
  title: string;
  coverImage: string;
  fileUrl: string;
  fileSize: string;
  totalSold: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateTemplateType = {
  price: number;
  title: string;
  coverImage: string;
  fileUrl: string;
  fileSize: string;
};

export type TemplateStatType = {
  thisWeek: number;
  lastWeek: number;
  percentageChange: number;
};

export type TemplateStatRsp = ApiResponse & {
  data: {
    totalTemplates: number;
    totalSales: number;
    totalIncome: number;
    weeklyComparison: {
      templates: TemplateStatType;
      sales: TemplateStatType;
      income: TemplateStatType;
    };
  };
};

export type TemplatesRsp = ApiResponse & {
  data: {
    page: 1;
    limit: 10;
    total: 3;
    totalPages: 1;
    templates: TemplateType[];
  };
};

export type TemplateRsp = ApiResponse & {
  data: TemplateType;
};

export type ReviewType = {
  _id: string;
  userId: BookedMenteeType;
  mentorId: BookedMentorType;
  bookingId: string;
  ratingText: string;
  stars: number;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type ReviewRsp = ApiResponse & {
  data: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    ratings: ReviewType[];
  };
};
