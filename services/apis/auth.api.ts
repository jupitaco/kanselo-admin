import {
  AdminRsp,
  ApiResponse,
  AuthResponse,
  CreateAdminType,
  Login,
  PasswordUpdate,
  ResetPassword,
  UserData,
  VerifyOTP,
  VerifyOTPResponse,
} from "@/types/auths";
import { Api } from "./api";
import { getUser } from "../session";
import { queryBuilder } from "@/utils/helper";

export const signinApi = (body: Login) => {
  return Api.post<Login, AuthResponse>("/user/admin/login", body);
};

export const verifyEmailApi = (body: VerifyOTP) => {
  return Api.post<VerifyOTP, VerifyOTPResponse>(
    "/user/verify/email-or-phone",
    body,
  );
};

export const resendOTPApi = (email: string) => {
  return Api.post<void, VerifyOTPResponse>(`/user/resend-otp?email=${email}`);
};

export const updateUserApi = async (body: UserData) => {
  const session = await getUser();
  return Api.patch<UserData, AuthResponse>(
    `/user/${session?._id}/profile`,
    body,
    true,
  );
};

export const getCurrentUserApi = async () => {
  const session = await getUser();
  return Api.get<{ data: UserData }>(`/user/user-id/${session?._id}`, true);
};

export const currentUserUpdatePasswordApi = async (body: PasswordUpdate) => {
  const session = await getUser();

  return Api.patch<PasswordUpdate, AuthResponse>(
    `/user/${session?._id}/change-password/dashboard`,
    body,
    true,
  );
};

export const forgotPasswordRequestApi = ({ email }: { email: string }) => {
  return Api.post<{ email: string }, AuthResponse>(`/user/password/forget`, {
    email,
  });
};

export const verifyCodeApi = (body: VerifyOTP) => {
  return Api.post<VerifyOTP, VerifyOTPResponse>(
    "/user/password/verify-code",
    body,
  );
};

export const passwordResetApi = (body: ResetPassword) => {
  return Api.post<ResetPassword, AuthResponse>(`/user/password/reset`, body);
};

export const fileUploadApi = (body: FormData) => {
  return Api.post<FormData, AuthResponse & { data: string[] }>(
    `/upload-files`,
    body,
    false,
    "multipart/form-data",
  );
};

export const createAdminApi = (body: CreateAdminType) => {
  return Api.post<CreateAdminType, ApiResponse>(`/user/create-admin`, body);
};

export const getAllAdminApi = (page = "1", limit = "10") => {
  return Api.get<AdminRsp>(
    `/user/admin/all/admins?${queryBuilder({ page, limit })}`,
  );
};
