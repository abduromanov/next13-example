import moment from "moment";
import { NextApiRequest, NextApiResponse } from "next";

import directus from "@/services/api/directus";

import {
  DirectusResponse,
  TResponse,
  TSyirkah,
  TSyirkahRelations,
} from "@/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    TResponse | DirectusResponse<TSyirkah & Partial<TSyirkahRelations>>
  >
) {
  try {
    switch (req.method) {
      case "GET":
        return get();

      case "DELETE":
        return destroy();

      default:
        return res.status(405).end();
    }
  } catch (error: any) {
    return res.status(error.response?.status || 500).json(error);
  }

  async function get() {
    if (!req.query.id) {
      return res.status(404).json({});
    }

    const data = await directus
      .items("syirkah")
      .readOne(req.query.id as string, {
        fields: ["*", "anggota.nama", "anggota.idAnggota"],
        meta: "*",
        ...req.query,
      });

    return res.status(200).json({
      data: data,
    });
  }

  async function destroy() {
    await directus.items("syirkah").updateOne(req.query.id as string, {
      tglDihapus: moment(),
    });
    return res.status(200).end();
  }
}
