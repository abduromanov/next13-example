import _ from "lodash";
import { NextApiRequest, NextApiResponse } from "next";

import directus from "@/services/api/directus";

import { DirectusResponse, TAnggota, TResponse } from "@/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TResponse | DirectusResponse<TAnggota[]>>
) {
  try {
    const data = await directus.items("anggota").readByQuery({
      fields: ["id", "idAnggota", "nama", "alamat", "mutasiTabungan.saldo"],
      meta: "*",
      ...req.query,
    });

    data.data?.map((item) => {
      item.totalSimpanan =
        _.reduce(
          item.mutasiTabungan,
          (total, mutasi) => (total?.saldo || 0) + (mutasi?.saldo || 0)
        ) || 0;
      delete item.mutasiTabungan;

      return item;
    });

    return res.status(200).json(data);
  } catch (error: any) {
    return res.status(error.response?.status || 500).json(error);
  }
}
