import { isArray } from "lodash";
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
          idAnggota: {
            _eq: parseInt(req.query.id as string),
          },
        },
      ],
    };

    if (req.query.jenisSimpanan) {
      filter._and.push({
        jenisTabungan: {
          _eq: req.query.jenisSimpanan,
        },
      });
    }
    if (req.query.tglDibuatAwal && req.query.tglDibuatAkhir) {
      filter._and.push({
        tglDibuat: {
          _between: [
            moment(req.query.tglDibuatAwal)
              .set({
                h: moment().hour(),
                m: moment().minute(),
                s: moment().second(),
              })
              .toISOString(),
            moment(req.query.tglDibuatAkhir)
              .set({
                h: moment().hour(),
                m: moment().minute(),
                s: moment().second(),
              })
              .toISOString(),
          ],
        },
      });
    }
    // console.log(filter._and.map((v) => v.tglDibuat));
    const data = await directus.items("mutasiTabungan").readByQuery({
      fields: ["*"],
      meta: "*",
      filter: filter,
      ...req.query,
    });

    return res.status(200).json(data);
  }

  async function post() {
    const data = req.body;
    if (isArray(data)) {
      data.map((v: any) => {
        if (v.jenisTabungan == "khusus") {
          v.idAnggota = parseInt(v.idAnggota);
          v.nominal = parseInt(v.nominal.replace(/\D/g, ""), 10);
          v.saldo = 0;
        }
        if (v.jenisTabungan == "sukarela") {
          v.idAnggota = parseInt(v.idAnggota);
          v.nominal = parseInt(v.nominal.replace(/\D/g, ""), 10);
          v.saldo = 0;
        }
        if (v.jenisTabungan == "wajib") {
          v.idAnggota = parseInt(v.idAnggota);
          v.nominal = parseInt(v.nominal.replace(/\D/g, ""), 10);
          v.saldo = 0;
        }
      });
    } else {
      data.nominal = parseInt(data.nominal.replace(/\D/g, ""), 10) * -1;
      data.idAnggota = parseInt(req.query.id as string);
      data.saldo = 0;
    }

    // console.log(data);
    await directus.items("mutasiTabungan").createMany(data);
    return res.status(200).json({});
  }
}
