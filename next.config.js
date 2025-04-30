import "./src/env.js";

/** @type {import("next").NextConfig} */

const config = {
  images: {
    remotePatterns: [
      { hostname: "jx3ho0f5cb.ufs.shutfs.io" },
      { hostname: "jx3ho0f5cb.ufs.sh" },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default config;
