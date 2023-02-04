import queryMutation from "../queryMutation";

import { TPengumuman, TResponse } from "@/types";

export const usePengumuman = () =>
  queryMutation<any, TPengumuman[]>("/api/pengumuman", ["pengumuman"]);

export const useMutatePengumuman = (id = "") =>
  queryMutation<FormData | { active: boolean }, TResponse>(
    `/api/pengumuman/${id}`,
    ["pengumuman", id]
  );
