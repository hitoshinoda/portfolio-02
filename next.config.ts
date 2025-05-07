import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const isProdBuild = process.env.GITHUB_ACTIONS === "true";

const githubRepository = process.env.GITHUB_REPOSITORY; // Actionsが自動で設定
const repoNameFromEnv = githubRepository ? githubRepository.split('/')[1] : undefined;
console.log(`[next.config.ts] GITHUB_REPOSITORY: ${githubRepository}`);
console.log(`[next.config.ts] Extracted repoNameFromEnv: ${repoNameFromEnv}`);

const repoName = isProdBuild && repoNameFromEnv
  ? repoNameFromEnv
  : "portfolio-02"; // ★ ローカル開発時のフォールバック名 (あなたのリポジトリ名に合わせる)
console.log(`[next.config.ts] Final repoName: ${repoName}`);

const finalRepoName = repoName && repoName.length > 0 ? repoName : "portfolio-02"; // 最終的なフォールバック

const basePath = isProdBuild ? `/${finalRepoName}` : "";
const assetPrefix = basePath; // 通常、assetPrefix は basePath と同じでOK
console.log(`[next.config.ts] basePath: ${basePath}`);
console.log(`[next.config.ts] assetPrefix: ${assetPrefix}`);

const i18nConfigPath = './src/i18n/request.ts';

const withNextIntl = createNextIntlPlugin(i18nConfigPath); // ★ パスを渡す！

const nextConfig: NextConfig = {
  devIndicators: false,
  output: "export", // 静的エクスポート
  images: {
    unoptimized: true, // 静的エクスポートのため画像最適化を無効化
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