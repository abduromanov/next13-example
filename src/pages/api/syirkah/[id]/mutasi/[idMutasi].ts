import moment from "moment";
import { NextApiRequest, NextApiResponse } from "next";

import directus from "@/services/api/directus";

import { DirectusResponse, TMutasiSyirkah, TResponse } from "@/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TResponse | DirectusResponse<TMutasiSyirkah>>
) {
  const idMutasi = req.query.idMutasi as string;

  try {
    switch (req.method) {
      case "GET":
        return get();

      case "PATCH":
        return update();

      default:
        return;
    }
  } catch (error: any) {
    return res.status(error.response?.status || 500).json(error);
  }

  async function get() {
    const data = await directus.items("mutasiSyirkah").readOne(idMutasi, {
      fields: ["*"],
    });

    return res.status(200).json({ data: data });
  }

  async function update() {
    const data = req.body

    data.modalAwal = parseInt(data.modalAwal.replace(/\D/g, ''), 10);
    data.modalHamasah = parseInt(data.modalHamasah.replace(/\D/g, ''), 10);
    data.bonusBersih = parseInt(data.bonusBersih.replace(/\D/g, ''), 10);
    data.bagiHasil = parseInt(data.bagiHasil.replace(/\D/g, ''), 10);
    data.tglBayar = moment(data.tglBayar);

    await directus.items("mutasiSyirkah").updateOne(idMutasi, data);

    return res.status(200).json({});
  }
}
