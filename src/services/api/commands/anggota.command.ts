import queryMutation from "../queryMutation";

import { TAnggota } from "@/types";

export type TAnggotaRequest = {
  idAnggota: string;
  nama: string;
  password: string;
  alamat: string;
  simpananPokok: string;
};

export const useAnggota = (key?: string[]) => {
  key = key?.filter((item) => item) || [];

  return queryMutation<any, TAnggota[]>("/api/anggota", ["anggota", ...key]);
};

export const useAnggotaDetail = (id: number) =>
  queryMutation<any, TAnggota>(`/api/anggota/${id}`, ["anggota", id]);

export const useCreateAnggota = () =>
  queryMutation<TAnggotaRequest, TAnggota>("/api/anggota");

export const useUpdateAnggota = (id: number) =>
  queryMutation<TAnggotaRequest, TAnggota>(`/api/anggota/${id}`);

export const useDeleteAnggota = (id: number) =>
  queryMutation<any, unknown>(`/api/anggota/${id}`);
