import { NextApiRequest, NextApiResponse } from "next";

import directus from "@/services/api/directus";

import { TAnggota, TResponse } from "@/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TResponse | TAnggota>
) {
  try {
    switch (req.method) {
      case "PUT":
        return update();

      case "PATCH":
        return update();

      default:
        return res.status(405).end();
    }
  } catch (error: any) {
    return res.status(error.response?.status || 500).json(error);
  }

  async function update() {
    await directus
      .items("pengumuman")
      .updateOne(req.query.id as string, req.body);

    return res.status(200).json({});
  }
}
