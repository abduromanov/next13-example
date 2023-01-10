import { NextApiRequest, NextApiResponse } from "next";

import directus from "@/services/api/directus";

import { TAnggota, TResponse } from "@/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TResponse | TAnggota>
) {
  try {
    if (!req.query.id) {
      return res.status(404).json({});
    }

    const data: TAnggota = await directus.items('anggota').readOne(req.query.id as string, {
      fields: ['id', 'idAnggota', 'nama', 'alamat', 'isPasswordBaru', 'status'],
    });

    res.status(200).json(data)
  } catch (error: any) {
    return res.status(error.response.status).json(error);
  }
};
