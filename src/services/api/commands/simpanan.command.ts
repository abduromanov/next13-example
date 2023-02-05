import queryMutation from "../queryMutation";

import { TAnggota, TSimpanan } from "@/types";

export type TSimpananRequest = {
  idAnggota: string;
  nominal: string;
  saldo: string;
  catatan: string;
  jenisTabungan: string;
};

export type Saldo = {
  saldoWajib: any;
  saldoKhusus: any;
  saldoSukarela: any;
};
export const useSimpanan = () =>
  queryMutation<any, TAnggota[]>("/api/simpanan", ["simpanan"]);

export const useSimpananDetail = (id: number) =>
  queryMutation<any, TSimpanan[]>(`/api/simpanan/${id}`, ["simpanan", id]);

export const useSimpananSebelumnya = (id: number) =>
  queryMutation<any, Saldo>(`/api/simpanan/${id}/saldoSebelumnya`, [
    "simpanan",
    id,
  ]);

export const useCreateSimpanan = () =>
  queryMutation<TSimpananRequest, TSimpanan>("/api/simpanan");
