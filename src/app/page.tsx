'use client';

import EventForm from '@/components/EventForm';
import EventList from '@/components/EventList';
import DownloadButton from '@/components/DownloadButton';
import { useState } from 'react';
import { CalendarEvent } from '@/lib/icsGenerator';
import { useTranslations } from 'next-intl';

export default function HomePage() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const t = useTranslations('Home');

  const handleAdd = (event: CalendarEvent) => {
    setEvents((prev) => [...prev, event]);
  };

  const handleRemove = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <main className='min-h-screen bg-gradient-to-b from-white to-slate-100 px-4 py-10 text-center'>
      <div className='max-w-2xl mx-auto'>
        <h1 className='text-3xl md:text-5xl font-bold mb-4 text-gray-800'>
          {`📅 ${t('title')}`}
        </h1>
        <p className='text-gray-600 mb-10 text-sm md:text-base'>
          Create a calendar file (.ics) for your events. Supports English &
          한국어.
        </p>

        <EventForm onAdd={handleAdd} onRemove={handleRemove} events={events} />
        {/* <EventList events={events} onRemove={handleRemove} /> */}
        <DownloadButton events={events} />

        <footer className='mt-16 text-xs text-gray-400'>
          Made with ❤️ by Radiant Lampfish – 다국어 지원 테스트 중
        </footer>
      </div>
    </main>
  );
}
