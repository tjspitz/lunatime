'use client';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import Modal from 'react-modal';
import Button from '@/components/Button';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { CalModals, CycleDates, PutCycles, RangeData } from '@/lib/types';
import { defaultStyles } from '@/lib/defaultStyles';

Modal.setAppElement('#event-modal');

const defaultRange: RangeData = {
  index: -1,
  type: '',
  range: [new Date(), new Date()],
};

export default function CalEventModal({
  date,
  cycleDates,
  setCycleDates,
  modals,
  setModals,
  isWithinRange,
}: {
  date: Date;
  cycleDates: CycleDates;
  setCycleDates: Dispatch<SetStateAction<CycleDates>>;
  modals: CalModals;
  setModals: Dispatch<SetStateAction<CalModals>>;
  isWithinRange: (date: Date, range: Date[]) => boolean;
}) {
  const [value, setValue] = useState(date);
  const [currentRange, setCurrentRange] = useState<RangeData>({ ...defaultRange });
  const [newRange, setNewRange] = useState<RangeData>({ ...defaultRange });
  const [newEventType, setNewEventType] = useState<string>('');

  useEffect(() => setCurrentRange(findRange()), [date]);
  useEffect(() => setNewRange(currentRange), [currentRange]);

  const findRange = (): RangeData => {
    const today = date;
    for (var i = 0; i < cycleDates.length; i++) {
      const { fertileRange, pmsRange, menstrualRange } = cycleDates[i];
      if (today > menstrualRange[1]) {
        continue;
      }
      if (isWithinRange(today, [fertileRange[0], fertileRange[1]])) {
        return {
          index: i,
          type: 'fertile',
          range: [fertileRange[0], fertileRange[1]],
        };
      }
      if (isWithinRange(today, [pmsRange[0], pmsRange[1]])) {
        return {
          index: i,
          type: 'pre-menstrual',
          range: [pmsRange[0], pmsRange[1]],
        };
      }
      if (isWithinRange(today, [menstrualRange[0], menstrualRange[1]])) {
        return {
          index: i,
          type: 'menstrual',
          range: [menstrualRange[0], menstrualRange[1]],
        };
      }
    }
    return {} as RangeData;
  };

  const handleChange = (newDate: Date): void => {
    setValue(newDate);
    setNewRange({
      index: currentRange.index,
      type: currentRange.type || newEventType,
      range: [date, newDate], // TODO
    });
  };

  const handleSaveClick = (e: any): void => {
    e.preventDefault();
    const i = newRange.index;
    const start = newRange.type[0] + 'Start';
    const end = newRange.type[0] + 'End';
    const newCycles = { ...cycleDates };
    newCycles[i].cycle[start] = newRange.range[0];
    newCycles[i].cycle[end] = newRange.range[1];
    putCycles(cycleDates._id, newCycles);
    setCycleDates(newCycles);
    setModals((s) => ({ ...s, eventModal: false }));
  };

  const handleModalClose = (e: any): void => {
    e.preventDefault();
    setNewRange({ ...defaultRange });
    setNewEventType('');
    setModals((s) => ({ ...s, eventModal: false }));
  };

  const handleTypeClick = (e: any): void => {
    e.preventDefault();
    setNewEventType(e.target.innerText);
  };

  return (
    <div id="event-modal">
      <Modal
        isOpen={modals.eventModal}
        onRequestClose={handleModalClose}
        // overlayClassName={defaultStyles.modalOverlay}
        // className={defaultStyles.modalStyle}
      >
        <div className="flex justify-between">
          <h1 className="mb-6 text-xl">Editing {date.toDateString()}...</h1>
          <Button
            intent="primary"
            size="medium"
            onClick={handleModalClose}
          >
            X
          </ Button>
        </div>
        {currentRange.type ? (
          <>
            <p className="mb-2 text-med">
              Please choose a new range of dates for this {currentRange.type}{' '}
              event:
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
          </>
        ) : (
          <>
            <p className="mb-2 text-med">
              Creating a new {newEventType} event:
            </p>
            {['Fertility', 'Pre-Menstrual', 'Menstruation'].map((text, i) => (
              <Button
                key={i + text}
                intent="secondary"
                size="small"
                className="focus:ring focus:ring-red-900"
                onClick={handleTypeClick}
              >
                {text}
              </Button>
            ))}
            <Calendar
              className={'min-w-fit'}
              calendarType="US"
              view="month"
              minDetail="month"
              selectRange={false}
              value={value}
              onChange={handleChange}
            />
          </>
        )}
        <Button
            intent="primary"
            size="medium"
          onClick={handleSaveClick}
        >
          Save
        </Button>
      </Modal>
    </div>
  );
}

async function putCycles(id, dates): Promise<PutCycles> {
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
}
