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
    const filter = {
      tglDihapus: {
        _null: true,
      },

      mutasiMurobahah: {
        tglDihapus: {
          _null: true,
        },
      },
    };
    const data = await directus.items("murobahah").readByQuery({
      fields: [
        "*",
        "anggota.nama",
        "anggota.idAnggota",
        "anggota.id",
        "mutasiMurobahah.total",
      ],
      filter: filter,
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
  }
  async function post() {
    const data = req.body;
    data.tglMulai = moment(data.tglMulai)
      .set({ h: moment().hour(), m: moment().minute(), s: moment().second() })
      .toISOString();
    data.tglSelesai = moment(data.tglSelesai)
      .set({ h: moment().hour(), m: moment().minute(), s: moment().second() })
      .toISOString();
    data.totalPinjaman = parseInt(data.totalPinjaman.replace(/\D/g, ""), 10);
    data.totalMargin = parseInt(data.totalMargin.replace(/\D/g, ""), 10);
    data.dp = parseInt(data.dp.replace(/\D/g, ""), 10);
    data.tenor = parseInt(data.tenor);
    data.total = data.totalPinjaman + data.totalMargin - data.dp;
    data.margin = ~~(data.totalMargin / data.tenor);
    data.pinjaman = -~((data.totalPinjaman - data.dp) / data.tenor);
    data.cicilan = data.pinjaman + data.margin;

    // console.log(data);
    await directus.items("murobahah").createOne(data);

    return res.status(200).json({});
  }
}
