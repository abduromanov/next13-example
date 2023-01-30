import queryMutation from "../queryMutation";

import { TSimpanan } from "@/types";

export const useSimpanan = () =>
  queryMutation<any, TSimpanan[]>("/api/simpanan", ["simpanan"]);

export const useSimpananDetail = (id: number) =>
  queryMutation<any, TSimpanan>(`api/simpanan/${id}`, ["simpanan", id]);
