import _ from "lodash";
import { NextApiRequest, NextApiResponse } from "next";

import directus from "@/services/api/directus";

import { TAnggota, TResponse } from "@/types";

export default async function login(
  req: NextApiRequest,
  res: NextApiResponse<TResponse | Partial<TAnggota>>,
) {
  try {
    const data = await directus.items('anggota').readByQuery({
      fields: ['id', 'idAnggota', 'nama', 'alamat', 'isPasswordBaru', 'status', 'password'],
      limit: 1,
      filter: {
        idAnggota: {
          _eq: req.body.idAnggota
        }
      }
    });

    const dataAnggota: Partial<TAnggota> = _.head(data.data);
    const isPasswordTrue = await directus.utils.hash.verify(req.body.password, dataAnggota?.password || '');

    if (data.data?.length === 0 || !isPasswordTrue) {
      return res.status(404).json({})
    }

    delete dataAnggota?.password;

    return res.status(200).json(dataAnggota);
  } catch (error: any) {
    return res.status(error.response.status).json(error);
  }
};
