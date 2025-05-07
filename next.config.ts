// next.config.ts
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const isProdBuild = process.env.GITHUB_ACTIONS === "true";
const githubRepository = process.env.GITHUB_REPOSITORY;
const repoNameFromEnv = githubRepository
  ? githubRepository.split("/")[1]
  : undefined;
const repoName =
  isProdBuild && repoNameFromEnv ? repoNameFromEnv : "portfolio-02";
const finalRepoName =
  repoName && repoName.length > 0 ? repoName : "portfolio-02";

const basePath = isProdBuild ? `/${finalRepoName}` : "";
const assetPrefix = basePath;

const i18nConfigPath = "./src/i18n/request.ts";
const withNextIntl = createNextIntlPlugin(i18nConfigPath);

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath,
  assetPrefix: assetPrefix,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  reactStrictMode: true,
  trailingSlash: true,
  devIndicators: false,
};

export default withNextIntl(nextConfig);
