import { NextApiRequest, NextApiResponse } from "next";

import directus from "@/services/api/directus";

import { TMurobahah, TMutasiMurobahah, TResponse } from "@/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TResponse | TMurobahah>
) {
  try {
    switch (req.method) {
      case "GET":
        return get();

      case "POST":
        return post();

      default:
        return res.status(405).end();
    }
  } catch (error: any) {
    return res.status(error.response?.status || 500).json(error);
  }
  async function get() {
    const filter = {
      _and: [
        {
          murobahah: {
            _eq: parseInt(req.query.id as string),
          },
          tglDihapus: {
            _null: true,
          },
        },
      ],
    };

    if (req.query.filter) {
      filter._and.push(JSON.parse(req.query.filter as string));
    }

    delete req.query.filter;

    const data = await directus.items("mutasiMurobahah").readByQuery({
      fields: ["*"],
      meta: "*",
      filter: filter,
      ...req.query,
    });

    return res.status(200).json(data);
  }
  async function post() {
    await directus
      .items<string, TMutasiMurobahah>("mutasiMurobahah")
      .createOne(req.body);

    return res.status(200).json({});
  }
}
