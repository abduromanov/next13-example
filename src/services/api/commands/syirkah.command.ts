import queryMutation from "../queryMutation";

import { TSyirkah, TSyirkahRelations } from "@/types";

export const useSyirkah = (key?: string[]) => {
  key = key?.filter((item) => item) || [];

  return queryMutation<any, Array<TSyirkah & TSyirkahRelations>>("/api/syirkah", ["syirkah", ...key]);
};