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
    const filter: any = {
      _and: [
        {
          murobahah: {
            _eq: parseInt(req.query.id as string),
          },
        },
      ],
    };
    if (req.query.tahun) {
      filter._and.push({
        tglBayar: {
          _between: [
            moment(req.query.tahun, "YYYY").startOf("year").toISOString(),
            moment(req.query.tahun, "YYYY").endOf("year").toISOString(),
          ],
        },
      });
    }

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
    const data = req.body;
    data.cicilan = parseInt(data.cicilan.replace(/\D/g, ""));
    data.margin = parseInt(data.margin.replace(/\D/g, ""));
    data.total = parseInt(data.total.replace(/\D/g, ""));
    data.tglBayar = moment(data.tglBayar)
      .set({ h: moment().hour(), m: moment().minute(), s: moment().second() })
      .toISOString();
    data.tenorTerbayar = parseInt(data.tenorTerbayar);
    data.bulanTidakSesuai = parseInt(data.bulanTidakSesuai);
    data.murobahah = parseInt(data.murobahah);

    await directus.items("mutasiMurobahah").createOne(data);

    return res.status(200).json({});
  }
}
