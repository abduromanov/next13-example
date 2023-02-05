import { NextApiRequest, NextApiResponse } from "next";

import directus from "@/services/api/directus";

import { TMurobahah, TResponse } from "@/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TResponse | TMurobahah>
) {
  try {
    const data = await directus.items("murobahah").readByQuery({
      fields: [
        "*",
        "anggota.nama",
        "anggota.idAnggota",
        "anggota.id",
        "mutasiMurobahah.total",
      ],
      filter: {
        tglDihapus: {
          _null: true,
        },
      },
      meta: "*",
      ...req.query,
    });
    data.data?.map((item) => {
      item.totalTerbayar = item.mutasiMurobahah
        .map((v: any) => v.total)
        .reduce((a: any, b: any) => a + b, 0);
      delete item.mutasiMurobahah;

      return item;
    });

    return res.status(200).json(data);
  } catch (error: any) {
    return res.status(error.response?.status || 500).json(error);
  }
}
