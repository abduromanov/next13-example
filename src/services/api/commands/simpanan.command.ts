import queryMutation from "../queryMutation";

import { TAnggota, TSimpanan } from "@/types";

export type TSimpananRequest = {
  idAnggota: string;
  nominal: string;
  saldo: string;
  catatan: string;
  jenisTabungan: string;
}[];

export type Saldo = {
  saldoWajib: any;
  saldoInvestasi: any;
  saldoSukarela: any;
};

export type TotalSimpanan = {
  wajib: any;
  investasi: any;
  pokok: any;
  sukarela: any;
};

export type TSimpananKreditRequest = {
  nominal: any;
  nominalWajib: string;
  nominalInvestasi: string;
  nominalSukarela: string;
  idAnggota: string;
  saldo: string;
  jenisTabungan: string;
  catatan: string;
  tglTransaksi: string;
};

export type TSimpananDebitRequest = {
  nominal: string;
  nominalWajib: string;
  nominalInvestasi: string;
  nominalSukarela: string;
  catatan: string;
  idAnggota: string;
  saldo: string;
  jenisTabungan: string;
  tglTransaksi: string;
};

export const useSimpanan = () =>
  queryMutation<any, TAnggota[]>("/api/simpanan", ["simpanan"]);

export const useSimpananDetail = (id: number) =>
  queryMutation<any, TSimpanan[]>(`/api/simpanan/${id}`, ["simpanan", id]);

export const useTotalSimpanan = (id: number) =>
  queryMutation<any, TotalSimpanan>(`/api/simpanan/${id}/totalSimpanan`, [
    "simpanan",
    id,
  ]);

export const useSimpananSebelumnya = (id: number) =>
  queryMutation<any, Saldo>(`/api/simpanan/${id}/saldoSebelumnya`, [
    "simpanan",
    id,
  ]);

export const useCreateSimpanan = (id: number) =>
  queryMutation<TSimpananRequest | TSimpananKreditRequest, TSimpanan>(
    `/api/simpanan/${id}`
  );

export const useDeleteMutasi = (id: number) =>
  queryMutation<any, unknown>(`/api/simpanan/${id}`);
