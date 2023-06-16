import { NextApiRequest, NextApiResponse } from "next";

import directus from "@/services/api/directus";

import { TResponse } from "@/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TResponse | any>
) {
  try {
    const filterWajib = {
      _and: [
        {
          idAnggota: {
            _eq: parseInt(req.query.id as string),
          },
          jenisTabungan: {
            _eq: "wajib",
          },
        },
      ],
    };
    const filterInvestasi = {
      _and: [
        {
          idAnggota: {
            _eq: parseInt(req.query.id as string),
          },
          jenisTabungan: {
            _eq: "investasi",
          },
        },
      ],
    };
    const filterSukarela = {
      _and: [
        {
          idAnggota: {
            _eq: parseInt(req.query.id as string),
          },
          jenisTabungan: {
            _eq: "sukarela",
          },
        },
      ],
    };

    const dataSaldoWajib = await directus.items("mutasiTabungan").readByQuery({
      fields: ["saldo"],
      meta: "*",
      filter: filterWajib,
      ...req.query,
    });
    const dataSaldoInvestasi = await directus
      .items("mutasiTabungan")
      .readByQuery({
        fields: ["saldo"],
        meta: "*",
        filter: filterInvestasi,
        ...req.query,
      });
    const dataSaldoSukarela = await directus
      .items("mutasiTabungan")
      .readByQuery({
        fields: ["saldo"],
        meta: "*",
        filter: filterSukarela,
        ...req.query,
      });

    const saldoWajib = dataSaldoWajib.data?.slice(-1).map((item) => item.saldo);
    const saldoInvestasi = dataSaldoInvestasi.data
      ?.slice(-1)
      .map((item) => item.saldo);
    const saldoSukarela = dataSaldoSukarela.data
      ?.slice(-1)
      .map((item) => item.saldo);

    const dataMerge = {
      saldoWajib,
      saldoInvestasi,
      saldoSukarela,
    };

    return res.status(200).json({ data: dataMerge });
  } catch (error: any) {
    return res.status(error.response?.status || 500).json(error);
  }
}
