import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const isProdBuild = process.env.GITHUB_ACTIONS === "true";
const repoName = isProdBuild
  ? process.env.GITHUB_REPOSITORY_NAME
  : "portfolio-02";

const basePath = isProdBuild ? `/${repoName}` : "";
const assetPrefix = isProdBuild ? `/${repoName}/` : "";

const withNextIntl = createNextIntlPlugin();
const nextConfig: NextConfig = {
  devIndicators: false,
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  basePath: basePath,
  assetPrefix: assetPrefix,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  reactStrictMode: true,
};

export default withNextIntl(nextConfig);
