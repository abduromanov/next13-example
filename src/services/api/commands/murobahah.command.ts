import queryMutation from "../queryMutation";

import { TMurobahah, TMutasiMurobahah } from "@/types";

export type TMutasiMurobahahRequest = {
  bulanTidakSesuai: number;
  catatan: string;
  cicilan: string;
  isBulat: boolean;
  margin: string;
  murobahah: string;
  tenorTerbayar: number;
  tglBayar: string;
  total: string;
};
export const useMurobahah = () =>
  queryMutation<any, TMurobahah[]>("/api/murobahah", ["murobahah"]);

export const useMurobahahDetail = (id: number) =>
  queryMutation<any, TMurobahah>(`/api/murobahah/${id}`, ["murobahah", id]);

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
