import { NextApiRequest, NextApiResponse } from "next";

import directus from "@/services/api/directus";

import { TResponse, TSimpanan } from "@/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TResponse | TSimpanan>
) {
  try {
    const data = await directus.items('mutasiTabungan').readByQuery({
      fields: ['*'],
      meta: '*',
      ...req.query,
    });

    return res.status(200).json(data);
  } catch (error: any) {
    return res.status(error.response?.status || 500).json(error);
  }
};
