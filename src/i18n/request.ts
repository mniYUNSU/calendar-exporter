import { getRequestConfig } from 'next-intl/server';
import { cookies, headers } from 'next/headers';

export default getRequestConfig(async () => {
  const defaultLocale = 'en';
  const supportedLocales = ['en', 'ko', 'ja'];

  const h = await headers();
  const c = await cookies();

  const acceptLanguage = h.get('accept-language') || '';
  const cookieLocale = c.get('NEXT_LOCALE')?.value;

  const preferredLang = acceptLanguage.split(',')[0].split('-')[0];

  const locale = supportedLocales.includes(cookieLocale || '')
    ? cookieLocale!
    : supportedLocales.includes(preferredLang)
    ? preferredLang
    : defaultLocale;

  return {
    locale,
    messages: (await import(`@/messages/${locale}.json`)).default
  };
});
