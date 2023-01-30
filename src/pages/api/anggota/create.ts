import { NextApiRequest, NextApiResponse } from "next";

import directus from "@/services/api/directus";

import { TAnggota, TResponse } from "@/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TResponse | TAnggota>
) {
  if (req.method !== "POST") {
    return res.status(405);
  }

  try {
    await directus.items<string, TAnggota>("anggota").createOne(req.body);

    return res.status(200).json({});
  } catch (error: any) {
    return res.status(error.response?.status || 500).json(error);
  }
}
