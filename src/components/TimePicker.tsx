import { format } from 'date-fns';
import { useEffect, useRef } from 'react';
import { ArrowButton } from '@/components/ArrowButton';
import { useHorizontalScroll } from '@/hooks/useHorizontalScroll';

type TimePickerProps = {
  selectedDate: Date | null;
  slots: Date[];
  selectedTimestamp: number | null;
  onSelect: (timestamp: number) => void;
};

const baseButtonClasses =
  'flex items-center justify-center font-[var(--font-poppins)] font-normal text-[14px] leading-none tracking-[0px] uppercase text-center';
const activeButtonClasses =
  'min-w-[79px] h-[45px] px-4 py-3 rounded-[72px] border border-transparent bg-[var(--surface-active,_rgba(247,247,252,1))] text-[var(--text-accent,_rgba(222,58,107,1))]';
const inactiveButtonClasses =
  'min-w-[81px] h-[45px] px-4 py-3 rounded-[100px] border border-[var(--stroke-divider-stroke-primary,_rgba(232,235,244,1))] text-slate-900';

export function TimePicker({
  selectedDate,
  slots,
  selectedTimestamp,
  onSelect,
}: TimePickerProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const scroll = useHorizontalScroll(trackRef, [
    slots.length,
    selectedTimestamp ?? 'none',
  ]);
  useEffect(() => {
    const container = trackRef.current;
    if (!container || !selectedTimestamp) return;
    const target = container.querySelector<HTMLElement>(
      `[data-time-item="${selectedTimestamp}"]`
    );
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [selectedTimestamp]);

  if (!selectedDate) {
    return (
      <p className='text-sm text-slate-600'>
        Select a date to display the available times.
      </p>
    );
  }

  return (
    <div className='flex items-center gap-3'>
      <ArrowButton
        direction='left'
        ariaLabel='Scroll times left'
        onClick={scroll.scrollLeft}
        disabled={!scroll.canScrollLeft}
      />
      <div
        ref={trackRef}
        className='no-scrollbar flex w-full gap-3 overflow-x-auto px-1 py-2'
      >
        {slots.map((slot) => {
          const slotTimestamp = slot.getTime();
          const isSelected = selectedTimestamp === slotTimestamp;
          return (
            <button
              key={slotTimestamp}
              data-time-item={slotTimestamp}
              type='button'
              onClick={() => onSelect(slotTimestamp)}
              className={`${baseButtonClasses} ${
                isSelected ? activeButtonClasses : inactiveButtonClasses
              }`}
            >
              {format(slot, 'h:mm aaa').toUpperCase()}
            </button>
          );
        })}
      </div>
      <ArrowButton
        direction='right'
      ariaLabel='Scroll times right'
      onClick={scroll.scrollRight}
      disabled={!scroll.canScrollRight}
    />
  </div>
);
}
