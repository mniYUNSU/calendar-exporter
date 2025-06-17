'use client';

import { CalendarEvent } from '@/lib/icsGenerator';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

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
  lang = 'en'
}: {
  onAdd: (event: CalendarEvent) => void;
  onRemove: (id: string) => void;
  events: CalendarEvent[];
  lang?: keyof typeof LABELS;
}) {
  const labels = LABELS[lang];
  const [title, setTitle] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
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
    setStart('');
    setEnd('');
    setLocation('');
    setDescription('');
    setPhone('');
    setUrl('');
  };

  return (
    <div className='space-y-4 p-4 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-xl shadow-lg w-full max-w-xl mx-auto'>
      <input
        className='w-full p-2 border rounded dark:bg-gray-800'
        placeholder={labels.title}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type='datetime-local'
        className='w-full p-2 border rounded dark:bg-gray-800'
        placeholder={labels.start}
        value={start}
        onChange={(e) => setStart(e.target.value)}
      />
      <input
        type='datetime-local'
        className='w-full p-2 border rounded dark:bg-gray-800'
        placeholder={labels.end}
        value={end}
        onChange={(e) => setEnd(e.target.value)}
      />
      <input
        className='w-full p-2 border rounded dark:bg-gray-800'
        placeholder={labels.location}
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <input
        className='w-full p-2 border rounded dark:bg-gray-800'
        placeholder={labels.description}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        className='w-full p-2 border rounded dark:bg-gray-800'
        placeholder={labels.phone}
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        className='w-full p-2 border rounded dark:bg-gray-800'
        placeholder={labels.url}
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className='w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
      >
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
