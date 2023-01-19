import { NextApiRequest, NextApiResponse } from "next";

import directus from "@/services/api/directus";

import { TMutasiSyirkah, TResponse } from "@/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TResponse | TMutasiSyirkah>
) {
  try {
    const filter = {
      _and: [{
        murobahah: {
          _eq: parseInt(req.query.id as string)
        }
      }]
    }

    if (req.query.filter) {
      filter._and.push(JSON.parse(req.query.filter as string));
    }

    delete req.query.filter;

    const data = await directus.items('mutasiSyirkah').readByQuery({
      fields: ['*'],
      meta: '*',
      filter: filter,
      ...req.query,
    });

    return res.status(200).json(data);
  } catch (error: any) {
    return res.status(error.response?.status || 500).json(error);
  }
};
