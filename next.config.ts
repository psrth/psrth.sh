import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@pierre/diffs"],
  async rewrites() {
    return [
      {
        source: "/particle",
        destination: "https://particle-ideas-psrthsharma.vercel.app/",
      },
    ];
  },
};

export default nextConfig;
