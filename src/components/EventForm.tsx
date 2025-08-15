'use client';

import { CalendarEvent } from '@/lib/icsGenerator';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import DateTimeInput from './DateTimeInput';
import KeyboardDateTimeInput from './KeyboardDateTimeInput';
import { useTranslations } from 'next-intl';

export default function EventForm({
  onAdd
}: {
  onAdd: (event: CalendarEvent) => void;
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
    <div className='card bg-gradient-to-br from-background to-primary/10 p-6 sm:p-8 space-y-6 animate-fade-in w-full md:w-1/2'>
      <div className='flex justify-end'>
        <label className='flex items-center cursor-pointer text-sm'>
          <span className={`mr-2 ${manualMode ? 'opacity-60' : ''}`}>{t('picker')}</span>
          <div className='relative'>
            <input
              type='checkbox'
              checked={manualMode}
              onChange={() => setManualMode((m) => !m)}
              className='sr-only peer'
            />
            <div className='w-10 h-5 bg-primary/20 rounded-full peer-checked:bg-primary transition-colors'></div>
            <div className='absolute top-0.5 left-0.5 w-4 h-4 bg-background rounded-full transition-transform peer-checked:translate-x-5'></div>
          </div>
          <span className={`ml-2 ${manualMode ? '' : 'opacity-60'}`}>{t('manual')}</span>
        </label>
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
            <KeyboardDateTimeInput
              label={t('start')}
              value={start}
              onChange={setStart}
            />
            <KeyboardDateTimeInput
              label={t('end')}
              value={end}
              onChange={setEnd}
            />
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
  );
}
