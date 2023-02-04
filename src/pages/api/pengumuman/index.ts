import FormData from "form-data";
import formidable from "formidable";
import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";

import directus from "@/services/api/directus";

import { TAnggota, TResponse } from "@/types";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TResponse | TAnggota>
) {
  try {
    switch (req.method) {
      case "GET":
        return get();

      case "POST":
        return post();

      default:
        return res.status(405).end();
    }
  } catch (error: any) {
    return res.status(error.response?.status || 500).json(error);
  }

  async function get() {
    const data = await directus.items("pengumuman").readByQuery({
      fields: ["id", "image", "date_created", "active"],
      sort: ["-date_created" as never],
      meta: "filter_count",
      ...req.query,
    });

    return res.status(200).json(data);
  }

  async function post() {
    const form = new formidable.IncomingForm();

    return form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({});
      }

      if ((files.image as any)?.size > 1048576) {
        return res.status(422).json({
          message: "Ukuran file terlalu besar",
        });
      }

      const formData = new FormData();
      formData.append(
        "file",
        fs.createReadStream((files.image as any).filepath),
        { contentType: "image/png" }
      );
      formData.append("title", (files.image as any).originalFilename);

      const uploadedImage = await directus.files.createOne(
        formData,
        {},
        {
          requestOptions: {
            headers: {
              "Content-Type": "multipart/form-data",
              charset: "utf-8",
              boundary: "__X_BOUNDARY__",
            },
          },
        }
      );

      await directus.items("pengumuman").createOne({
        image: uploadedImage?.id,
      });

      return res.status(200).json({});
    });
  }
}
