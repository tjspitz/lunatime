'use client';
import { Dispatch, SetStateAction, useEffect, MouseEvent, useState } from 'react';
import { CycleDates, CalRanges, CalModals } from '@/lib/types';
import { add } from 'date-fns';
import Modal from 'react-modal';
import Button from '@/components/Button';

Modal.setAppElement('#action-modal');

export default function CalActionModal({
  date,
  cycleDates,
  modals,
  setModals,
  ranges,
  isWithinRanges,
}: {
  date: Date;
  cycleDates: CycleDates;
  modals: CalModals;
  setModals: Dispatch<SetStateAction<CalModals>>;
  ranges: CalRanges;
  isWithinRanges: (date: Date, ranges: Date[][]) => boolean;
}) {
  const [canMarkNextPeriod, setCanMarkNextPeriod] = useState<Date[]>([new Date(), new Date()]);
  const { fertileRanges, pmsRanges, menstrualRanges } = ranges;
  const { actionModal, noteModal, eventModal } = modals;

  useEffect(() => {
    const prevPeriodEnd = menstrualRanges[menstrualRanges.length - 2][1];
    const curPeriodStart = menstrualRanges[menstrualRanges.length - 1][0];
    setCanMarkNextPeriod([prevPeriodEnd, curPeriodStart]);
  }, [cycleDates]);

  const showEventPrompt = (): boolean => {
    const [prevLimit, curLimit] = canMarkNextPeriod;
    if (date > prevLimit && date < curLimit) {
      return true;
    }
    return false;
  };

  const handleChoice = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    const choice = e.target.innerText; // TO-DO?
    if (choice.includes('Note')) {
      setModals((s) => ({ ...s, noteModal: true, actionModal: false }));
    } else if (choice.includes('Event')) {
      setModals((s) => ({ ...s, eventModal: true, actionModal: false }));
    }
  };

  return (
    <div id="action-modal">
      <Modal
        isOpen={actionModal}
        onRequestClose={() => setModals((s) => ({ ...s, actionModal: false }))}
        // overlayClassName={defaultStyles.modalOverlay}
        // className={defaultStyles.modalStyle}
      >
        <h1 className="mb-6 text-xl">Would you like to...</h1>
        <Button
          intent="primary"
          size="medium"
          onClick={handleChoice}
        >
          Add a Note
        </Button>
        {showEventPrompt() && (
          <Button
            intent="primary"
            size="medium"
            onClick={handleChoice}
          >
            Edit an Event
          </Button>
        )}
      </Modal>
    </div>
  );
}

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
