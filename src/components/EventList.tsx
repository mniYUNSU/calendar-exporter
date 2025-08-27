'use client';

import { CalendarEvent } from '@/lib/icsGenerator';
import { Phone, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import DownloadButton from './DownloadButton';
import ShinyText from './ShinyText';

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
      className={`backdrop-blur-sm border border-ggprimary/20 rounded-2xl shadow-lg shadow-ggprimary/10 bg-gradient-to-br from-ggbackground/100 to-ggprimary/10 p-4 sm:p-6 w-full md:w-1/2 animate-fade-in ${className} text-ggforeground md:from-ggbackground/30`}
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
            <div className='flex justify-between items-center gap-2'>
              <div className='w-full space-y-1 break-all'>
                <ShinyText
                  text={event.title}
                  className='text-ggforeground/70 font-semibold border-b border-ggprimary/20'
                />
                <div className='flex flex-row justify-between w-full'>
                  <div className='flex flex-col text-sm '>
                    <p className='font-semibold'>{t('start')}</p>
                    <ShinyText
                      text={formatDateTime(event.start)}
                      className='text-ggforeground/80 border-b border-ggprimary/20'
                    />
                  </div>
                  <div className='flex flex-col text-sm '>
                    <p className='font-semibold'>{t('end')}</p>
                    <ShinyText
                      text={formatDateTime(event.end)}
                      className='text-ggforeground/80 border-b border-ggprimary/20'
                    />
                  </div>
                </div>
                {event.location && (
                  <div className='max-w-full text-sm flex flex-row gap-2 items-start'>
                    <p className='font-semibold min-w-fit'>{t('location')}</p>
                    <ShinyText
                      text={event.location}
                      className='w-full text-ggforeground/80 border-b border-ggprimary/20'
                    />
                  </div>
                )}
                {event.description && (
                  <div className='text-sm flex flex-row gap-2 items-start'>
                    <p className='font-semibold min-w-fit'>
                      {t('description')}
                    </p>
                    <p className='text-foreground'>{event.description}</p>
                  </div>
                )}
                {event.phone && (
                  <div className='text-sm flex flex-row gap-2 items-start'>
                    <p className='font-semibold min-w-fit'>{t('phone')}</p>
                    <p className='text-foreground'>{event.phone}</p>
                  </div>
                )}
                {event.url && (
                  <div className='break-all text-sm flex flex-row gap-2 items-start'>
                    <p className='font-semibold min-w-fit'>{t('url')}</p>
                    <a href={event.url} className='text-ggprimary underline'>
                      {event.url}
                    </a>
                  </div>
                )}
              </div>
              <button
                onClick={() => onRemove(event.id)}
                className='text-sm text-ggsecondary hover:text-error rounded-full p-2 font-bold hover:bg-ggprimary/10 transition'
              >
                <Trash2 width={20} height={20} />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <DownloadButton events={events} />
    </div>
  );
}
