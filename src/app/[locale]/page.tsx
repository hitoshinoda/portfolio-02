// src/app/[locale]/page.tsx
import { getMessages, locales } from "@/i18n/i18n";
import I18nProvider from "@/components/I18nProvider";
import HomePage from "@/components/HomePage";

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function LocalizedHome({ params }: Props) {
  const { locale } = await params;

  // 指定された言語のメッセージを取得
  const messages = await getMessages(locale);

  return (
    <I18nProvider locale={locale} messages={messages}>
      <HomePage />
    </I18nProvider>
  );
}

// SSGのためのパラメータ生成
export function generateStaticParams() {
  return locales
    .map((locale) => ({
      locale,
    }));
}
