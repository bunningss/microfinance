/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "files.edgestore.dev",
      },
    ],
  },
  experimental: {
    runtime: "nodejs",
  },
};

export default nextConfig;
