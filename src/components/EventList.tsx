'use client';

type EventData = {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  description?: string;
};

type EventListProps = {
  events: EventData[];
  onDelete: (index: number) => void;
};

export default function EventList({ events, onDelete }: EventListProps) {
  if (events.length === 0) {
    return <p className='text-gray-500 mt-4'>No events added yet.</p>;
  }

  return (
    <ul className='w-full max-w-xl mt-6 space-y-4'>
      {events.map((event, idx) => (
        <li
          key={idx}
          className='border border-gray-300 rounded-lg p-4 bg-white shadow-sm flex flex-col md:flex-row md:justify-between md:items-center'
        >
          <div>
            <h3 className='font-semibold text-lg'>{event.title}</h3>
            <p className='text-sm text-gray-700'>
              {event.date} | {event.startTime} ~ {event.endTime}
            </p>
            {event.description && (
              <p className='text-sm mt-1 text-gray-600'>{event.description}</p>
            )}
          </div>
          <button
            onClick={() => onDelete(idx)}
            className='mt-3 md:mt-0 text-sm text-red-500 hover:underline'
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
