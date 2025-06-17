import { CalendarEvent } from './icsGenerator';

export function removeCalendarEvent(
  events: CalendarEvent[],
  id: string
): CalendarEvent[] {
  return events.filter((event) => event.id !== id);
}
