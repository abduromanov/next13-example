import { Directus } from "@directus/sdk";

const directus = new Directus(process.env.API_URL, {
  auth: {
    staticToken: process.env.API_TOKEN,
  },
});

export default directus;
