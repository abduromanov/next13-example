import queryMutation from "../queryMutation";

import { TAnggota } from "@/types";

export type TAnggotaRequest = {
  idAnggota: string;
  nama: string;
  password: string;
  alamat: string;
};

export const useAnggota = () =>
  queryMutation<any, TAnggota[]>("/api/anggota", ["anggota"]);

export const useAnggotaDetail = (id: number) =>
  queryMutation<any, TAnggota>(`/api/anggota/${id}`, ["anggota", id]);

export const useCreateAnggota = () =>
  queryMutation<TAnggotaRequest, TAnggota>("/api/anggota");

export const useUpdateAnggota = (id: number) =>
  queryMutation<TAnggotaRequest, TAnggota>(`/api/anggota/${id}`);

export const useDeleteAnggota = (id: number) =>
  queryMutation<any, TAnggota>(`/api/anggota/${id}`);
