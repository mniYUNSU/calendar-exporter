'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';

import { CalendarEvent } from '@/lib/icsGenerator';

import EventForm from '@/components/EventForm';
import DownloadButton from '@/components/DownloadButton';
import EventList from '@/components/EventList';
import Footer from '@/components/Footer';
import ClickSpark from '@/components/ClickSpark';

export default function HomePage() {
  const { theme } = useTheme();

  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [showEvents, setShowEvents] = useState(false);
  const formT = useTranslations('EventForm');

  const handleAdd = (event: CalendarEvent) => {
    setEvents((prev) => [...prev, event]);
  };

  const handleRemove = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <ClickSpark
      sparkColor={theme === 'dark' ? '#f4f0ff' : '#4f46e5'}
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      <main className='min-h-screen p-4 bg-gradient-to-br from-ggbackground/70 to-ggprimary/10 text-ggforeground transition-colors flex items-center justify-center'>
        <div className='w-full max-w-4xl space-y-8 animate-fade-in'>
          <div className='flex flex-col justify-center md:flex-row gap-8 md:items-start'>
            <EventForm onAdd={handleAdd} />
            <EventList
              events={events}
              onRemove={handleRemove}
              className='hidden md:block'
            />
          </div>

          <DownloadButton events={events} />
          <Footer />

          {events.length > 0 && (
            <div className='absolute sticky bottom-5 z-40 left-0 right-0 flex justify-center md:hidden'>
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
        </div>
      </main>
    </ClickSpark>
  );
}
