import { NextApiRequest, NextApiResponse } from "next";

import directus from "@/services/api/directus";

import { DirectusResponse, TAnggota, TResponse } from "@/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TResponse | DirectusResponse<TAnggota>>
) {
  try {
    if (!req.query.id) {
      return res.status(404).json({});
    }

    const fields = ['id', 'idAnggota', 'nama', 'alamat', 'isPasswordBaru', 'status', 'tglDibuat', 'tglDihapus', 'mutasiTabungan', ...(req.query.fields as string).split(",")];

    delete req.query.fields;

    const data: TAnggota = await directus.items('anggota').readOne(req.query.id as string, {
      fields: fields,
    });

    return res.status(200).json({
      data: data
    })
  } catch (error: any) {
    return res.status(error.response?.status || 500).json(error);
  }
};
