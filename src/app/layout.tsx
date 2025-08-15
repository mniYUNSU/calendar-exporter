import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';
import { getLocale, getTranslations } from 'next-intl/server';

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import LocaleSwitcher from '@/components/LocaleSwitcher';
import ThemeProvider from '@/components/ThemeProvider';
import ThemeToggle from '@/components/ThemeToggle';
import TutorialModal from '@/components/TutorialModal';
import Logo from '@/components/Logo';

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

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`min-h-screen ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <NextIntlClientProvider>
            <div className='flex justify-between gap-2 p-4 sticky top-0 z-10 backdrop-blur bg-gradient-to-br from-background to-primary/5'>
              <Logo />
              <div className='flex justify-end gap-2'>
                <TutorialModal />
                <LocaleSwitcher />
                <ThemeToggle />
              </div>
            </div>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
