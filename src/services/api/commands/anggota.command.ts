import query from "../query";

import { TAnggota } from "@/types";

export const doAnggota = () => query<any, TAnggota>('/api/anggota', ['anggota'], {});