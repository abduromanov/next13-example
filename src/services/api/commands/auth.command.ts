import queryMutation from "../queryMutation";

import { TAnggota } from "@/types";

export type TLoginRequest = {
  idAnggota: string;
  password: string;
};

export type TUpdatePasswordRequest = {
  password: string;
}

export const useLogin = () =>
  queryMutation<TLoginRequest, TAnggota>("/api/auth/login");

export const useUpdatePassword = () =>
  queryMutation<TUpdatePasswordRequest, unknown>("/api/auth/update-password");