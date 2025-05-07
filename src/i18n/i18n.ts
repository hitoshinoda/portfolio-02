export const locales = ["en", "ja"];
export const defaultLocale = "ja";

// URLパスから現在の言語を取得
export function getLocaleFromPath(path: string): string {
  const segments = path.split("/").filter(Boolean);
  const possibleLocale = segments[0];

  if (locales.includes(possibleLocale) && possibleLocale !== defaultLocale) {
    return possibleLocale;
  }

  return defaultLocale;
}

// 特定の言語のメッセージを取得
export async function getMessages(locale: string) {
  return (await import(`@/i18n/${locale}/HomePage.json`)).default;
}

// 言語切り替え用のURL生成
export function getLocalizedPath(path: string, newLocale: string): string {
  const currentLocale = getLocaleFromPath(path);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  // 現在のパスから言語部分を削除
  let cleanPath = path;
  if (currentLocale !== defaultLocale) {
    cleanPath = path.replace(`/${currentLocale}`, "") || "/";
  }

  // 新しい言語のパスを作成
  if (newLocale === defaultLocale) {
    return `${basePath}${cleanPath}`;
  } else {
    return `${basePath}/${newLocale}${cleanPath === "/" ? "" : cleanPath}`;
  }
}
