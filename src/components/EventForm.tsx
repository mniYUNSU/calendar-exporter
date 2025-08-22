'use client';

import { CalendarEvent } from '@/lib/icsGenerator';
import { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import DateTimeInput from './DateTimeInput';
import KeyboardDateTimeInput from './KeyboardDateTimeInput';
import { useTranslations } from 'next-intl';
import { CalendarSearch, Keyboard } from 'lucide-react';
import { RippleButton } from './magicui/RippleButton';

declare global {
  interface Window {
    google: any;
  }
}

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
  const locationInputRef = useRef<HTMLInputElement>(null);
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('');
  const [url, setUrl] = useState('');
  const [manualMode, setManualMode] = useState(false);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey || !locationInputRef.current) return;

    function initAutocomplete() {
      if (!locationInputRef.current || !window.google?.maps) return;
      const autocomplete = new window.google.maps.places.Autocomplete(
        locationInputRef.current,
        { fields: ['formatted_address'] }
      );
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        setLocation(place.formatted_address || locationInputRef.current?.value || '');
      });
    }

    if (!window.google?.maps) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.onload = initAutocomplete;
      document.head.appendChild(script);
    } else {
      initAutocomplete();
    }
  }, []);

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
    <div className='card bg-gradient-to-br from-ggbackground to-ggprimary/10 p-4 sm:p-6 space-y-6 animate-fade-in w-full md:w-1/2'>
      <div className='space-y-4'>
        <div className=''>
          <div className='flex justify-end -top-0 right-0'>
            <label className='justify-center flex items-center cursor-pointer text-sm gap-1'>
              <CalendarSearch width={20} height={20} />
              <div className='relative'>
                <input
                  type='checkbox'
                  checked={manualMode}
                  onChange={() => setManualMode((m) => !m)}
                  className='sr-only peer'
                />
                <div className='w-10 h-5 bg-ggprimary rounded-full peer-checked:bg-ggprimary transition-colors'></div>
                <div className='absolute top-0.5 left-0.5 w-4 h-4 bg-ggbackground rounded-full transition-transform peer-checked:translate-x-5'></div>
              </div>
              <Keyboard width={20} height={20} />
            </label>
          </div>
          {manualMode ? (
            <div className='flex flex-row gap-4 justify-between'>
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
        </div>
        <div className='flex flex-col w-full max-w-sm text-ggforeground'>
          <label className='text-sm font-medium mb-1'>{t('title')}</label>
          <input
            className='input'
            placeholder={t('titlePlaceholder')}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className='flex flex-col w-full max-w-sm'>
          <label className='text-sm font-medium mb-1'>{t('location')}</label>
          <input
            className='input'
            placeholder={t('locationPlaceholder')}
            value={location}
            ref={locationInputRef}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className='flex flex-col'>
          <label className='text-sm font-medium mb-1'>{t('description')}</label>
          <input
            className='input'
            placeholder={t('descriptionPlaceholder')}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className='grid grid-cols-3 gap-2'>
          <div className='flex flex-col col-span-1'>
            <label className='text-sm font-medium mb-1'>{t('phone')}</label>
            <input
              className='input'
              placeholder={t('phonePlaceholder')}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className='flex flex-col col-span-2'>
            <label className='text-sm font-medium mb-1'>{t('url')}</label>
            <input
              className='input'
              placeholder={t('urlPlaceholder')}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
        </div>
      </div>
      <RippleButton
        onClick={handleSubmit}
        className='w-full border-none bg-ggprimary text-ggbackground font-semibold'
        rippleColor='#4f46e5'
      >
        {t('add')}
      </RippleButton>
    </div>
  );
}
