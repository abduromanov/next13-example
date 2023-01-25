import queryMutation from "../queryMutation";

import { TAnggota } from "@/types";

export type TLoginRequest = {
  idAnggota: string;
  password: string;
}

export const useLogin = () => queryMutation<TLoginRequest, TAnggota>({ defaultQueryKey: ['login'], url: '/api/auth/login' });