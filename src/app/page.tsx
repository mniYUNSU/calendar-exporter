'use client';

import EventForm from '@/components/EventForm';
import DownloadButton from '@/components/DownloadButton';
import EventList from '@/components/EventList';
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
    <main className='min-h-screen bg-gradient-to-br from-background to-primary/10 text-foreground px-4 py-10 transition-colors flex items-center justify-center'>
      <div className='w-full max-w-4xl space-y-8 animate-fade-in'>
        <div className='text-center space-y-2'>
          <h1 className='text-3xl md:text-5xl font-bold'>{`📅 ${t('title')}`}</h1>
          <p className='text-sm md:text-base opacity-80'>
            Create a calendar file (.ics) for your events. Supports English,
            日本語 & 한국어.
          </p>
        </div>

        <div className='flex flex-col md:flex-row gap-8 md:items-start'>
          <EventForm onAdd={handleAdd} />
          <EventList events={events} onRemove={handleRemove} />
        </div>

        <DownloadButton events={events} />

        <footer className='pt-6 text-xs opacity-60 text-center'>
          Made by Yunsu Bae - 다국어 지원 테스트 중
        </footer>
      </div>
    </main>
  );
}

