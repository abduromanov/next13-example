import { NextApiRequest, NextApiResponse } from "next";

import directus from "@/services/api/directus";

import { TMurobahah, TResponse } from "@/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TResponse | TMurobahah>
) {
  try {
    const filter = {
      idAnggota: {
        _eq: parseInt(req.query.id as string),
      },
    };
    const data = await directus.items("mutasiTabungan").readByQuery({
      fields: ["*"],
      meta: "*",
      filter: filter,
      ...req.query,
    });

    const totalSimpanan = {
      wajib: data.data
        ?.filter((item) => item.jenisTabungan == "wajib")
        .map((item) => item.saldo)
        .reduce((a, b) => a + b, 0),
      pokok: data.data
        ?.filter((item) => item.jenisTabungan == "pokok")
        .map((item) => item.saldo)
        .reduce((a, b) => a + b, 0),
      sukarela: data.data
        ?.filter((item) => item.jenisTabungan == "sukarela")
        .map((item) => item.saldo)
        .reduce((a, b) => a + b, 0),
      khusus: data.data
        ?.filter((item) => item.jenisTabungan == "khusus")
        .map((item) => item.saldo)
        .reduce((a, b) => a + b, 0),
    };

    const dataMerge = { ...data, totalSimpanan };

    return res.status(200).json(dataMerge);
  } catch (error: any) {
    return res.status(error.response?.status || 500).json(error);
  }
}
