import {
  addWeeks,
  eachDayOfInterval,
  eachMinuteOfInterval,
  set,
} from "date-fns";

const DATE_RANGE_WEEKS = 6;
const SLOT_INTERVAL_MINUTES = 15;
const WORKDAY_START = 9;
const WORKDAY_END = 18;

export type DateOption = {
  date: Date;
  iso: string;
};

export const getDateOptions = (startDate: Date): DateOption[] => {
  const endDate = addWeeks(startDate, DATE_RANGE_WEEKS);
  return eachDayOfInterval({ start: startDate, end: endDate }).map((date) => ({
    date,
    iso: date.toISOString(),
  }));
};

export const getTimeSlots = (sessionDate: Date | null): Date[] => {
  if (!sessionDate) return [];

  const start = set(sessionDate, {
    hours: WORKDAY_START,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });

  const end = set(sessionDate, {
    hours: WORKDAY_END,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });

  return eachMinuteOfInterval(
    { start, end },
    { step: SLOT_INTERVAL_MINUTES },
  );
};
