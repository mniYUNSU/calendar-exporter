export interface CalendarEvent {
  id: string;
  title: string;
  start: string; // ISO string
  end: string; // ISO string
  location?: string;
  description?: string;
  phone?: string;
  url?: string;
}

export function generateICSContent(events: CalendarEvent[]): string {
  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'CALSCALE:GREGORIAN'
  ];

  events.forEach((event) => {
    lines.push('BEGIN:VEVENT');
    lines.push(`UID:${event.id}`);
    lines.push(`SUMMARY:${event.title}`);
    lines.push(`DTSTART:${formatDate(event.start)}`);
    lines.push(`DTEND:${formatDate(event.end)}`);

    if (event.phone) lines.push(`CONTACT:Phone, ${event.phone}`);
    if (event.location) lines.push(`LOCATION:${event.location}`);
    if (event.url) lines.push(`URL:${event.url}`);

    const descParts = [
      event.description && `Note: ${event.description}`,
      event.phone && `Phone: ${event.phone}`,
      event.url && `Link: ${event.url}`
    ]
      .filter(Boolean)
      .join('\\n\\n');

    if (descParts) lines.push(`DESCRIPTION:${descParts}`);

    lines.push('END:VEVENT');
  });

  lines.push('END:VCALENDAR');

  return lines.join('\r\n');
}

function formatDate(dateStr: string): string {
  const dt = new Date(dateStr);
  return dt.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

// 다국어 지원용 label 정의 (예: i18n 라이브러리로 분리 가능)
export const LABELS = {
  title: {
    ko: '제목',
    en: 'Title',
    ja: 'タイトル'
  },
  start: {
    ko: '시작 시간',
    en: 'Start Time',
    ja: '開始時間'
  },
  end: {
    ko: '종료 시간',
    en: 'End Time',
    ja: '終了時間'
  },
  description: {
    ko: '설명',
    en: 'Description',
    ja: '説明'
  },
  phone: {
    ko: '전화번호',
    en: 'Phone',
    ja: '電話番号'
  },
  url: {
    ko: '웹 링크',
    en: 'Web Link',
    ja: 'ウェブリンク'
  },
  location: {
    ko: '위치',
    en: 'Location',
    ja: '場所'
  },
  delete: {
    ko: '삭제',
    en: 'Delete',
    ja: '削除'
  }
};
