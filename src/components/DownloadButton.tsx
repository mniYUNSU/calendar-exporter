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
        className='btn disabled:opacity-50'
      >
        Download Calendar
      </button>
    </div>
  );
}
