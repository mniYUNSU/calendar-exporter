'use client';

import { CalendarEvent } from '@/lib/icsGenerator';
import { useState, useEffect, useRef, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import DateTimeInput from './DateTimeInput';
import KeyboardDateTimeInput from './KeyboardDateTimeInput';
import { useTranslations } from 'next-intl';
import { CalendarSearch, Keyboard } from 'lucide-react';
import { RippleButton } from './magicui/RippleButton';
import { Skeleton } from './ui/skeleton';

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
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const sessionToken = useRef<any>(null);
  const placesLoaded = useRef(false);
  const locationContainerRef = useRef<HTMLDivElement>(null);
  const locationInputRef = useRef<HTMLInputElement | null>(null);
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('');
  const [url, setUrl] = useState('');
  const [manualMode, setManualMode] = useState(false);
  const [isPlaceLoaded, setIsPlaceLoaded] = useState(false);

  async function init() {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) return;

    if (!window.google?.maps) {
      await new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=weekly&libraries=places&loading=async`;
        script.async = true;
        script.onload = resolve;
        document.head.appendChild(script);
      });
    } else {
      await window.google.maps.importLibrary('places');
    }
    placesLoaded.current = true;
  }

  const initPlaceLoaded = useCallback(async () => {
    setIsPlaceLoaded(false);
    await init();
    setTimeout(() => {
      setIsPlaceLoaded(true);
    }, 200);
  }, []);

  useEffect(() => {
    initPlaceLoaded();
  }, []);

  const handleLocationChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setLocation(value);
    if (!placesLoaded.current || !value) {
      setSuggestions([]);
      sessionToken.current = null;
      return;
    }
    if (!sessionToken.current) {
      sessionToken.current =
        new window.google.maps.places.AutocompleteSessionToken();
    }
    try {
      const { suggestions } =
        await window.google.maps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions(
          {
            input: value,
            sessionToken: sessionToken.current
          }
        );
      setSuggestions(suggestions || []);
    } catch {
      setSuggestions([]);
    }
  };

  const handlePredictionSelect = async (suggestion: any) => {
    try {
      const place = suggestion.placePrediction.toPlace();
      await place.fetchFields({ fields: ['formattedAddress'] });
      setLocation(
        place.formattedAddress || suggestion.placePrediction.text.text
      );
    } catch {
      setLocation(suggestion.placePrediction.text.text);
    }
    setSuggestions([]);
    sessionToken.current = null;
  };

  const handleBlur = () => {
    setTimeout(() => setSuggestions([]), 100);
  };

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
    setSuggestions([]);
    setDescription('');
    setPhone('');
    setUrl('');
  };

  return (
    <div className='backdrop-blur-xs border border-ggprimary/20 rounded-2xl shadow-lg shadow-ggprimary/10 bg-gradient-to-br from-ggbackground/30 to-ggprimary/10 p-4 sm:p-6 space-y-6 animate-fade-in w-full md:w-1/2'>
      <div className='space-y-4'>
        <div className='relative'>
          {/* {!isPlaceLoaded && <Skeleton />} */}
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
          <div
            className={`relative ${suggestions.length > 0 ? 'z-[1000]' : ''}`}
            ref={locationContainerRef}
          >
            <input
              ref={locationInputRef}
              className='input'
              placeholder={t('locationPlaceholder')}
              value={location}
              onChange={handleLocationChange}
              onBlur={handleBlur}
            />
            {suggestions.length > 0 && (
              <ul className='absolute top-full left-0 z-[1010] mt-2 w-full bg-ggbackground/80 backdrop-blur rounded-md shadow ring-ggprimary/50 ring-2'>
                {suggestions.map((s: any) => (
                  <li
                    key={s.placePrediction.placeId}
                    className='text-sm px-3 py-2 cursor-pointer hover:bg-ggprimary/10 border-b text-ggforeground border-ggborder'
                    onMouseDown={() => handlePredictionSelect(s)}
                  >
                    {s.placePrediction.text.text}
                  </li>
                ))}
              </ul>
            )}
          </div>
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
