'use client';
import 'react-calendar/dist/Calendar.css';
import styles from './styles.module.css';
import Calendar from 'react-calendar';
import CalActionModal from '../components/CalActionModal';
import CalNoteModal from '../components/CalNoteModal';
import CalEventModal from '../components/CalEventModal';
import { CycleDates } from '@/utils/types';
import { isWithinInterval } from 'date-fns';
import { useEffect, useState } from 'react';

const isWithinRange = (date: Date, range: Date[]): boolean => {
  /*
   * seems like a workaround to a bug that should not exist...
   * backdating the start date by one day,
   * since if we start at the initial range - range[0],
   * isWithinInterval will not validate range[0],
   * this despite a lot of time invested trying to prove that
   * starting at range[0] was correctly following date-fns documentation
   * as well as other resources
   * tl;dr - the following 2 lines make it work as desired
   */
  const start = new Date(range[0]);
  start.setDate(start.getDate() - 1);

  return isWithinInterval(date, {
    start,
    end: range[range.length - 1],
  });
};

const isWithinRanges = (date: Date, ranges: Date[][]): boolean => {
  return ranges.some((range) => isWithinRange(date, range));
};

const findRangeBounds = (date: Date, ranges: Date[][]): string | undefined => {
  let prop: string | undefined;
  const roundedDate = `${date.getDate()}${date.getMonth()}${date.getFullYear()}`;
  ranges.forEach((range) => {
    let roundedFirstBound = `${range[0].getDate()}${range[0].getMonth()}${range[0].getFullYear()}`;
    let roundedLastBound = `${range[1].getDate()}${range[1].getMonth()}${range[1].getFullYear()}`;
    if (roundedDate === roundedFirstBound) {
      prop = 'first';
    }
    if (roundedDate === roundedLastBound) {
      prop = 'last';
    }
  });
  return prop;
};

const rangesToStyle = (
  cycleDates: CycleDates,
  start: string,
  end: string
): Date[][] => {
  const ranges: Date[][] = [];
  const { dates } = cycleDates;

  dates.forEach((entry) => {
    const { cycle } = entry;
    const subRange: Date[] = [];

    for (const key in cycle) {
      if (key === start) {
        subRange.push(cycle[start]);
      }
      if (key === end) {
        subRange.push(cycle[end]);
      }
    }
    ranges.push(subRange);
  });
  return ranges;
};

const CalendarContainer = ({ dates }: { dates: CycleDates }) => {
  const [cycleDates, setCycleDates] = useState<CycleDates>(dates);
  const [value, setValue] = useState(new Date());
  const [fertileRanges, setFertileRanges] = useState<Date[][]>(
    rangesToStyle(dates, 'fStart', 'fEnd')
  );
  const [pmsRanges, setPmsRanges] = useState<Date[][]>(
    rangesToStyle(dates, 'pStart', 'pEnd')
  );
  const [menstrualRanges, setMenstrualRanges] = useState<Date[][]>(
    rangesToStyle(dates, 'mStart', 'mEnd')
  );
  const [showActionModal, setShowActionModal] = useState<boolean>(false);
  const [showNoteModal, setShowNoteModal] = useState<boolean>(false);
  const [showEventModal, setShowEventModal] = useState<boolean>(false);

  // useEffect(() => setValue(value), [value]);

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
    let style = 'min-h-[10vh] text-med';

    if (view === 'month') {
      if (isWithinRanges(date, fertileRanges)) {
        style += ' ' + styles.fertile;
        style += ' ' + styles[findRangeBounds(date, fertileRanges)] || '';
      }
      if (isWithinRanges(date, pmsRanges)) {
        style += ' ' + styles.pms;
        style += ' ' + styles[findRangeBounds(date, pmsRanges)] || '';
      }
      if (isWithinRanges(date, menstrualRanges)) {
        style += ' ' + styles.menstrual;
        style += ' ' + styles[findRangeBounds(date, menstrualRanges)] || '';
      }
    }
    return style;
  };

  return (
    <main className="flex flex-col m-8 min-h-min w-3/4">
      <Calendar
        className={'min-w-fit'}
        tileClassName={tileClassName}
        calendarType="US"
        view="month"
        minDetail="year"
        // selectRange={true}
        value={value}
        onChange={handleChange}
      />
      <div id="action-modal">
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
      <div id='note-modal'>
        <CalNoteModal
          date={value}
          showNoteModal={showNoteModal}
          setShowNoteModal={setShowNoteModal}
        />
      </div>
      <div id='event-modal'>
        <CalEventModal
          date={value}
          cycleDates={cycleDates}
          setCycleDates={setCycleDates}
          showEventModal={showEventModal}
          setShowEventModal={setShowEventModal}
          isWithinRange={isWithinRange}
        />
      </div>
    </main>
  );
};

export default CalendarContainer;
