'use client';

import Image from 'next/image';
import { startOfToday } from 'date-fns';
import { useMemo, useState } from 'react';
import { DatePicker } from '@/components/DatePicker';
import { TimePicker } from '@/components/TimePicker';
import { getDateOptions, getTimeSlots } from '@/lib/schedule';
export default function Home() {
  const today = useMemo(() => startOfToday(), []);
  const dateOptions = useMemo(() => getDateOptions(today), [today]);

  const [selectedDateIso, setSelectedDateIso] = useState('');
  const [selectedSlotTimestamp, setSelectedSlotTimestamp] = useState<
    number | null
  >(null);
  const [nowTimestamp] = useState(() => Date.now());

  const selectedDate =
    dateOptions.find((option) => option.iso === selectedDateIso)?.date ?? null;

  const availableSlots = useMemo(() => {
    const slots = getTimeSlots(selectedDate);
    return slots.filter((slot) => slot.getTime() > nowTimestamp);
  }, [selectedDate, nowTimestamp]);

  const handleDateSelect = (iso: string) => {
    setSelectedDateIso(iso);
    setSelectedSlotTimestamp(null);
  };

  const handleTimeSelect = (timestamp: number) => {
    setSelectedSlotTimestamp(timestamp);
  };

  const handleConfirm = () => {
    if (!selectedSlotTimestamp) return;
    const timestamp = Math.floor(selectedSlotTimestamp / 1000);
    console.log({ timestamp });
  };

  return (
    <main className='h-screen flex items-center justify-center'>
      <div className='relative max-w-142 h-full max-h-155 rounded-2xl bg-white p-6 py-10 text-slate-900 '>
        <section className='mx-auto flex flex-auto w-full h-full max-w-4xl flex-col gap-10'>
          <header className='space-y-2 flex gap-6 px-8 items-center'>
            <Image
              src='/avatar.svg'
              alt='Avatar'
              width={96}
              height={96}
              priority
              className='rounded-full bg-white/60 p-2'
            />
            <div className='flex flex-col justify-center'>
              <h1 className='text-3xl font-[var(--font-kaisei)]'>
                Book a Session
              </h1>
              <p className='text-gray-600 font-light text-md antialiased'>
                Choose a date and time that is convenient for you to e-meet your
                stylist
              </p>
            </div>
          </header>

          <DatePicker
            options={dateOptions}
            selectedIso={selectedDateIso}
            onSelect={handleDateSelect}
          />

          <section className='space-y-4'>
            <TimePicker
              selectedDate={selectedDate}
              slots={availableSlots}
              selectedTimestamp={selectedSlotTimestamp}
              onSelect={handleTimeSelect}
            />
          </section>

          <section className='flex justify-center mt-auto'>
            <button
              type='button'
              onClick={handleConfirm}
              disabled={!selectedSlotTimestamp}
              className='h-12 w-full max-w-80 rounded-full bg-[var(--button-surface-active,_rgba(22,23,27,1))] text-base font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40'
            >
              Confirm
            </button>
          </section>
        </section>
      </div>
    </main>
  );
}
