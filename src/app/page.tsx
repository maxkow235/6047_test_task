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
    <main className='h-screen sm:flex sm:items-center sm:justify-center sm:p-4'>
      <section className='relative sm:hidden h-70  font-sans px-5 flex flex-col justify-center align-middle'>
        <Image
          src='/6047_test_task/bg-mobile.svg'
          height={327}
          width={201}
          alt=''
          className='absolute -z-50 right-0 -bottom-10'
        />
        <h2 className='text-3xl font-sans'>Cool session</h2>
        <p className='font-light font-sans'>Additional type</p>
        <div className='rounded-full font-light text-xs bg-[rgba(255,255,255,0.2)] p-2 w-auto self-start flex gap-1 items-center mt-5'>
          <Image
            src='/6047_test_task/icons/clock.svg'
            alt=''
            width={16}
            height={16}
          />
          30 mins
        </div>
      </section>
      <section className='w-full md:max-w-142 h-130 sm:h-full sm:max-h-155 rounded-t-2xl sm:rounded-2xl bg-white sm:p-6 sm:py-10 p-4 py-5 -mt-[10px] sm:mt-0 text-slate-900 '>
        <section className='flex flex-col sm:gap-10 gap-5'>
          <header className='space-y-2 flex gap-6 sm:px-8 items-center'>
            <Image
              src='/6047_test_task/avatar.svg'
              alt='Avatar'
              width={120}
              height={120}
              priority
              className='rounded-full bg-white/60 hidden sm:block'
            />
            <div className='flex flex-col justify-center'>
              <h1 className='text-3xl font-serif'>Book a Session</h1>
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

          <section className='flex align-middle justify-center mt-au'>
            <button
              type='button'
              onClick={handleConfirm}
              disabled={!selectedSlotTimestamp}
              className='h-12 w-full max-w-90 rounded-full bg-[rgba(22,23,27,1)] text-base font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40'
            >
              Confirm
            </button>
          </section>
        </section>
      </section>
    </main>
  );
}
