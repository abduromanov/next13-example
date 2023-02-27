import moment from "moment";
import { NextApiRequest, NextApiResponse } from "next";

import directus from "@/services/api/directus";

import { TResponse, TSimpanan } from "@/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TResponse | TSimpanan>
) {
  try {
    switch (req.method) {
      case "GET":
        return get();

      case "DELETE":
        return destroy();

      case "PUT":
        return update();

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
      .items("murobahah")
      .readOne(req.query.id as string, {
        fields: ["*", "anggota.id", "anggota.nama"],
        filter: {
          tglDihapus: {
            _null: true,
          },
        },
        meta: "*",
        ...req.query,
      });

    return res.status(200).json({ data: data });
  }

  async function destroy() {
    await directus.items("murobahah").updateOne(req.query.id as string, {
      tglDihapus: moment(),
    });
    return res.status(200).end();
  }

  async function update() {
    const request = req.body;

    // console.log(request);
    await directus
      .items("murobahah")
      .updateOne(req.query.id as string, request);

    return res.status(200).end();
  }
}
