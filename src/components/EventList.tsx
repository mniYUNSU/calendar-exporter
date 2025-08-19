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
      className={`card bg-gradient-to-br from-background to-primary/10 p-4 sm:p-6 w-full md:w-1/2 animate-fade-in ${className}`}
    >
      <h2 className='text-md font-semibold pb-2'>
        {t('events')} ({events.length})
      </h2>
      <ul className={`space-y-2 text-left pt-2 ${listClassName}`}>
        {events.map((event) => (
          <li
            key={event.id}
            className='bg-gradient-to-bl from-background to-primary/5 bg-background/80 backdrop-blur border border-primary/20 rounded-2xl p-4 shadow-sm transition hover:shadow-md shadow-primary/10'
          >
            <div className='flex justify-between gap-2'>
              <div className='w-full space-y-1 break-all'>
                <div className='font-semibold'>{event.title}</div>
                <div className='flex flex-row justify-between w-full'>
                  <div className='flex flex-col text-sm '>
                    <p className='font-semibold'>{t('start')}</p>
                    <p className=''>{formatDateTime(event.start)}</p>
                  </div>
                  <div className='flex flex-col text-sm '>
                    <p className='font-semibold'>{t('end')}</p>
                    <p className=''>{formatDateTime(event.end)}</p>
                  </div>
                </div>
                {event.location && (
                  <div className='max-w-full text-sm flex flex-row gap-2 items-start'>
                    <p className='font-semibold min-w-fit'>{t('location')}</p>
                    <p className='w-full'>{event.location}</p>
                  </div>
                )}
                {event.description && (
                  <div className='text-sm flex flex-row gap-2 items-start'>
                    <p className='font-semibold min-w-fit'>
                      {t('description')}
                    </p>
                    <p className=''>{event.description}</p>
                  </div>
                )}
                {event.phone && (
                  <div className='text-sm flex flex-row gap-2 items-start'>
                    <p className='font-semibold min-w-fit'>{t('phone')}</p>
                    <p className=''>{event.phone}</p>
                  </div>
                )}
                {event.url && (
                  <div className='break-all text-sm flex flex-row gap-2 items-start'>
                    <p className='font-semibold min-w-fit'>{t('url')}</p>
                    <a href={event.url} className='text-primary underline'>
                      {event.url}
                    </a>
                  </div>
                )}
              </div>
              <button
                onClick={() => onRemove(event.id)}
                className='text-sm text-red-500 hover:text-red-700 transition min-w-fit p-2'
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
