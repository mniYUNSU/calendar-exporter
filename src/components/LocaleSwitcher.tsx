'use client';

import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { ChangeEvent } from 'react';

export default function LocaleSwitcher() {
  const currentLocale = useLocale();
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/`;
    router.refresh();
  };

  return (
    <select
      value={currentLocale}
      onChange={handleChange}
      className='p-2 border rounded-full text-sm bg-background text-foreground hover:bg-primary/10 transition'
    >
      <option value='ko'>한국어</option>
      <option value='en'>English</option>
      <option value='ja'>日本語</option>
    </select>
  );
}
