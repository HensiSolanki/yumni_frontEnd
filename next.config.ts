import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const apiProxyTarget = process.env.API_PROXY_TARGET;

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

  // Dev: browser calls same-origin /api-proxy/* → Next forwards to API (avoids CORS).
  // Set API_PROXY_TARGET=https://admin.property973.com and NEXT_PUBLIC_API_BASE_URL=/api-proxy
  async rewrites() {
    if (!apiProxyTarget?.startsWith("http")) {
      return [];
    }
    const origin = apiProxyTarget.replace(/\/$/, "");
    return [
      {
        source: "/api-proxy/:path*",
        destination: `${origin}/:path*`,
      },
    ];
  },
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
