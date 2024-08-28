import { readItems, verifyHash } from "@directus/sdk";
import { NextApiRequest, NextApiResponse } from "next";

import directus from "@/services/api/directus";

import { TAnggota, TResponse } from "@/types";

interface Schema {
  anggota: TAnggota[];
}

export default async function login(
  req: NextApiRequest,
  res: NextApiResponse<TResponse | Partial<TAnggota>>
) {
  try {
    if (req.method !== "POST") {
      return res.status(405).end();
    }

    const data = await directus<Schema>().request(
      readItems("anggota", {
        fields: [
          "id",
          "idAnggota",
          "nama",
          "alamat",
          "isPasswordBaru",
          "status",
          "tglDibuat",
          "tglDihapus",
          "role",
        ],
        filter: {
          idAnggota: {
            _eq: req.body.idAnggota,
          },
          tglDihapus: {
            _null: true,
          },
        },
        limit: 1,
      })
    );

    const dataAnggota: Partial<TAnggota> = data[0];
    const isPasswordTrue = await directus().request(verifyHash(req.body.password, dataAnggota?.password || ""));

    if (data.length === 0 || isPasswordTrue) {
      return res.status(404).json({});
    }

    return res.status(200).json(data[0]);
  } catch (error: any) {
    return res.status(error.response.status).json(error);
  }
}
