'use client';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import Modal from 'react-modal';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { CycleDates, PutCycles, RangeData } from '@/utils/types';
import { defaultStyles } from '@/utils/defaultStyles';

Modal.setAppElement('#cal-modal');

const putCycles: PutCycles = async (id, dates) => {
  try {
    const url = 'http://localhost:3000/api/calendar';
    const params = new URLSearchParams({ userId: id });
    const options = {
      method: 'PUT',
      body: JSON.stringify(dates),
    };
    const res = await fetch(`${url}?${params}`, options);
    return res.json();
  } catch (error: any) {
    console.error(error);
    return {} as CycleDates;
  }
};

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
  const [value, setValue] = useState(date);

  useEffect(() => setCurrentRange(findRange()), [date]);
  useEffect(() => setNewRange(currentRange), [currentRange]);

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
          type: 'menstrual',
          range: [cycle.mStart, cycle.mEnd],
        };
      }
    }
    return {} as RangeData;
  };

  const handleChange = (newDate: Date): void => {
    setValue(newDate);
    setNewRange({
      index: currentRange.index,
      type: currentRange.type,
      range: newDate, // TODO
    });
  };

  const handleSaveClick = (e: any): void => {
    e.preventDefault();
    const i = newRange.index;
    const start = newRange.type[0] + 'Start';
    const end = newRange.type[0] + 'End';
    const newCycles = { ...cycleDates };
    newCycles.dates[i].cycle[start] = newRange.range[0];
    newCycles.dates[i].cycle[end] = newRange.range[1];

    putCycles(cycleDates._id, newCycles);
    setCycleDates(newCycles);
    setShowEventModal(false);
  };

  const handleModalClose = (e: any): void => {
    e.preventDefault();
    setShowEventModal(false);
  };

  return (
    <div className={
      `${defaultStyles.modalDiv} ${showEventModal ? '' : 'hidden'}`
      }>
      <Modal
        isOpen={showEventModal}
        onRequestClose={handleModalClose}
        overlayClassName={defaultStyles.modalOverlay}
        className={defaultStyles.modalStyle}
      >
        <div className="flex justify-between">
          <h1 className="text-xl mb-6">Editing {date.toDateString()}...</h1>
          <button
            className={`self-start text-lg text-gray-500 ${defaultStyles.hoverMed} hover:text-red-400`}
            onClick={handleModalClose}
          >
            X
          </button>
        </div>
        <p className="text-med mb-2">
          Please choose a new range of dates for this {currentRange.type} event:
        </p>
        <Calendar
          className={'min-w-fit'}
          calendarType="US"
          view="month"
          minDetail="month"
          selectRange={true}
          value={date} // need some styling a la tileClassName
          onChange={handleChange}
        />
        <button
          className={`mt-4 px-4 py-2 bg-blue-500 text-white rounded-md ${defaultStyles.hoverMed}`}
          onClick={handleSaveClick}
        >
          Save
        </button>
      </Modal>
    </div>
  );
};

export default CalEventModal;
