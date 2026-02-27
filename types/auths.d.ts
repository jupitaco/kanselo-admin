import { PayoutType } from "./transactions";

export type ResetPassword = {
  email: string;
  code: string;
  password: string;
};

export type IUpdatePassword = {
  oldPassword: string;
  newPassword: string;
};

export type PasswordUpdate = {
  oldPassword: string;
  newPassword: string;
};

export type ApiResponse = {
  success: boolean;
  statusCode?: number;
  message: string;
};

export type SendOTP = {
  email: string;
};

export type VerifyOTP = {
  email?: string;
  code: string;
  phoneNumber?: string;
};

export type VerifyOTPResponse = ApiResponse;

export type SocialAuth = {
  thirdPartyUserId: string;
  provider: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  profileImageUrl: string;
};

export type SignUpType = {
  fullName: string;
  profilePhoto: string;
  email: string;
  country: string;
  state: string;
  city: string;
  phoneNumber: string;
  password: string;
};

export type Login = {
  email: string;
  password: string;
};

export type MentorAvailableHoursType = {
  available: boolean;
  slots: {
    start: string;
    end: string;
  }[];
};

export type AvailableHoursType = {
  monday: MentorAvailableHoursType;
  tuesday: MentorAvailableHoursType;
  wednesday: MentorAvailableHoursType;
  thursday: MentorAvailableHoursType;
  friday: MentorAvailableHoursType;
  saturday: MentorAvailableHoursType;
  sunday: MentorAvailableHoursType;
  _id: string;
};

export type UserData = {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  country: string;
  state: string;
  city: sring;
  profilePhoto: string;
  status: boolean;
  role: string;
  industries: string[];
  yearsOfExperience: number;
  bio: string;
  consultationTitle: string;
  consultationFee: number;
  isSuperAdmin: boolean;
  blocked: boolean;
  isSuspended: boolean;
  suspendedAt: string;
  admindeactivated: boolean;
  uniqueVerificationCode: string;
  passwordRetries: number;
  onBoardingStep: number;
  adminapproved: boolean;
  admindeclined: boolean;
  walletBalance: number;
  displayWalletBalance: boolean;
  goals: string[];
  availableHours: AvailableHoursType;
  payoutAccount: PayoutType;
  mentorApprovalStatus: string;
  totalBookings: number;
  totalTemplatesBought: number;
  totalTemplatesSold: number;
  averageRating: number;
  createdAt: string;
  updatedAt: string;
};

export type AuthResponse = ApiResponse & {
  data: { user: UserData } & AccessToken;
};

export type UserDataAndAccessToken = AccessToken & {
  user: UserData;
};

export type AccessToken = { token: string };

export type EncryptData = {
  userData: UserDataAndAccessToken;
  expires: Date;
};

export type UserSession = {
  userData: UserDataAndAccessToken;
  expires: Date;
  iat: number;
  exp: number;
};

export type RequestPasswordReset = {
  identifier: string;
};

export type AdminType = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export type CreateAdminType = {
  fullName: string;
  email: string;
  password: string;
  role: string;
};

export type AdminRsp = ApiResponse & {
  data: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    admins: UserData[];
  };
};
