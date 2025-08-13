'use client';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko, ja, enUS } from 'date-fns/locale';
import { useLocale } from 'next-intl';

export default function DateTimeInput({
  start,
  end,
  onChangeStart,
  onChangeEnd,
  labels
}: {
  start: Date | null;
  end: Date | null;
  onChangeStart: (date: Date | null) => void;
  onChangeEnd: (date: Date | null) => void;
  labels: { start: string; end: string };
}) {
  const locale = useLocale();
  const dateLocale = locale === 'ko' ? ko : locale === 'ja' ? ja : enUS;

  return (
    <div className='flex flex-col gap-4'>
      <div>
        <label className='text-sm text-gray-300 block mb-1'>
          {labels.start}
        </label>
        <DatePicker
          onKeyDown={(e) => {
            e.preventDefault();
          }}
          onFocus={(e) => e.target.blur()}
          selected={start}
          onChange={onChangeStart}
          showTimeSelect
          timeFormat='HH:mm'
          timeIntervals={15}
          dateFormat='Pp'
          placeholderText={labels.start}
          locale={dateLocale}
          className='w-full p-2 border rounded dark:bg-gray-800 dark:text-white'
        />
      </div>
      <div>
        <label className='text-sm text-gray-300 block mb-1'>{labels.end}</label>
        <DatePicker
          selected={end}
          onChange={onChangeEnd}
          showTimeSelect
          timeFormat='HH:mm'
          timeIntervals={15}
          dateFormat='Pp'
          placeholderText={labels.end}
          locale={dateLocale}
          className='w-full p-2 border rounded dark:bg-gray-800 dark:text-white'
        />
      </div>
    </div>
  );
}
