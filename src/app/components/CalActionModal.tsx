'use client';
import { Dispatch, SetStateAction, useEffect, useState  } from 'react';
import { defaultStyles } from '@/utils/defaultStyles';
import { CycleDates } from '@/utils/types';
import Modal from 'react-modal';

Modal.setAppElement('#action-modal');

const CalActionModal = ({
  date,
  cycleDates,
  showActionModal,
  setShowActionModal,
  setShowNoteModal,
  setShowEventModal,
  fertileRanges,
  pmsRanges,
  menstrualRanges,
  isWithinRanges,
}: {
  date: Date;
  cycleDates: CycleDates;
  showActionModal: boolean;
  setShowActionModal: Dispatch<SetStateAction<boolean>>;
  setShowNoteModal: Dispatch<SetStateAction<boolean>>;
  setShowEventModal: Dispatch<SetStateAction<boolean>>;
  fertileRanges: Date[][];
  pmsRanges: Date[][];
  menstrualRanges: Date[][];
  isWithinRanges: (date: Date, ranges: Date[][]) => boolean;
}) => {
  const { dates } = cycleDates;
  const [finalDate, setFinalDate] = useState<Date>(new Date());
  useEffect(() => setFinalDate(dates[dates.length - 1].cycle.mEnd || new Date()), [dates]);

  const handleChoice = (e: any): void => {
    e.preventDefault();
    const choice = e.target.innerText;
    if (choice.includes('Note')) {
      setShowNoteModal(true);
    } else if (choice.includes('Event')) {
      setShowEventModal(true);
    }
    setShowActionModal(false);
  };

  const showEventPrompt = (): boolean => {
    if (
      date <= finalDate &&
      (isWithinRanges(date, fertileRanges) ||
        isWithinRanges(date, pmsRanges) ||
        isWithinRanges(date, menstrualRanges))
    ) {
      return true;
    }
    return false;
  };

  return (
    <div className="m-8 p-8 flex justify-center items-center">
      <Modal
        isOpen={showActionModal}
        onRequestClose={() => setShowActionModal(false)}
        overlayClassName={defaultStyles.modalOverlay}
        className={defaultStyles.modalStyle}
      >
        <h1 className="text-xl mb-6">Would you like to...</h1>
        <button
          className={defaultStyles.button + defaultStyles.hoverSm}
          onClick={handleChoice}
        >
          Add a Note
        </button>
        {showEventPrompt() && (
          <button
            className={defaultStyles.button + defaultStyles.hoverSm}
            onClick={handleChoice}
          >
            Add or Edit an Event
          </button>
        )}
      </Modal>
    </div>
  );
};

export default CalActionModal;

/*
click on any given date...

AS LONG AS THERE IS AT LEAST ONE COMPLETE CYCLE AVAILABLE
  [x]if the current date is NOT within a cycle range AND it is LESS THAN the "oldest" possible date
    prompt to enter a Note

  if the current date is GREATER THAN the "oldest" possible date (or there are no dates yet)
    prompt to enter a Note
    prompt to start a new cycle
      choose fertile, pms, or menstrual (default fertile)
      if fertile is chosen
        calculate entire cycle & build rest of object (based on past dates)
      if pms or menstrual is chosen
        calculate backdated parts & build rest of object (based on past dates)
      when "save" is clicked, advise that the cycle will be estimated & edits can be made at any time

  if the current date falls WITHIN a cycle range, detect WHICH range it is, and...
    prompt to enter a Note
    prompt to edit THAT particular range
      generate a slider that will represent the start & end dates?
      generate another date picker?
    when "save" is clicked, ask if following cycles should be updated automatically
      if yes, adjust all cycles by whatever parameters have been changed, then submit to the PATCH
        i.e. start date moved back 2 days & end back 1 day, move all other starts back 2 days, ends back 1
      if no, submit as-is to the PATCH

THERE ARE NO COMPLETE CYCLES YET (NEW USER)
  prompt to enter a Note

  if the cycle object is EMPTY
    prompt to start a new cycle
      choose fertile, pms, or menstrual (default fertile)
      assign current date as f/p/m/Start

  if the cycle object is PARTIAL
    if there is an f/p/m/Start with no End recorded
      prompt to update corresponding f/p/m/End
      (or) prompt to mark *other* start
    if it is semi-complete i.e. fStart & fEnd exist but p/m do not
      prompt to mark current date as nextThing/Start

*/
