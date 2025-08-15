'use client';

import EventForm from '@/components/EventForm';
import DownloadButton from '@/components/DownloadButton';
import EventList from '@/components/EventList';
import Footer from '@/components/Footer';
import { useState } from 'react';
import { CalendarEvent } from '@/lib/icsGenerator';
import { useTranslations } from 'next-intl';

export default function HomePage() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [showEvents, setShowEvents] = useState(false);
  const t = useTranslations('Home');
  const formT = useTranslations('EventForm');

  const handleAdd = (event: CalendarEvent) => {
    setEvents((prev) => [...prev, event]);
  };

  const handleRemove = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <main className='p-4 bg-gradient-to-br from-background to-primary/10 text-foreground transition-colors flex items-center justify-center'>
      <div className='w-full max-w-4xl space-y-8 animate-fade-in'>
        <div className='text-center space-y-2'>
          <h1 className='text-3xl md:text-5xl font-bold'>{`📅 ${t(
            'title'
          )}`}</h1>
          <p className='text-sm md:text-base opacity-80'>
            Create a calendar file (.ics) for your events. Supports English,
            日本語 & 한국어.
          </p>
        </div>

        <div className='flex flex-col justify-center md:flex-row gap-8 md:items-start'>
          <EventForm onAdd={handleAdd} />
          <EventList
            events={events}
            onRemove={handleRemove}
            className='hidden md:block'
          />
        </div>

        <DownloadButton events={events} />

        {events.length > 0 && (
          <div className='sticky bottom-4 left-0 right-0 flex justify-center md:hidden'>
            <div className='relative w-full max-w-md'>
              <div
                className={`absolute bottom-full mb-2 w-full transition-all duration-300 ${
                  showEvents
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-1/7 opacity-0 pointer-events-none'
                }`}
              >
                <EventList
                  events={events}
                  onRemove={handleRemove}
                  listClassName='max-h-60 overflow-y-auto'
                />
              </div>
              <button
                onClick={() => setShowEvents((s) => !s)}
                className='card px-4 py-2 text-sm shadow w-full'
              >
                {formT('events')} ({events.length})
              </button>
            </div>
          </div>
        )}

        <Footer />
      </div>
    </main>
  );
}
