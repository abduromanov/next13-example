import query from "../query";

import { TAnggota } from "@/types";

export type TLoginRequest = {
  idAnggota: string;
  password: string;
}

export const doLogin = () => query<TLoginRequest, TAnggota>('/api/auth/login');