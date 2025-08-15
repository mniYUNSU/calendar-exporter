'use client';

import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useState, useEffect, useRef } from 'react';

const locales = [
  { value: 'ko', label: '한국어' },
  { value: 'en', label: 'English' },
  { value: 'ja', label: '日本語' }
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
    <div className='relative' ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className='p-2 border rounded-full text-sm hover:bg-primary/10 transition'
      >
        {currentLabel}
      </button>
      {open && (
        <div className='absolute right-0 mt-2 w-32 bg-background border rounded-lg shadow'>
          {locales.map((locale) => (
            <button
              key={locale.value}
              onClick={() => handleSelect(locale.value)}
              className='block w-full text-left px-4 py-2 text-sm hover:bg-primary/10'
            >
              {locale.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
