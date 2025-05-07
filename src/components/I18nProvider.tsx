'use client';

import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';

export default function I18nProvider({ 
  children, 
  locale, 
  messages 
}: { 
  children: ReactNode;
  locale: string;
  messages: Record<string, Record<string, string>>;
}) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}