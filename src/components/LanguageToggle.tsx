"use client";

import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { routing } from "@/i18n/routing";

export const LanguageToggle = () => {
  const locale = useLocale();
  const router = useRouter();

  return (
    <div className="flex gap-2">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          onClick={() => router.push(`/${loc}`)}
          className={`px-2 py-1 text-sm ${
            loc === locale
              ? "text-gray-400 cursor-default"
              : "text-gray-700 hover:text-gray-900"
          }`}
          disabled={loc === locale}
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </div>
  );
};
