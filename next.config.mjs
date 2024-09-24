/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: process.env.API_URL,
  },
  images: {
    domains: [process.env.S3_BUCKET_URL],
  },
};

export default nextConfig;
