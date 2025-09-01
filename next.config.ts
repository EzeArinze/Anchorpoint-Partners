import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "1ylyxif5c1.ufs.sh",
        port: "", // optional (empty means any port)
        pathname: "/f/**",
      },
    ],
  },
};

export default nextConfig;
