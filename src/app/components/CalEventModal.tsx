'use client';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import Modal from 'react-modal';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { CycleDates, RangeData } from '@/utils/types';
import { defaultStyles } from '@/utils/defaultStyles';

Modal.setAppElement('#event-modal');

const defaultRange: RangeData = {
  index: -1,
  type: '',
  range: [new Date(), new Date()],
};

const CalEventModal = ({
  date,
  cycleDates,
  setCycleDates,
  showEventModal,
  setShowEventModal,
  isWithinRange,
}: {
  date: Date;
  cycleDates: CycleDates;
  setCycleDates: Dispatch<SetStateAction<CycleDates>>;
  showEventModal: boolean;
  setShowEventModal: Dispatch<SetStateAction<boolean>>;
  isWithinRange: (date: Date, range: Date[]) => boolean;
}) => {
  const [currentRange, setCurrentRange] = useState<RangeData>(defaultRange);
  const [newRange, setNewRange] = useState<RangeData>(defaultRange);
  useEffect(() => setCurrentRange(findRange()), [date]);
  useEffect(() => setNewRange(currentRange), [currentRange]);
  /*
    [x] detect specific date range that `date` resides in
      [x] search corresponding props
      [x] once found, apply that specific range to a state
    [x] show a mini-calendar to pick a new range from
      [x] set the new range to a state
      [] confirm/save changes (PATCH)
      [] style the mini-calendar nicely
  */
  const findRange = (): RangeData => {
    const today = date;
    const { dates } = cycleDates;
    for (let i = 0; i < dates.length; i ++) {
      const cycle = dates[i].cycle;
      if (today > cycle.mEnd) {
        continue;
      }
      if (isWithinRange(today, [cycle.fStart, cycle.fEnd])) {
        return {
          index: i,
          type: 'fertile',
          range: [cycle.fStart, cycle.fEnd],
        };
      }
      if (isWithinRange(today, [cycle.pStart, cycle.pEnd])) {
        return {
          index: i,
          type: 'pre-menstrual',
          range: [cycle.pStart, cycle.pEnd],
        };
      }
      if (isWithinRange(today, [cycle.mStart, cycle.mEnd])) {
        return {
          index: i,
          type: 'menstruation',
          range: [cycle.mStart, cycle.mEnd],
        };
      }
    }
    return {} as RangeData;
  };

  const handleChange = (dateRange: Date[]): void => {
    setNewRange({
      index: currentRange.index,
      type: currentRange.type,
      range: dateRange,
    });
  };

  return (
    <div className="m-8 p-8 flex justify-center items-center">
      <Modal
        isOpen={showEventModal}
        onRequestClose={() => setShowEventModal(false)}
        overlayClassName={defaultStyles.modalOverlay}
        className={defaultStyles.modalStyle}
      >
        <h1 className="text-xl mb-6">Editing {date.toDateString()}...</h1>
        <p className="text-med mb-2">
          Please choose a new range of dates for this {currentRange.type} event:
        </p>
        <Calendar
          className={'min-w-fit'}
          calendarType="US"
          view="month"
          minDetail="month"
          selectRange={true}
          value={date}
          onChange={handleChange}
        />
      </Modal>
    </div>
  );
};

export default CalEventModal;
