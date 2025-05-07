// import type { NextConfig } from "next";
// import createNextIntlPlugin from "next-intl/plugin";

// const isProdBuild = process.env.GITHUB_ACTIONS === "true";
// const repoName = isProdBuild
//   ? process.env.GITHUB_REPOSITORY_NAME
//   : "portfolio-02";

// const basePath = isProdBuild ? `/${repoName}` : "";
// const assetPrefix = isProdBuild ? `/${repoName}/` : "";


// const nextConfig: NextConfig = {
//   devIndicators: false,
//   output: "export",
//   images: {
//     unoptimized: true,
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: '**',
//       },
//     ],
//   },
//   basePath: basePath,
//   assetPrefix: assetPrefix,
//   env: {
//     NEXT_PUBLIC_BASE_PATH: basePath,
//   },
//   reactStrictMode: true,
// };

// const withNextIntl = createNextIntlPlugin();
// export default withNextIntl(nextConfig);


// next.config.ts
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const isProdBuild = process.env.GITHUB_ACTIONS === "true";

// ★ GITHUB_REPOSITORY 環境変数 (owner/repo-name) からリポジトリ名を取得
const githubRepository = process.env.GITHUB_REPOSITORY; // Actionsが自動で設定
const repoNameFromEnv = githubRepository ? githubRepository.split('/')[1] : undefined;
console.log(`[next.config.ts] GITHUB_REPOSITORY: ${githubRepository}`);
console.log(`[next.config.ts] Extracted repoNameFromEnv: ${repoNameFromEnv}`);

// isProdBuildがtrue かつ repoNameFromEnvが取得できた場合のみ使用
const repoName = isProdBuild && repoNameFromEnv
  ? repoNameFromEnv
  : "portfolio-02"; // ★ ローカル開発時のフォールバック名 (あなたのリポジトリ名に合わせる)
console.log(`[next.config.ts] Final repoName: ${repoName}`);

// repoNameが空文字列やundefinedでないことを確認
const finalRepoName = repoName && repoName.length > 0 ? repoName : "portfolio-02"; // 最終的なフォールバック

const basePath = isProdBuild ? `/${finalRepoName}` : "";
const assetPrefix = basePath; // 通常、assetPrefix は basePath と同じでOK
console.log(`[next.config.ts] basePath: ${basePath}`);
console.log(`[next.config.ts] assetPrefix: ${assetPrefix}`);

// ★★★ next-intl設定ファイルへの正しいパスを指定 ★★★
// あなたのファイルは src/i18n/request.ts のようなので、このパスを指定します。
// もしファイル名や場所が違う場合は、ここを正確に修正してください。
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
  basePath: basePath,         // ★ 正しく設定
  assetPrefix: assetPrefix,     // ★ 正しく設定
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath, // ★ クライアントサイド用
  },
  reactStrictMode: true,
  // trailingSlash: true, // GitHub Pagesでサブディレクトリ公開の場合、true を検討
  // redirects は必要なら以前の設定を追加
};

export default withNextIntl(nextConfig);