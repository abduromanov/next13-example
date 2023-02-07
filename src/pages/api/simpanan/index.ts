import _ from "lodash";
import { NextApiRequest, NextApiResponse } from "next";

import directus from "@/services/api/directus";

import { DirectusResponse, TAnggota, TResponse, TSimpanan } from "@/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TResponse | DirectusResponse<TAnggota[]>>
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
    const data = await directus.items("anggota").readByQuery({
      fields: [
        "id",
        "idAnggota",
        "nama",
        "alamat",
        "mutasiTabungan.nominal",
        "simpananPokok",
      ],
      meta: "*",
      ...req.query,
    });

    data.data?.map((item) => {
      item.totalSimpanan = item.mutasiTabungan
        .map((v: any) => v.nominal)
        .reduce((a: any, b: any) => a + b, 0);

      item.totalSimpanan = item.totalSimpanan + item.simpananPokok;
      delete item.mutasiTabungan;

      return item;
    });

    return res.status(200).json(data);
  }
  async function post() {
    await directus
      .items<string, TSimpanan>("mutasiTabungan")
      .createOne(req.body);

    return res.status(200).json({});
  }
}
