import { CycleDate, CycleDates } from '@/lib/types';
import { isWithinInterval } from 'date-fns';

export function isWithinRange(date: Date, range: Date[]): boolean {
  const start = range[0];
  const end = range[1];
  return isWithinInterval(date, { start, end });
}

export function isWithinRanges(date: Date, ranges: Date[][]): boolean {
  return ranges.some((range) => isWithinRange(date, range));
}

export function getCycleFromSelected (date: Date, dates: CycleDates): CycleDate {
  let foundCycle;
  for (var i = 0; i < dates.length; i++) {
    const { menstrualRange } = dates[i];
    if (isWithinRange(date, [menstrualRange[0], menstrualRange[1]])) {
      foundCycle = dates[i];
    }
  }
  return foundCycle as CycleDate;
};

// TO-DO - type the 'range' so TS leaves me alone
export function rangeToStyle(dates: CycleDates, range: keyof typeof dates[0]): Date[][] {
  return dates.map((cycle) => cycle[range].map((dates: Date[]) => dates));
}

export function styleRangeBounds(date: Date, ranges: Date[][]): string {
  let style = '';
  const roundedDate = `${date.getDate()}${date.getMonth()}${date.getFullYear()}`;
  ranges.forEach((range) => {
    let roundedFirstBound = `${range[0].getDate()}${range[0].getMonth()}${range[0].getFullYear()}`;
    let roundedLastBound = `${range[1].getDate()}${range[1].getMonth()}${range[1].getFullYear()}`;
    if (roundedDate === roundedFirstBound) {
      style += 'first';
    }
    if (roundedDate === roundedLastBound) {
      style += 'last';
    }
  });
  return style;
}
