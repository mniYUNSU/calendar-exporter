// lib/icsGenerator.ts

type EventData = {
  title: string;
  date: string; // yyyy-mm-dd
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  description?: string;
};

function formatDateTime(date: string, time: string): string {
  const dt = new Date(`${date}T${time}`);
  return dt.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

export function generateICSContent(events: EventData[]): string {
  const header = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'CALSCALE:GREGORIAN',
    'PRODID:-//Radiant Lampfish//Schedule Generator//EN'
  ];

  const body = events.map((event, idx) => {
    const uid = `event-${idx}@lampfish`; // simple UID
    const dtStart = formatDateTime(event.date, event.startTime);
    const dtEnd = formatDateTime(event.date, event.endTime);

    return [
      'BEGIN:VEVENT',
      `UID:${uid}`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `DTSTART:${dtStart}`,
      `DTEND:${dtEnd}`,
      `SUMMARY:${event.title}`,
      event.description ? `DESCRIPTION:${event.description}` : '',
      'END:VEVENT'
    ]
      .filter(Boolean)
      .join('\n');
  });

  const footer = ['END:VCALENDAR'];

  return [...header, ...body, ...footer].join('\n');
}
