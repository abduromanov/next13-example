import { createDirectus, rest, staticToken } from "@directus/sdk";

const directus = createDirectus(process.env.API_URL)
  .with(rest())
  .with(staticToken(process.env.API_TOKEN));

export default directus;
