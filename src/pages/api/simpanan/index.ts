import { readItems } from "@directus/sdk";
import { NextApiRequest, NextApiResponse } from "next";

import directus from "@/services/api/directus";

import {
  DirectusResponse,
  TAnggota,
  TAnggotaRelations,
  TResponse,
} from "@/types";

interface Schema {
  anggota: (TAnggota & TAnggotaRelations)[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TResponse | DirectusResponse<TAnggota[]>>
) {
  try {
    switch (req.method) {
      case "GET":
        return get();

      default:
        return res.status(405).end();
    }
  } catch (error: any) {
    return res.status(error.response?.status || 500).json(error);
  }

  async function get() {
    const data = await directus<Schema>().request(
      readItems("anggota", {
        fields: [
          "id",
          "idAnggota",
          "nama",
          "alamat",
          "mutasiTabungan.nominal",
          "mutasiTabungan",
          "simpananPokok",
          "totalSimpanan",
        ],
        meta: "*",
        ...req.query,
      })
    );

    data?.map((item) => {
      const totalMutasi = (item.mutasiTabungan || [])
        .map((v: any) => v.nominal)
        .reduce((a: any, b: any) => a + b, 0);

      item.totalSimpanan = totalMutasi + item.simpananPokok;

      delete item.mutasiTabungan;

      return item;
    });

    return res.status(200).json({
      status: "success",
      data: data || [],
      meta: {
        filter_count: data?.length || 0,
        page: req.query.page ? parseInt(req.query.page as string) : 1,
        limit: req.query.limit ? parseInt(req.query.limit as string) : 10,
      },
    } as any);
  }
}
