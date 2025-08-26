import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';
import { getLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import ThemeProvider from '@/components/ThemeProvider';
import NavigationBar from '@/components/NavigationBar';

import './globals.css';
import Script from 'next/script';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

const locales = ['en', 'ko', 'ja'] as const;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations('Home');

  const title = `${t('title')} - ${t('mainTitle')}`;
  const description = t('description');
  const keywords = t('keywords')
    .split(',')
    .map((k) => k.trim());

  return {
    title,
    description,
    keywords,
    alternates: {
      languages: {
        en: '/en',
        ko: '/ko',
        ja: '/ja'
      }
    },
    openGraph: {
      title,
      description,
      locale,
      siteName: title,
      type: 'website',
      alternateLocale: locales.filter((l) => l !== locale)
    },
    twitter: {
      card: 'summary',
      title,
      description
    }
  };
}

export default async function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  const locale = await getLocale();
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <NextIntlClientProvider>
            <NavigationBar />
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
        <Script
          id='google-maps-script'
          src={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=weekly&libraries=places&loading=async`}
          async
          defer
          strategy='beforeInteractive' // Or "beforeInteractive" for earlier loading
        />
      </body>
    </html>
  );
}
