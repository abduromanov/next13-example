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
      fields: ["nominal", "jenisTabungan", "anggota.simpananPokok"],
      meta: "*",
      filter: filter,
      ...req.query,
    });
    const dataSimpanaanPokok = await directus
      .items("anggota")
      .readOne(parseInt(req.query.id as string), {
        fields: ["simpananPokok"],
        meta: "*",
        ...req.query,
      });

    const totalSimpanan = {
      wajib: data.data
        ?.filter((item) => item.jenisTabungan == "wajib")
        .map((item) => item.nominal)
        .reduce((a, b) => a + b, 0),
      pokok: dataSimpanaanPokok?.simpananPokok
        ? dataSimpanaanPokok.simpananPokok
        : 0,
      sukarela: data.data
        ?.filter((item) => item.jenisTabungan == "sukarela")
        .map((item) => item.nominal)
        .reduce((a, b) => a + b, 0),
      investasi: data.data
        ?.filter((item) => item.jenisTabungan == "investasi")
        .map((item) => item.nominal)
        .reduce((a, b) => a + b, 0),
    };

    const dataTotSimpanan = { totalSimpanan };

    return res.status(200).json({ data: dataTotSimpanan.totalSimpanan });
  } catch (error: any) {
    return res.status(error.response?.status || 500).json(error);
  }
}
