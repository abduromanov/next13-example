import queryMutation from "../queryMutation";

import { TMutasiSyirkah, TSyirkah, TSyirkahRelations } from "@/types";

export type TSyirkahRequest = {
  anggota: number;
  namaBc: string;
  modalAwal: string;
  modalHamasah: string;
  tglMulai: string;
  tglSelesai: string;
};

export type TMutasiSyirkahRequest = {
  modalAwal: string;
  modalHamasah: string;
  bonusBersih: string;
  presentaseBonus: string;
  bagiHasil: string;
  tglBayar: string;
  catatan: string;
}

export const useSyirkah = (key?: string[]) => {
  key = key?.filter((item) => item) || [];

  return queryMutation<any, Array<TSyirkah & TSyirkahRelations>>("/api/syirkah", ["syirkah", ...key]);
};

export const useCreateSyirkah = () =>
  queryMutation<TSyirkahRequest, any>("/api/syirkah");

export const useDetailSyirkah = (id: number | string) =>
  queryMutation<any, TSyirkah & TSyirkahRelations>(`/api/syirkah/${id}`, ["syirkah", id]);

export const useMutasiSyirkah = (id: number | string) =>
  queryMutation<any, TMutasiSyirkah[]>(`/api/syirkah/${id}/mutasi`, ["mutasiSyirkah", id]);

export const useCreateMutasiSyirkah = (id: number | string) =>
  queryMutation<TMutasiSyirkahRequest>(`/api/syirkah/${id}`);