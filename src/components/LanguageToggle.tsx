"use client";

import { usePathname } from "next/navigation";
import { getLocalizedPath, locales } from "@/i18n/i18n";

const languageNames: Record<string, string> = {
  ja: "日本語",
  en: "English",
  fr: "Français",
  es: "Español",
  de: "Deutsch",
  it: "Italiano",
  zh: "中文",
  ko: "한국어",
  ru: "Русский",
  pt: "Português",
};

export default function LanguageToggle() {
  const pathname = usePathname();

  const handleLanguageChange = (locale: string) => {
    const newPath = getLocalizedPath(pathname, locale);
    window.location.href = newPath;
  };

  return (
    <div className="language-switcher">
      {locales
        .map((locale) => (
          <button
            key={locale}
            onClick={() => handleLanguageChange(locale)}
            className="hover:underline"
          >
            {languageNames[locale]}
          </button>
        ))
        .reduce((prev, curr, i) => (
          <>
            {prev} {i > 0 ? " | " : ""} {curr}
          </>
        ))}
    </div>
  );
}
