import { NextApiRequest, NextApiResponse } from "next";

import directus from "@/services/api/directus";

import { TAnggota, TResponse } from "@/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TResponse | TAnggota>
) {
  try {
    const data = await directus.items("pengumuman").readByQuery({
      fields: ["image"],
      meta: "filter_count",
      filter: {
        active: {
          _eq: true,
        },
      },
    });

    return res.status(200).json(data);
  } catch (error: any) {
    return res.status(error.response?.status || 500).json(error);
  }
}
