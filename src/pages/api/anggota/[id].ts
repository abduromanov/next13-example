import moment from "moment";
import { NextApiRequest, NextApiResponse } from "next";

import directus from "@/services/api/directus";

import { DirectusResponse, TAnggota, TResponse } from "@/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TResponse | DirectusResponse<TAnggota>>
) {
  if (!req.query.id) {
    return res.status(404).end();
  }

  try {
    switch (req.method) {
      case "GET":
        return get();

      case "PUT":
        return update();

      case "PATCH":
        return update();

      case "DELETE":
        return destroy();

      default:
        return res.status(405).end();
    }
  } catch (error: any) {
    return res.status(error.response?.status || 500).json(error);
  }

  async function get() {
    const fields = [...((req.query.fields as string) || "").split(",")].filter(
      (item) => item
    );

    delete req.query.fields;

    const data: TAnggota = await directus
      .items("anggota")
      .readOne(req.query.id as string, {
        fields: [
          "id",
          "idAnggota",
          "nama",
          "alamat",
          "isPasswordBaru",
          "status",
          "tglDibuat",
          "tglDihapus",
          ...fields,
        ],
      });

    return res.status(200).json({
      data: data,
    });
  }

  async function update() {
    const request = req.body;

    if (!request.password) {
      delete request.password;
    }

    await directus.items("anggota").updateOne(req.query.id as string, request);

    return res.status(200).end();
  }

  async function destroy() {
    await directus.items("anggota").updateOne(req.query.id as string, {
      tglDihapus: moment(),
    });

    return res.status(200).end();
  }
}
