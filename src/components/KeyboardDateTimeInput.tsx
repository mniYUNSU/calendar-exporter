import { useEffect, useState } from 'react';
import Toast from './Toast';

interface KeyboardDateTimeInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export default function KeyboardDateTimeInput({
  label,
  value,
  onChange
}: KeyboardDateTimeInputProps) {
  const parsed = value ? new Date(value) : null;
  const [year, setYear] = useState(() =>
    parsed ? parsed.getFullYear().toString() : ''
  );
  const [month, setMonth] = useState(() =>
    parsed ? String(parsed.getMonth() + 1).padStart(2, '0') : ''
  );
  const [day, setDay] = useState(() =>
    parsed ? String(parsed.getDate()).padStart(2, '0') : ''
  );
  const [hour, setHour] = useState(() =>
    parsed ? String(parsed.getHours()).padStart(2, '0') : ''
  );
  const [minute, setMinute] = useState(() =>
    parsed ? String(parsed.getMinutes()).padStart(2, '0') : ''
  );
  const [showError, setShowError] = useState(false);

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
    } else {
      setYear('');
      setMonth('');
      setDay('');
      setHour('');
      setMinute('');
    }
  }, [value]);

  useEffect(() => {
    const allEmpty = [year, month, day, hour, minute].every((v) => v === '');

    const validLengths =
      year.length === 4 &&
      month.length === 2 &&
      day.length === 2 &&
      hour.length === 2 &&
      minute.length === 2;

    if (allEmpty) {
      onChange('');
    } else if (validLengths) {
      const isValidYear = Number(year) >= 1900 && Number(year) <= 9999;

      if (!isValidYear) {
        onChange('');
        setShowError(true);
      }

      const d = new Date(
        Number(year),
        Number(month) - 1,
        Number(day),
        Number(hour),
        Number(minute)
      );

      const isValidDate =
        isValidYear &&
        d.getFullYear() === Number(year) &&
        d.getMonth() === Number(month) - 1 &&
        d.getDate() === Number(day) &&
        d.getHours() === Number(hour) &&
        d.getMinutes() === Number(minute);

      if (isValidDate) {
        const offset = d.getTimezoneOffset();
        const local = new Date(d.getTime() - offset * 60 * 1000);
        onChange(local.toISOString().slice(0, 16));
        setShowError(false);
      } else {
        onChange('');
        setShowError(true);
        setYear('');
        setMonth('');
        setDay('');
        setHour('');
        setMinute('');
      }
    }
  }, [year, month, day, hour, minute, onChange]);

  return (
    <div className='flex flex-col relative'>
      <label className='text-sm font-medium mb-1'>{label}</label>
      <div className='flex flex-row items-center justify-center py-2'>
        <input
          type='text'
          inputMode='numeric'
          className='input-manualDate min-w-12'
          placeholder='YYYY'
          maxLength={4}
          value={year}
          onChange={(e) => setYear(e.target.value.replace(/\D/g, ''))}
        />
        <label className='text-sm font-medium'>{'.'}</label>
        <input
          type='text'
          inputMode='numeric'
          className='input-manualDate'
          placeholder='MM'
          value={month}
          onChange={(e) => setMonth(e.target.value.replace(/\D/g, ''))}
          maxLength={2}
          onBlur={(e) => setMonth(e.target.value.padStart(2, '0'))}
        />
        <label className='text-sm font-medium'>{'.'}</label>
        <input
          type='text'
          inputMode='numeric'
          className='input-manualDate mr-1'
          placeholder='DD'
          maxLength={2}
          value={day}
          onChange={(e) => setDay(e.target.value.replace(/\D/g, ''))}
          onBlur={(e) => setDay(e.target.value.padStart(2, '0'))}
        />
        <input
          type='text'
          inputMode='numeric'
          className='input-manualDate'
          placeholder='HH'
          maxLength={2}
          value={hour}
          onChange={(e) => setHour(e.target.value.replace(/\D/g, ''))}
          onBlur={(e) => setHour(e.target.value.padStart(2, '0'))}
        />
        <label className='text-sm font-medium'>{':'}</label>
        <input
          type='text'
          inputMode='numeric'
          className='input-manualDate'
          placeholder='mm'
          maxLength={2}
          value={minute}
          onChange={(e) => setMinute(e.target.value.replace(/\D/g, ''))}
          onBlur={(e) => setMinute(e.target.value.padStart(2, '0'))}
        />
      </div>
      {showError && (
        <Toast
          message='정확한 날짜를 입력해주세요.'
          onClose={() => setShowError(false)}
        />
      )}
    </div>
  );
}
