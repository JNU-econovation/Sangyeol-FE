import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  devIndicators: false,
  transpilePackages: ["bridge", "stack-link"],
  images: {
    remotePatterns: process.env.IMAGE_REMOTE_URL
      ? [new URL(process.env.IMAGE_REMOTE_URL)]
      : [],
  },
};

export default nextConfig;
