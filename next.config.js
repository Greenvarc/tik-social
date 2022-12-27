/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  images: {
    domains: ["images8.alphacoders.com", "lh3.googleusercontent.com"],
  },
};

module.exports = nextConfig;
