import { createDirectus, rest, staticToken } from "@directus/sdk";

const directus = <Schema extends object>() =>
    createDirectus<Schema>(process.env.DIRECTUS_URL || "")
        .with(rest())
        .with(staticToken(process.env.DIRECTUS_TOKEN || ""));

export default directus;