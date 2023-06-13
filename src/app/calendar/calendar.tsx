'use client';
import 'react-calendar/dist/Calendar.css';
import styles from './styles.module.css';
import Calendar from 'react-calendar';
import { CycleDates } from './page';

import { differenceInCalendarDays, isWithinInterval } from 'date-fns';
import { useEffect, useState } from 'react';

// const isSameDay = (a: Date, b: Date) => differenceInCalendarDays(a, b) === 0;

// const isWithinRange = (date, range) => {
//   return isWithinInterval(date, {/* start: range[?], end: range[1] */})
// }

// const isWithinRanges = (date, ranges) => {
//   return ranges.some((range) => isWithinRange(date, range))
// };

const rangesToStyle = (cycleDates: CycleDates, start, end): [] => {
  const ranges: [] = [];
  const { dates } = cycleDates;

  dates.forEach((entry) => {
    const { cycle } = entry;
    const subRange: [] = [];

    for (const key in cycle) {
      if (key.toString() === start) {
        subRange.push(cycle[start]);
      }
      if (key.toString() === end) {
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
  // const [styledDates, setStyledDates] = useState(rangesToStyle(dates));

  const fertileRange: [] = rangesToStyle(dates, 'fStart', 'fEnd')
  const pmsRange: [] = rangesToStyle(dates, 'pStart', 'pEnd');
  const menstrualRange: [] = rangesToStyle(dates, 'mStart', 'mEnd');

  console.log('fertileRange? ', fertileRange);
  console.log('pmsRange? ', pmsRange);
  console.log('menstrualRange? ', menstrualRange);

  const handleChange = (newDate: Date) => {
    console.log(newDate);

    setValue(newDate);
  };

  // const tileClassName = ({ date, view }: { date: Date; view: String }) => {
  //   let style = 'min-h-[10vh]';

  //   if (view === 'month') {
  //     if (true) {
  //       style += ' ' + styles.fertile;
  //     }
  //     if (isWithinRanges(date, pmsRange)) {
  //       style += ' ' + styles.pms;
  //     }
  //     if (isWithinRanges(date, menstrualRange)) {
  //       style += ' ' + styles.menstrual;
  //     }
  //   }
  //   return style;
  // };

  return (
    <main className="flex flex-col m-8 min-h-min">
      <Calendar
        className={'min-w-max'}
        // tileClassName={tileClassName}
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
