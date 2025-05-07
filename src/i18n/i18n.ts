// src/i18n/i18n.ts
export type Locale = 'en' | 'ja';
export const locales: readonly Locale[] = ['en', 'ja'] as const;
export const defaultLocale: Locale = 'ja';

/**
 * @param fullPath window.location.pathname や next/navigation の usePathname() から取得したパス
 * @returns \{ currentLocale: Locale, cleanPath: string, detectedBasePath: string }
 */
function analyzeFullPath(fullPath: string): { currentLocale: Locale; cleanPath: string; detectedBasePath: string } {
  const envBasePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  let pathRelativeToBase = fullPath;

  if (envBasePath && pathRelativeToBase.startsWith(envBasePath)) {
    pathRelativeToBase = pathRelativeToBase.substring(envBasePath.length);
  }

  if (pathRelativeToBase === "") pathRelativeToBase = "/";

  const segments = pathRelativeToBase.split('/').filter(Boolean); // 先頭の / や空セグメントを除去
  let detectedLocale: Locale = defaultLocale;
  let pathSegmentsAfterLocale: string[] = [];

  if (segments.length > 0 && locales.includes(segments[0] as Locale)) {
    detectedLocale = segments[0] as Locale;
    pathSegmentsAfterLocale = segments.slice(1); // ロケール部分を除去した残りのセグメント
  } else {
    detectedLocale = defaultLocale;
    pathSegmentsAfterLocale = segments;
  }

  let cleanPath = "/" + pathSegmentsAfterLocale.join('/');
  if (cleanPath !== "/" && cleanPath.endsWith("/")) {
    cleanPath = cleanPath.slice(0, -1);
  }
  if (cleanPath === "") cleanPath = "/";

  return { currentLocale: detectedLocale, cleanPath, detectedBasePath: envBasePath };
}


export function getLocaleFromPath(path: string): Locale {
  return analyzeFullPath(path).currentLocale;
}

export async function getMessages(locale: string) {
  let targetLocale = locale;
  if (!locales.includes(locale as Locale)) {
    console.warn(`[i18n.ts] getMessages: Unsupported locale "${locale}", falling back to "${defaultLocale}"`);
    targetLocale = defaultLocale;
  }
  try {
    return (await import(`./${targetLocale}/HomePage.json`)).default;
  } catch (e) {
    console.error(`[i18n.ts] Failed to load messages in getMessages for ${targetLocale}:`, e);
    return {};
  }
}

export function getLocalizedPath(currentFullPath: string, newLocale: Locale): string {
  const { cleanPath, detectedBasePath } = analyzeFullPath(currentFullPath);
  let newPathSuffix;

  if (newLocale === defaultLocale) {
    newPathSuffix = cleanPath;
  } else {
    newPathSuffix = `/${newLocale}${cleanPath === "/" ? "" : cleanPath}`;
  }

  const finalPath = `${detectedBasePath}${newPathSuffix}`;

  if (finalPath !== "/" && finalPath !== detectedBasePath && !finalPath.endsWith("/")) {
    return finalPath + "/";
  }
  if (finalPath === detectedBasePath && finalPath !== "/") {
     return finalPath + "/";
  }
  if (finalPath === "") return "/";

  return finalPath;
}