'use client';

import { CalendarEvent } from '@/lib/icsGenerator';
import { useTranslations } from 'next-intl';

interface EventListProps {
  events: CalendarEvent[];
  onRemove: (id: string) => void;
}

export default function EventList({ events, onRemove }: EventListProps) {
  const t = useTranslations('EventForm');
  const formatDateTime = (value: string) =>
    new Date(value).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' });

  if (events.length === 0) return null;

  return (
    <div className='card p-6 sm:p-8 space-y-4 w-full md:w-1/2 animate-fade-in'>
      <h2 className='text-lg font-semibold'>{t('events')} ({events.length})</h2>
      <ul className='space-y-2 text-left'>
        {events.map((event) => (
          <li
            key={event.id}
            className='p-4 bg-background/60 border border-primary/10 rounded-lg shadow-sm transition hover:shadow-md'
          >
            <div className='flex justify-between'>
              <div className='space-y-1'>
                <div className='font-semibold'>{event.title}</div>
                <div className='text-sm'>
                  {t('start')}: {formatDateTime(event.start)}<br />
                  {t('end')}: {formatDateTime(event.end)}
                </div>
                {event.location && (
                  <div className='text-sm'>{t('location')}: {event.location}</div>
                )}
                {event.description && (
                  <div className='text-sm'>{t('description')}: {event.description}</div>
                )}
                {event.phone && (
                  <div className='text-sm'>{t('phone')}: {event.phone}</div>
                )}
                {event.url && (
                  <div className='text-sm break-all'>
                    {t('url')}: <a href={event.url} className='text-primary underline'>{event.url}</a>
                  </div>
                )}
              </div>
              <button
                onClick={() => onRemove(event.id)}
                className='text-sm text-red-500 hover:text-red-700 transition'
              >
                {t('delete')}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

