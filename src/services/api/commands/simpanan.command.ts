import queryMutation from "../queryMutation";

import { TSimpanan } from "@/types";

export const useSimpanan = () =>
  queryMutation<any, TSimpanan[]>("/api/simpanan", ["simpanan"]);

export const useAllSimpanan = () =>
  queryMutation<any, TSimpanan[]>("/api/simpanan/all", ["allSimpanan"]);

export const useSimpananDetail = (id: number, jenisTabungan: string) =>
  queryMutation<any, TSimpanan[]>(`/api/simpanan/${id}`, ["simpanan", id]);
