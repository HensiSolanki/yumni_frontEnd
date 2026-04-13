const nextConfig = {
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
};

export default nextConfig;
