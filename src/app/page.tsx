import { getMessages, defaultLocale } from "@/i18n/i18n";
import I18nProvider from "@/components/I18nProvider";
import HomePage from "@/components/HomePage";

export default async function Home() {
  // 日本語のメッセージを取得
  const messages = await getMessages(defaultLocale);

  return (
    <I18nProvider locale={defaultLocale} messages={messages}>
      <HomePage />
    </I18nProvider>
  );
}
