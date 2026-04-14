import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },

  env: {
    NEXT_PUBLIC_PROJECT_ENV: process.env.NEXT_PUBLIC_PROJECT_ENV,
  },
  // images: {
  //   domains: ["fetishfinder-media.dryrun.click"],
  // },
  reactStrictMode: false,
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: "https",
  //       hostname: "fetishfinder-media.dryrun.click",
  //       pathname: "**",
  //     },
  //   ],
  // },
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default withNextIntl(nextConfig);
