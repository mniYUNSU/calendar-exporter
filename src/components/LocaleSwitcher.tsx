'use client';

import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

const locales = [
  { value: 'ko', label: '🇰🇷 한국어' },
  { value: 'en', label: '🇺🇸 English' },
  { value: 'ja', label: '🇯🇵 日本語' }
];

export default function LocaleSwitcher() {
  const currentLocale = useLocale();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  const handleSelect = (newLocale: string) => {
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/`;
    setOpen(false);
    router.refresh();
  };

  const currentLabel = locales.find((l) => l.value === currentLocale)?.label;

  return (
    <div className='rounded-full relative w-full' ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className='rounded-full px-2 py-1 text-xl hover:bg-ggprimary/10 transition'
      >
        {currentLabel?.split(' ')[0]}
      </button>
      {open && (
        <div className='absolute right-0 top-8 w-26 border-2 border-ggprimary/50 bg-ggbackground/80 backdrop-blur rounded-md shadow'>
          {locales.map((locale, index) => (
            <button
              key={locale.value}
              onClick={() => handleSelect(locale.value)}
              className={cn(
                `block w-full text-left px-4 py-2 text-md hover:bg-ggprimary/10 text-ggforeground border-b border-ggborder text-sm`,
                index === 2 && `border-none`
              )}
            >
              {locale.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
