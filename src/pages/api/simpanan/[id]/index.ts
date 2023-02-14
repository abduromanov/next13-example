import { isArray, isObject } from "lodash";
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
        .map((item) => item.nominal)
        .reduce((a, b) => a + b, 0),
      pokok: data.data
        ?.filter((item) => item.jenisTabungan == "pokok")
        .map((item) => item.nominal)
        .reduce((a, b) => a + b, 0),
      sukarela: data.data
        ?.filter((item) => item.jenisTabungan == "sukarela")
        .map((item) => item.nominal)
        .reduce((a, b) => a + b, 0),
      khusus: data.data
        ?.filter((item) => item.jenisTabungan == "khusus")
        .map((item) => item.nominal)
        .reduce((a, b) => a + b, 0),
    };

    const dataMerge = { ...data, totalSimpanan };

    return res.status(200).json(dataMerge);
  }

  async function post() {
    const data = req.body;
    if (isArray(data)) {
      data.map((v: any) => {
        v.idAnggota = parseInt(v.idAnggota);
        v.nominal = parseInt(v.nominal.replace(/\D/g, ""), 10);
        v.saldo = 0;
      });
    } else {
      data.nominal = parseInt(data.nominal.replace(/\D/g, ""), 10) * -1;
      data.idAnggota = parseInt(req.query.id as string);
      data.saldo = 0;
    }

    // console.log(data);
    await directus.items("mutasiTabungan").createOne(data);

    return res.status(200).json({});
  }
}
