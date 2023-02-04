import queryMutation from "../queryMutation";

import { TPengumuman, TResponse } from "@/types";

export const usePengumuman = (key?: string[]) => {
  key = key?.filter((item) => item) || [];

  return queryMutation<any, TPengumuman[]>("/api/pengumuman", [
    "pengumuman",
    ...key,
  ]);
};

export const useMutatePengumuman = (id = "") =>
  queryMutation<FormData | { active: boolean }, TResponse>(
    `/api/pengumuman/${id}`,
    ["pengumuman", id]
  );
