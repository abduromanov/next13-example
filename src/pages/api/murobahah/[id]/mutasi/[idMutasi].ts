import { NextApiRequest, NextApiResponse } from "next";

import directus from "@/services/api/directus";

import { TMurobahah, TResponse } from "@/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TResponse | TMurobahah>
) {
  try {
    switch (req.method) {
      case "DELETE":
        return destroy();

      default:
        return res.status(405).end();
    }
  } catch (error: any) {
    return res.status(error.response?.status || 500).json(error);
  }

  async function destroy() {
    await directus
      .items("mutasiMurobahah")
      .deleteOne(req.query.idMutasi as string);
    return res.status(200).end();
  }
}
