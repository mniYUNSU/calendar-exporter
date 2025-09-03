'use client';

import * as React from 'react';
import { ChevronDownIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { enUS, ko } from 'date-fns/locale';

export function CustomDateTimeInput() {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  // Pick locale based on browser language; default to en-US
  const locale = React.useMemo(() => {
    if (typeof navigator !== 'undefined') {
      const lang = navigator.language?.toLowerCase() ?? '';
      if (lang.startsWith('ko')) return ko;
    }
    return enUS;
  }, []);

  return (
    <div className='flex gap-4'>
      <div className='flex flex-col gap-3'>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant='outline'
              id='date-picker'
              className='justify-between font-normal'
            >
              {date ? date.toLocaleDateString() : 'Select date'}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className='w-auto h-auto overflow-hidden'
            align='start'
          >
            <Calendar
              mode='single'
              selected={date}
              captionLayout='label'
              // Make the grid a bit wider like the reference UI
              className=''
              // Localize weekday names (일, 월, ...) per browser locale
              locale={locale}
              onSelect={(date) => {
                setDate(date);
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className='flex flex-col gap-3'>
        <Input
          type='time'
          id='time-picker'
          defaultValue='00:00'
          className='bg-background text-foreground appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none'
        />
      </div>
    </div>
  );
}
