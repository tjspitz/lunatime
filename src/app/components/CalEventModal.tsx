'use client';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { CycleDates } from '@/utils/types';
import { defaultStyles } from '@/utils/defaultStyles';
import Modal from 'react-modal';

Modal.setAppElement('#event-modal');

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
  const [currentRange, setCurrentRange] = useState<Date[]>([]);
  useEffect(() => setCurrentRange(findRange()), [date])
  /*
    [x] detect specific date range that `date` resides in
      [x] search corresponding props
      [x] once found, apply that specific range to a state
    [] supply that state (range) to a slider
      [] adjust the slider to edit the range itself
      [] save changes (PATCH)
  */
  const findRange = (): Date[] => {
    const today = date;
    const { dates } = cycleDates;
    for (let i = 0; i < dates.length; i ++) {
      const cycle = dates[i].cycle;
      if (today > cycle.mEnd) {
        continue;
      }
      if (isWithinRange(today, [cycle.fStart, cycle.fEnd])) {
        return [cycle.fStart, cycle.fEnd];
      }
      if (isWithinRange(today, [cycle.pStart, cycle.pEnd])) {
        return [cycle.pStart, cycle.pEnd];
      }
      if (isWithinRange(today, [cycle.mStart, cycle.mEnd])) {
        return [cycle.mStart, cycle.mEnd];
      }
    }
    return [];
  };

  return (
    <div className="m-8 p-8 flex justify-center items-center">
      <Modal
        isOpen={showEventModal}
        onRequestClose={() => setShowEventModal(false)}
        overlayClassName={defaultStyles.modalOverlay}
        className={defaultStyles.modalStyle}
      >
        <h1 className="text-xl mb-6">Here&apos;s an event (modal)...</h1>
        <p>Event on {date.toDateString()}</p>
      </Modal>
    </div>
  );
};

export default CalEventModal;
