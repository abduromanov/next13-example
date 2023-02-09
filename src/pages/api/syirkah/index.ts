import moment from "moment";
import { NextApiRequest, NextApiResponse } from "next";

import directus from "@/services/api/directus";

import { TMurobahah, TResponse } from "@/types";

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
    const data = await directus.items("syirkah").readByQuery({
      fields: ["*", "anggota.nama", "anggota.idAnggota"],
      meta: "*",
      ...req.query,
    });

    return res.status(200).json(data);
  }

  async function post() {
    const data = req.body;

    data.anggota = data.anggota.value;
    data.modalAwal = parseInt(data.modalAwal.replace(/\D/g, ''), 10);
    data.modalHamasah = parseInt(data.modalHamasah.replace(/\D/g, ''), 10);
    data.tglMulai = moment(data.tglMulai);
    data.tglSelesai = moment(data.tglSelesai);

    await directus.items("syirkah").createOne(data);

    return res.status(200).json({});
  }
}
