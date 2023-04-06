import _ from "lodash";
import { NextApiRequest, NextApiResponse } from "next";

import directus from "@/services/api/directus";

import { TResponse } from "@/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TResponse | string[]>
) {
  try {
    const filter = {
      _and: [
        {
          murobahah: {
            _eq: parseInt(req.query.id as string),
          },
        },
      ],
    };
    const data = await directus.items("mutasiMurobahah").readByQuery({
      fields: ["year(tglBayar)"],
      meta: "*",
      filter: filter,
      ...req.query,
    });

    const listTahun = _.uniq(data?.data?.map((v) => `${v.tglBayar_year}`));

    return res.status(200).json({
      data: listTahun,
    });
  } catch (error: any) {
    return res.status(error.response?.status || 500).json(error);
  }
}
