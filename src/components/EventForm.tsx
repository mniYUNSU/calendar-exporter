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
    delete: '삭제',
    manual: '직접 입력',
    picker: '달력 입력'
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
    delete: 'Delete',
    manual: 'Manual Input',
    picker: 'Date Picker'
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
    delete: '削除',
    manual: '手動入力',
    picker: 'カレンダー入力'
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
    <div className='max-w-2xl mx-auto p-8 bg-background text-foreground rounded-2xl shadow-lg border border-primary/20 space-y-6'>
      <div className='flex justify-end'>
        <button
          onClick={() => setManualMode((m) => !m)}
          className='p-2 border rounded text-sm'
        >
          {manualMode ? labels.picker : labels.manual}
        </button>
      </div>
      <div className='space-y-4'>
        <div className='flex flex-col'>
          <label className='text-sm font-medium mb-1'>{labels.title}</label>
          <input
            className='input'
            placeholder={labels.title}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        {manualMode ? (
          <div className='space-y-4'>
            <KeyboardDateTimeInput label={labels.start} value={start} onChange={setStart} />
            <KeyboardDateTimeInput label={labels.end} value={end} onChange={setEnd} />
          </div>
        ) : (
          <DateTimeInput
            start={start ? new Date(start) : null}
            end={end ? new Date(end) : null}
            onChangeStart={(date) => setStart(date?.toISOString() || '')}
            onChangeEnd={(date) => setEnd(date?.toISOString() || '')}
            labels={{ start: labels.start, end: labels.end }}
          />
        )}
        <div className='flex flex-col'>
          <label className='text-sm font-medium mb-1'>{labels.location}</label>
          <input
            className='input'
            placeholder={labels.location}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className='flex flex-col'>
          <label className='text-sm font-medium mb-1'>{labels.description}</label>
          <input
            className='input'
            placeholder={labels.description}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
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
      </div>
      <button onClick={handleSubmit} className='btn w-full'>
        {labels.add}
      </button>
      {events.length > 0 && (
        <ul className='space-y-2 pt-4'>
          {events.map((event) => (
            <li
              key={event.id}
              className='flex items-center justify-between p-4 bg-background border border-primary/10 rounded-lg shadow-sm'
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

