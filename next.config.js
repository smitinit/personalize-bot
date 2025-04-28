import "./src/env.js";

/** @type {import("next").NextConfig} */

const coreConfig = {
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

import { withSentryConfig } from "@sentry/nextjs";

const config = withSentryConfig(coreConfig, {
  org: "persona-bot",
  project: "javascript-nextjs",

  silent: !process.env.CI,

  widenClientFileUpload: true,

  tunnelRoute: "/monitoring",

  disableLogger: true,

  automaticVercelMonitors: true,
});

export default config;
