import queryMutation from "../queryMutation";

import { TMurobahah, TMutasiMurobahah } from "@/types";

export type TMutasiMurobahahRequest = {
  bulanTidakSesuai: string;
  catatan: string;
  cicilan: string;
  isBulat: boolean;
  margin: string;
  murobahah: string;
  tenorTerbayar: string;
  tglBayar: string;
  total: string;
};

export type TMurobahahRequest = {
  cicilan: string;
  dp: string;
  lunas: boolean;
  margin: string;
  pembiayaan: string;
  pinjaman: string;
  tenor: string;
  tglMulai: string;
  tglSelesai: string;
  total: string;
  totalMargin: string;
  totalPinjaman: string;
  anggota: string;
};

export const useMurobahah = () =>
  queryMutation<any, TMurobahah[]>("/api/murobahah", ["murobahah"]);

export const useMurobahahDetail = (id: number) =>
  queryMutation<any, TMurobahah>(`/api/murobahah/${id}`, ["murobahah", id]);

export const useDeleteMurobahah = (id: number) =>
  queryMutation<any, TMurobahah>(`/api/murobahah/${id}`);

export const useMutasiMurobahah = (id: number) =>
  queryMutation<any, TMutasiMurobahah[]>(`/api/murobahah/${id}/mutasi`, [
    "murobahah",
    id,
  ]);

export const useDeleteMutasiMurobahah = (id: number, idMutasi: number) =>
  queryMutation<any, TMutasiMurobahah>(
    `/api/murobahah/${id}/mutasi/${idMutasi}`
  );

export const useCreateMutasiMurobahah = (id: number) =>
  queryMutation<TMutasiMurobahahRequest, TMutasiMurobahah>(
    `/api/murobahah/${id}/mutasi`
  );
export const useCreateMurobahah = () =>
  queryMutation<TMurobahahRequest, TMurobahah>(`/api/murobahah`);
