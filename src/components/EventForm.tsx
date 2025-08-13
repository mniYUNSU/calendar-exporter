'use client';

import { CalendarEvent } from '@/lib/icsGenerator';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import DateTimeInput from './DateTimeInput';
import KeyboardDateTimeInput from './KeyboardDateTimeInput';

const LABELS = {
  ko: {
    title: '일정 제목',
    start: '시작 시간',
    end: '종료 시간',
    location: '장소',
    description: '설명',
    phone: '전화번호',
    url: '웹 링크',
    add: '일정 추가',
    delete: '삭제'
  },
  en: {
    title: 'Title',
    start: 'Start Time',
    end: 'End Time',
    location: 'Location',
    description: 'Description',
    phone: 'Phone',
    url: 'URL',
    add: 'Add Event',
    delete: 'Delete'
  },
  ja: {
    title: 'タイトル',
    start: '開始時間',
    end: '終了時間',
    location: '場所',
    description: '説明',
    phone: '電話番号',
    url: 'リンク',
    add: '予定を追加',
    delete: '削除'
  }
};

export default function EventForm({
  onAdd,
  onRemove,
  events,
  lang
}: {
  onAdd: (event: CalendarEvent) => void;
  onRemove: (id: string) => void;
  events: CalendarEvent[];
  lang: keyof typeof LABELS;
}) {
  const labels = LABELS[lang];
  const [title, setTitle] = useState('');

  function getLocalDateTimeForInput() {
    const now = new Date();
    const offset = now.getTimezoneOffset(); // 분 단위 (-540 for UTC+9)
    const localDate = new Date(now.getTime() - offset * 60 * 1000);
    return localDate.toISOString().slice(0, 16);
  }
  const [start, setStart] = useState(getLocalDateTimeForInput());
  const [end, setEnd] = useState(getLocalDateTimeForInput());
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('');
  const [url, setUrl] = useState('');

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
    <div className='space-y-6 p-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-xl shadow-md w-full max-w-xl mx-auto'>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        <div className='flex flex-col sm:col-span-2'>
          <label className='text-sm font-medium mb-1'>{labels.title}</label>
          <input
            className='input'
            placeholder={labels.title}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className='sm:col-span-2'>
          <DateTimeInput
            start={start ? new Date(start) : null}
            end={end ? new Date(end) : null}
            onChangeStart={(date) => setStart(date?.toISOString() || '')}
            onChangeEnd={(date) => setEnd(date?.toISOString() || '')}
            labels={{ start: labels.start, end: labels.end }}
          />
        </div>
        <div className='sm:col-span-2'>
          <KeyboardDateTimeInput
            label={`${labels.start} (Manual)`}
            value={start}
            onChange={setStart}
          />
        </div>
        <div className='sm:col-span-2'>
          <KeyboardDateTimeInput
            label={`${labels.end} (Manual)`}
            value={end}
            onChange={setEnd}
          />
        </div>
        <div className='flex flex-col sm:col-span-2'>
          <label className='text-sm font-medium mb-1'>{labels.location}</label>
          <input
            className='input'
            placeholder={labels.location}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className='flex flex-col sm:col-span-2'>
          <label className='text-sm font-medium mb-1'>{labels.description}</label>
          <input
            className='input'
            placeholder={labels.description}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className='flex flex-col'>
          <label className='text-sm font-medium mb-1'>{labels.phone}</label>
          <input
            className='input'
            placeholder={labels.phone}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className='flex flex-col'>
          <label className='text-sm font-medium mb-1'>{labels.url}</label>
          <input
            className='input'
            placeholder={labels.url}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
      </div>
      <button onClick={handleSubmit} className='btn w-full'>
        {labels.add}
      </button>
      {events.length > 0 && (
        <ul className='space-y-2 pt-4'>
          {events.map((event) => (
            <li
              key={event.id}
              className='flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded'
            >
              <div>
                <div className='font-semibold'>{event.title}</div>
                <div className='text-sm'>
                  {event.start} ~ {event.end}
                </div>
              </div>
              <button
                onClick={() => onRemove(event.id)}
                className='text-sm text-red-500 hover:text-red-700'
              >
                {labels.delete}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
