'use client';
import clsx from 'clsx';
import 'react-calendar/dist/Calendar.css';
import styles from './styles.module.css';
import Calendar from 'react-calendar';
import CalActionModal from '@/components/CalActionModal';
import CalNoteModal from '@/components/CalNoteModal';
import CalEventModal from '@/components/CalEventModal';
import { CycleDates, CycleInfo } from '@/lib/types';
import { isWithinInterval } from 'date-fns';
import { useEffect, useState } from 'react';

export default function CalendarContainer({ cycles }: { cycles: CycleInfo }) {
  const [cycleDates, setCycleDates] = useState<CycleDates>(cycles.dates);
  const [value, setValue] = useState(new Date());
  const [fertileRanges, setFertileRanges] = useState<Date[][]>(
    rangeToStyle(cycleDates, 'fertileRange')
  );
  const [pmsRanges, setPmsRanges] = useState<Date[][]>(
    rangeToStyle(cycleDates, 'pmsRange')
  );
  const [menstrualRanges, setMenstrualRanges] = useState<Date[][]>(
    rangeToStyle(cycleDates, 'menstrualRange')
  );
  const [showActionModal, setShowActionModal] = useState<boolean>(false);
  const [showNoteModal, setShowNoteModal] = useState<boolean>(false);
  const [showEventModal, setShowEventModal] = useState<boolean>(false);

  useEffect(() => {
    setFertileRanges(rangeToStyle(cycleDates, 'fertileRange'));
    setPmsRanges(rangeToStyle(cycleDates, 'pmsRange'));
    setMenstrualRanges(rangeToStyle(cycleDates, 'menstrualRange'));
  }, [cycleDates]);

  const handleChange = (newDate: Date): void => {
    setValue(newDate);
    setShowActionModal(true);
  };

  const tileClassName = ({
    date,
    view,
  }: {
    date: Date;
    view: String;
  }): string => {
    // WILL NOT play well w/ Tailwind classes...
      // as of now, will ONLY play well w/ raw CSS
      // hence the CSS module in the calendar dir
    let style = '';

    if (view === 'month') {
        if (isWithinRanges(date, fertileRanges)) {
          style = clsx(style, styles.fertile, styles[styleRangeBounds(date, fertileRanges)]);
        }
        if (isWithinRanges(date, pmsRanges)) {
          style = clsx(style, styles.pms, styles[styleRangeBounds(date, pmsRanges)]);
        }
        if (isWithinRanges(date, menstrualRanges)) {
          style = clsx(style, styles.period, styles[styleRangeBounds(date, menstrualRanges)]);
        }
      }
    return style;
  };

  return (
    <main className="flex flex-col w-3/4 m-8 min-h-min">
      <Calendar
        className={'min-w-fit'}
        tileClassName={tileClassName}
        calendarType="US"
        view="month"
        minDetail="year"
        value={value}
        onChange={handleChange}
      />
      {/* <div>
        <CalActionModal
          date={value}
          cycleDates={cycleDates}
          showActionModal={showActionModal}
          setShowActionModal={setShowActionModal}
          setShowNoteModal={setShowNoteModal}
          setShowEventModal={setShowEventModal}
          fertileRanges={fertileRanges}
          pmsRanges={pmsRanges}
          menstrualRanges={menstrualRanges}
          isWithinRanges={isWithinRanges}
        />
      </div>
      <div>
        <CalNoteModal
          date={value}
          showNoteModal={showNoteModal}
          setShowNoteModal={setShowNoteModal}
        />
      </div>
      <div>
        <CalEventModal
          date={value}
          cycleDates={cycleDates}
          setCycleDates={setCycleDates}
          showEventModal={showEventModal}
          setShowEventModal={setShowEventModal}
          isWithinRange={isWithinRange}
        />
      </div> */}
    </main>
  );
}

function isWithinRange(date: Date, range: Date[]): boolean {
  const start = range[0];
  const end = range[1];
  return isWithinInterval(date, { start, end });
}

function isWithinRanges(date: Date, ranges: Date[][]): boolean {
  return ranges.some((range) => isWithinRange(date, range));
}

function styleRangeBounds(date: Date, ranges: Date[][]): string {
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

// TO-DO - type the 'range' so TS leaves me alone
function rangeToStyle(dates: CycleDates, range: keyof typeof dates[0]): Date[][] {
  return dates.map((cycle) => cycle[range].map((str: string) => new Date(str)));
}
