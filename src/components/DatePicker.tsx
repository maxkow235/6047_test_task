import { format } from 'date-fns';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowButton } from '@/components/ArrowButton';
import { useHorizontalScroll } from '@/hooks/useHorizontalScroll';
import type { DateOption } from '@/lib/schedule';

type DatePickerProps = {
  options: DateOption[];
  selectedIso: string;
  onSelect: (iso: string) => void;
};

export function DatePicker({
  options,
  selectedIso,
  onSelect,
}: DatePickerProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const scroll = useHorizontalScroll(trackRef, [options.length]);
  const [visibleMonth, setVisibleMonth] = useState(() =>
    options[0] ? format(options[0].date, 'LLL') : ''
  );

  const updateVisibleMonth = useCallback(() => {
    const container = trackRef.current;
    if (!container || options.length === 0) {
      setVisibleMonth(options[0] ? format(options[0].date, 'LLL') : '');
      return;
    }

    const items = Array.from(
      container.querySelectorAll<HTMLDivElement>('[data-date-item]')
    );
    const scrollLeft = container.scrollLeft;

    for (let index = 0; index < items.length; index += 1) {
      const el = items[index];
      const elementRight = el.offsetLeft + el.offsetWidth;
      if (elementRight - scrollLeft > 0) {
        setVisibleMonth(format(options[index].date, 'LLL'));
        return;
      }
    }

    setVisibleMonth(format(options[options.length - 1].date, 'LLL'));
  }, [options]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(updateVisibleMonth);
    return () => window.cancelAnimationFrame(frame);
  }, [updateVisibleMonth]);

  useEffect(() => {
    const container = trackRef.current;
    if (!container) return undefined;
    const handleScroll = () => updateVisibleMonth();
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [updateVisibleMonth]);
  useEffect(() => {
    const container = trackRef.current;
    if (!container || !selectedIso) return;
    const target = container.querySelector<HTMLElement>(
      `[data-date-item="${selectedIso}"]`
    );
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [selectedIso]);

  return (
    <section>
      <div className='flex sm:ml-10 ml-2 text-sm text-slate-400'>
        {visibleMonth}
      </div>
      <div className='flex items-center sm:gap-3'>
        <ArrowButton
          direction='left'
          ariaLabel='Scroll dates left'
          onClick={scroll.scrollLeft}
          disabled={!scroll.canScrollLeft}
        />
        <div
          ref={trackRef}
          className='no-scrollbar flex w-full gap-3 overflow-x-auto px-1 py-2'
        >
          {options.map((option) => {
            const isSelected = option.iso === selectedIso;
            const baseClasses =
              'flex h-[64px] min-w-[64px] flex-col items-center justify-center rounded-[8px] text-center transition';
            const activeClasses =
              'border border-transparent bg-[var(--surface-active,_rgba(247,247,252,1))] text-[var(--text-accent,_rgba(222,58,107,1))]';
            const inactiveClasses =
              'border border-[var(--stroke-divider-stroke-primary,_rgba(232,235,244,1))] text-slate-900';

            return (
              <div
                key={option.iso}
                data-date-item={option.iso}
                className='min-w-[64px]'
              >
                <button
                  type='button'
                  onClick={() => onSelect(option.iso)}
                  className={`${baseClasses} ${
                    isSelected ? activeClasses : inactiveClasses
                  }`}
                >
                  <span>{format(option.date, 'EEE')}</span>
                  <span>{format(option.date, 'd')}</span>
                </button>
              </div>
            );
          })}
        </div>
        <ArrowButton
          direction='right'
          ariaLabel='Scroll dates right'
          onClick={scroll.scrollRight}
          disabled={!scroll.canScrollRight}
        />
      </div>
    </section>
  );
}
