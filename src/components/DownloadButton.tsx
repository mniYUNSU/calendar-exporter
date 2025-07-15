'use client';

import { saveAs } from 'file-saver';
import { CalendarEvent, generateICSContent } from '@/lib/icsGenerator';

type Props = {
  events: CalendarEvent[];
};

export default function DownloadButton({ events }: Props) {
  const handleDownload = () => {
    const blob = new Blob([generateICSContent(events)], {
      type: 'text/calendar;charset=utf-8'
    });
    saveAs(blob, 'schedule.ics');
  };

  return (
    <div className='text-center mt-6'>
      <button
        onClick={handleDownload}
        disabled={events.length === 0}
        className='bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400'
      >
        Download Calendar
      </button>
    </div>
  );
}
