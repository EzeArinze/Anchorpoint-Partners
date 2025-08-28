import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        port: "", // optional (empty means any port)
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        port: "", // optional (empty means any port)
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "archive.org",
        port: "", // optional (empty means any port)
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
