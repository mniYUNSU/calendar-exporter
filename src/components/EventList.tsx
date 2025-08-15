'use client';

import { CalendarEvent } from '@/lib/icsGenerator';
import { useTranslations } from 'next-intl';

interface EventListProps {
  events: CalendarEvent[];
  onRemove: (id: string) => void;
  className?: string;
  listClassName?: string;
}

export default function EventList({
  events,
  onRemove,
  className = '',
  listClassName = ''
}: EventListProps) {
  const t = useTranslations('EventForm');
  const formatDateTime = (value: string) =>
    new Date(value).toLocaleString([], {
      dateStyle: 'short',
      timeStyle: 'short'
    });

  if (events.length === 0) return null;

  return (
    <div
      className={`card bg-gradient-to-br from-background to-primary/10 p-2 sm:p-8 w-full md:w-1/2 animate-fade-in ${className}`}
    >
      <h2 className='text-lg font-semibold px-4 py-2'>
        {t('events')} ({events.length})
      </h2>
      <ul className={`space-y-2 text-left p-4 ${listClassName}`}>
        {events.map((event) => (
          <li
            key={event.id}
            className='bg-gradient-to-bl from-background to-primary/5 bg-background/80 backdrop-blur border border-primary/20 rounded-2xl p-4 shadow-sm transition hover:shadow-md shadow-primary/10'
          >
            <div className='flex justify-between'>
              <div className='space-y-1'>
                <div className='font-semibold'>{event.title}</div>
                <div className='text-sm'>
                  {t('start')}: {formatDateTime(event.start)}
                  <br />
                  {t('end')}: {formatDateTime(event.end)}
                </div>
                {event.location && (
                  <div className='text-sm'>
                    {t('location')}: {event.location}
                  </div>
                )}
                {event.description && (
                  <div className='text-sm'>
                    {t('description')}: {event.description}
                  </div>
                )}
                {event.phone && (
                  <div className='text-sm'>
                    {t('phone')}: {event.phone}
                  </div>
                )}
                {event.url && (
                  <div className='text-sm break-all'>
                    {t('url')}:{' '}
                    <a href={event.url} className='text-primary underline'>
                      {event.url}
                    </a>
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
