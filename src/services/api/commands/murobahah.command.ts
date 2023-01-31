import queryMutation from "../queryMutation";

import { TMurobahah } from "@/types";

export const useMurobahah = () =>
  queryMutation<any, TMurobahah[]>("/api/murobahah", ["murobahah"]);
