/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["directus.imj.sch.id"],
  },
  env: {
    APP_NAME: process.env.NEXT_APP_NAME,
    API_URL: process.env.NEXT_API_URL,
    API_TOKEN: process.env.NEXT_API_TOKEN,
  },
};

module.exports = nextConfig;
