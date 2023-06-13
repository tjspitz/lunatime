'use client';
import 'react-calendar/dist/Calendar.css';
import styles from './styles.module.css';
import Calendar from 'react-calendar';
import { CycleDates } from './page';

import { differenceInCalendarDays, isWithinInterval } from 'date-fns';
import { useEffect, useState } from 'react';

const isSameDay = (a: Date, b: Date) => differenceInCalendarDays(a, b) === 0;

const isWithinRange = (date, range) => {
  return isWithinInterval(date, { start: range[0], end: range[range.length - 1] });
}

const isWithinRanges = (date, ranges) => {
  return ranges.some((range) => isWithinRange(date, range));
};

const rangesToStyle = (cycleDates: CycleDates, start: string, end: string): [] => {
  const ranges: [] = [];
  const { dates } = cycleDates;

  dates.forEach((entry) => {
    const { cycle } = entry;
    const subRange: [] = [];

    for (const key in cycle) {
      if (key === start) {
        subRange.push(cycle[start]);
      }
      if (key === end) {
        subRange.push(cycle[end]);
      }
    }
    ranges.push(subRange);
  })

  return ranges;
};

export default function CalendarContainer({ dates }: { dates: CycleDates }) {
  const [cycleDates, setCycleDates] = useState(dates);
  const [value, setValue] = useState(new Date());
  const [fertileRanges, setFertileRanges] = useState(rangesToStyle(dates, 'fStart', 'fEnd'));
  const [pmsRanges, setPmsRanges] = useState(rangesToStyle(dates, 'pStart', 'pEnd'));
  const [menstrualRanges, setMenstrualRanges] = useState(rangesToStyle(dates, 'mStart', 'mEnd'));

  const handleChange = (newDate: Date) => {
    console.log('selected range: ', newDate);

    setValue(newDate);
  };

  const tileClassName = ({ date, view }: { date: Date; view: String }) => {
    let style = 'min-h-[10vh]';

    if (view === 'month') {
      if (isWithinRanges(date, fertileRanges)) {
        style += ' ' + styles.fertile;
      }
      if (isWithinRanges(date, pmsRanges)) {
        style += ' ' + styles.pms;
      }
      if (isWithinRanges(date, menstrualRanges)) {
        style += ' ' + styles.menstrual;
      }
      // if ()
    }
    return style;
  };

  return (
    <main className="flex flex-col m-8 min-h-min">
      <Calendar
        className={'min-w-max'}
        tileClassName={tileClassName}
        calendarType="US"
        view="month"
        minDetail="year"
        selectRange={true}
        value={value}
        onChange={handleChange}
      />
    </main>
  );
}
