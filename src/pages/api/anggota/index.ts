import { NextApiRequest, NextApiResponse } from "next";

import directus from "@/services/api/directus";

import { TAnggota, TResponse } from "@/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TResponse | TAnggota>
) {
  try {
    const fields = ['id', 'idAnggota', 'nama', 'alamat', 'isPasswordBaru', 'status', 'tglDibuat', 'tglDihapus', 'mutasiTabungan', ...(req.query.fields as string).split(",")];

    delete req.query.fields;

    const data = await directus.items('anggota').readByQuery({
      fields: fields,
      meta: '*',
      filter: {
        tglDihapus: {
          _null: true
        }
      },
      ...req.query,
    });

    return res.status(200).json(data);
  } catch (error: any) {
    return res.status(error.response?.status || 500).json(error);
  }
};
