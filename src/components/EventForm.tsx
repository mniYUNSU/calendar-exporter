'use client';

import { CalendarEvent } from '@/lib/icsGenerator';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import DateTimeInput from './DateTimeInput';
import KeyboardDateTimeInput from './KeyboardDateTimeInput';
import { useTranslations } from 'next-intl';

export default function EventForm({
  onAdd,
  onRemove,
  events
}: {
  onAdd: (event: CalendarEvent) => void;
  onRemove: (id: string) => void;
  events: CalendarEvent[];
}) {
  const t = useTranslations('EventForm');
  const [title, setTitle] = useState('');

  function getLocalDateTimeForInput() {
    const now = new Date();
    const offset = now.getTimezoneOffset();
    const localDate = new Date(now.getTime() - offset * 60 * 1000);
    return localDate.toISOString().slice(0, 16);
  }

  const [start, setStart] = useState(getLocalDateTimeForInput());
  const [end, setEnd] = useState(getLocalDateTimeForInput());
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('');
  const [url, setUrl] = useState('');
  const [manualMode, setManualMode] = useState(false);
  const [showEvents, setShowEvents] = useState(false);

  const formatDateTime = (value: string) =>
    new Date(value).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' });

  const handleSubmit = () => {
    if (!title || !start || !end) return;
    onAdd({
      id: uuidv4(),
      title,
      start,
      end,
      location,
      description,
      phone,
      url
    });
    setTitle('');
    setStart(getLocalDateTimeForInput());
    setEnd(getLocalDateTimeForInput());
    setLocation('');
    setDescription('');
    setPhone('');
    setUrl('');
  };

  return (
    <>
      <div className='card p-6 sm:p-8 space-y-6 animate-fade-in'>
        <div className='flex justify-end'>
          <button
            onClick={() => setManualMode((m) => !m)}
            className='p-2 border rounded-full text-sm hover:bg-primary/10 transition'
          >
            {manualMode ? t('picker') : t('manual')}
          </button>
        </div>
        <div className='space-y-4'>
        <div className='flex flex-col w-full max-w-sm'>
          <label className='text-sm font-medium mb-1'>{t('title')}</label>
          <input
            className='input'
            placeholder={t('title')}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        {manualMode ? (
          <div className='space-y-4'>
            <KeyboardDateTimeInput label={t('start')} value={start} onChange={setStart} />
            <KeyboardDateTimeInput label={t('end')} value={end} onChange={setEnd} />
          </div>
        ) : (
          <DateTimeInput
            start={start ? new Date(start) : null}
            end={end ? new Date(end) : null}
            onChangeStart={(date) => setStart(date?.toISOString() || '')}
            onChangeEnd={(date) => setEnd(date?.toISOString() || '')}
            labels={{ start: t('start'), end: t('end') }}
          />
        )}
        <div className='flex flex-col w-full max-w-sm'>
          <label className='text-sm font-medium mb-1'>{t('location')}</label>
          <input
            className='input'
            placeholder={t('location')}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className='flex flex-col'>
          <label className='text-sm font-medium mb-1'>{t('description')}</label>
          <input
            className='input'
            placeholder={t('description')}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <div className='flex flex-col'>
            <label className='text-sm font-medium mb-1'>{t('phone')}</label>
            <input
              className='input'
              placeholder={t('phone')}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className='flex flex-col'>
            <label className='text-sm font-medium mb-1'>{t('url')}</label>
            <input
              className='input'
              placeholder={t('url')}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
        </div>
      </div>
      <button onClick={handleSubmit} className='btn w-full'>
        {t('add')}
      </button>
      </div>
      {events.length > 0 && (
        <div className='fixed bottom-4 left-0 right-0 flex justify-center'>
          <div className='relative'>
            {showEvents && (
              <ul className='absolute bottom-full mb-2 w-72 sm:w-80 max-h-60 overflow-y-auto space-y-2'>
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
            )}
            <button
              onClick={() => setShowEvents((s) => !s)}
              className='card px-4 py-2 text-sm shadow-md w-72 sm:w-80'
            >
              {t('events')} ({events.length})
            </button>
          </div>
        </div>
      )}
    </>
  );
}

