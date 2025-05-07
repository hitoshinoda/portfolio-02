"use client";

import { usePathname } from "next/navigation";
import { getLocalizedPath, locales, Locale } from "@/i18n/i18n";
import React from "react";

const languageNames: Record<string, string> = {
  ja: "日本語",
  en: "English",
};

export default function LanguageToggle() {
  const currentFullPath = usePathname();

  const handleLanguageChange = (locale: Locale) => {
    const newPath = getLocalizedPath(currentFullPath, locale);
    window.location.href = newPath;
  };

  return (
    <div className="language-switcher p-4 flex justify-center space-x-4">
      {locales.map((locale, index) => (
        <React.Fragment key={locale}>
          {index > 0 && <span className="mx-1 text-gray-400">|</span>}
          <button
            onClick={() => handleLanguageChange(locale)}
            className="text-gray-600 hover:text-gray-900 hover:underline"
          >
            {languageNames[locale] || locale.toUpperCase()}
          </button>
        </React.Fragment>
      ))}
    </div>
  );
}
