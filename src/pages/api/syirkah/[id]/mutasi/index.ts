import moment from "moment";
import { NextApiRequest, NextApiResponse } from "next";

import directus from "@/services/api/directus";

import { TMutasiSyirkah, TResponse } from "@/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TResponse | TMutasiSyirkah>
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
    const filter: any = {
      _and: [
        {
          syirkah: {
            _eq: parseInt(req.query.id as string),
          },
        },
      ],
    };

    if (req.query.tglBayarAwal && req.query.tglBayarAkhir) {
      filter._and.push({
        tglBayar: {
          _between: [
            moment(req.query.tglBayarAwal)
              .set({
                h: 0,
                m: 0,
                s: 0,
              })
              .toISOString(),
            moment(req.query.tglBayarAkhir)
              .set({
                h: 23,
                m: 59,
                s: 59,
              })
              .toISOString(),
          ],
        },
      });
    }
    // if (req.query.filter) {
    //   filter._and.push(JSON.parse(req.query.filter as string));
    // }

    delete req.query.filter;

    const data = await directus.items("mutasiSyirkah").readByQuery({
      fields: ["*"],
      meta: "*",
      filter: filter,
      ...req.query,
    });

    return res.status(200).json(data);
  }

  async function post() {
    const data = req.body;

    data.modalAwal = parseInt(data.modalAwal.replace(/\D/g, ""), 10);
    data.modalHamasah = parseInt(data.modalHamasah.replace(/\D/g, ""), 10);
    data.bonusBersih = parseInt(data.bonusBersih.replace(/\D/g, ""), 10);
    data.bagiHasil = parseInt(data.bagiHasil.replace(/\D/g, ""), 10);
    data.tglBayar = moment(data.tglBayar);

    await directus.items("mutasiSyirkah").createOne({
      ...data,
      syirkah: req.query.id,
    });

    return res.status(200).json({});
  }
}
