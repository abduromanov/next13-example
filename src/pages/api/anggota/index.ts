import { NextApiRequest, NextApiResponse } from "next";

import directus from "@/services/api/directus";

import { TAnggota, TResponse } from "@/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TResponse | TAnggota>
) {
  try {
    switch (req.method) {
      case 'GET':
        return get();

      case 'POST':
        return post();

      default:
        return res.status(405).end();
    }
  } catch (error: any) {
    return res.status(error.response?.status || 500).json(error);
  }

  async function get() {
    const fields = [...((req.query.fields as string) || "").split(",")].filter(
      (item) => item
    );

    delete req.query.fields;

    const data = await directus.items("anggota").readByQuery({
      fields: [
        "id",
        "idAnggota",
        "nama",
        "alamat",
        "isPasswordBaru",
        "status",
        "tglDibuat",
        "tglDihapus",
        ...fields,
      ],
      meta: "*",
      filter: {
        tglDihapus: {
          _null: true,
        },
      },
      ...req.query,
    });

    return res.status(200).json(data);
  }


  async function post() {
    await directus.items<string, TAnggota>("anggota").createOne(req.body);

    return res.status(200).json({});
  }
}
