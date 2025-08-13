import { useEffect, useState } from 'react';

interface KeyboardDateTimeInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export default function KeyboardDateTimeInput({ label, value, onChange }: KeyboardDateTimeInputProps) {
  const initial = value ? new Date(value) : new Date();
  const [year, setYear] = useState(initial.getFullYear().toString());
  const [month, setMonth] = useState(String(initial.getMonth() + 1).padStart(2, '0'));
  const [day, setDay] = useState(String(initial.getDate()).padStart(2, '0'));
  const [hour, setHour] = useState(String(initial.getHours()).padStart(2, '0'));
  const [minute, setMinute] = useState(String(initial.getMinutes()).padStart(2, '0'));

  useEffect(() => {
    if (value) {
      const d = new Date(value);
      if (!isNaN(d.getTime())) {
        setYear(d.getFullYear().toString());
        setMonth(String(d.getMonth() + 1).padStart(2, '0'));
        setDay(String(d.getDate()).padStart(2, '0'));
        setHour(String(d.getHours()).padStart(2, '0'));
        setMinute(String(d.getMinutes()).padStart(2, '0'));
      }
    }
  }, [value]);

  useEffect(() => {
    const d = new Date(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute));
    if (!isNaN(d.getTime())) {
      const offset = d.getTimezoneOffset();
      const local = new Date(d.getTime() - offset * 60 * 1000);
      onChange(local.toISOString().slice(0, 16));
    }
  }, [year, month, day, hour, minute, onChange]);

  return (
    <div className='flex flex-col gap-2'>
      <label className='text-sm font-medium'>{label}</label>
      <div className='grid grid-cols-2 sm:grid-cols-5 gap-2'>
        <input
          type='number'
          className='input col-span-2 sm:col-span-1'
          placeholder='YYYY'
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <input
          type='number'
          className='input'
          placeholder='MM'
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />
        <input
          type='number'
          className='input'
          placeholder='DD'
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
        <input
          type='number'
          className='input'
          placeholder='HH'
          value={hour}
          onChange={(e) => setHour(e.target.value)}
        />
        <input
          type='number'
          className='input'
          placeholder='mm'
          value={minute}
          onChange={(e) => setMinute(e.target.value)}
        />
      </div>
    </div>
  );
}
