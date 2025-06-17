'use client';

import { useState } from 'react';

type EventData = {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  description?: string;
};

type EventFormProps = {
  onAddEvent: (event: EventData) => void;
};

export default function EventForm({ onAddEvent }: EventFormProps) {
  const [form, setForm] = useState<EventData>({
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    description: ''
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.date || !form.startTime || !form.endTime) {
      alert('Please fill in all required fields.');
      return;
    }
    onAddEvent(form);
    setForm({
      title: '',
      date: '',
      startTime: '',
      endTime: '',
      description: ''
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='w-full max-w-xl space-y-4 p-4 border border-gray-300 rounded-lg shadow-sm bg-white'
    >
      <h2 className='text-xl font-bold'>Add New Event</h2>

      <div className='flex flex-col gap-2'>
        <label className='font-medium'>Title *</label>
        <input
          type='text'
          name='title'
          value={form.title}
          onChange={handleChange}
          required
          className='input'
        />
      </div>

      <div className='flex flex-col gap-2 md:flex-row md:items-center md:gap-4'>
        <div className='flex flex-col flex-1 gap-2'>
          <label className='font-medium'>Date *</label>
          <input
            type='date'
            name='date'
            value={form.date}
            onChange={handleChange}
            required
            className='input'
          />
        </div>

        <div className='flex flex-col flex-1 gap-2'>
          <label className='font-medium'>Start Time *</label>
          <input
            type='time'
            name='startTime'
            value={form.startTime}
            onChange={handleChange}
            required
            className='input'
          />
        </div>

        <div className='flex flex-col flex-1 gap-2'>
          <label className='font-medium'>End Time *</label>
          <input
            type='time'
            name='endTime'
            value={form.endTime}
            onChange={handleChange}
            required
            className='input'
          />
        </div>
      </div>

      <div className='flex flex-col gap-2'>
        <label className='font-medium'>Description (optional)</label>
        <textarea
          name='description'
          value={form.description}
          onChange={handleChange}
          className='input'
          rows={2}
        />
      </div>

      <button
        type='submit'
        className='bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition'
      >
        Add Event
      </button>
    </form>
  );
}
