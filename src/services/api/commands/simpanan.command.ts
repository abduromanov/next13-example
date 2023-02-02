import queryMutation from "../queryMutation";

import { TSimpanan } from "@/types";

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
  queryMutation<any, TSimpanan[]>("/api/simpanan", ["simpanan"]);

export const useAllSimpanan = () =>
  queryMutation<any, TSimpanan[]>("/api/simpanan/all", ["allSimpanan"]);

export const useSimpananDetail = (id: number, jenisTabungan: string) =>
  queryMutation<any, TSimpanan[]>(`/api/simpanan/${id}`, ["simpanan", id]);

export const useSimpananSebelumnya = (id: number) =>
  queryMutation<any, Saldo[]>(`/api/simpanan/${id}/saldoSebelumnya`, [
    "simpanan",
    id,
  ]);

export const useCreateSimpanan = () =>
  queryMutation<TSimpananRequest, TSimpanan>("/api/simpanan");
