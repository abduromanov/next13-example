import { NextApiRequest, NextApiResponse } from "next";

import directus from "@/services/api/directus";

import { TAnggota, TResponse } from "@/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TResponse | TAnggota>
) {
  const anggota = JSON.parse(req.cookies.anggota || "{}");

  try {
    switch (req.method) {
      case "PUT":
        return put();

      default:
        return res.status(405).end();
    }
  } catch (error: any) {
    return res.status(error.response?.status || 500).json(error);
  }

  async function put() {
    const data = req.body;

    await directus.items("anggota").updateOne(anggota.id, data);

    return res.status(200).json({});
  }
}
