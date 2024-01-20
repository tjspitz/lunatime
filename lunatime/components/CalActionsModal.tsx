'use client';
import { deleteCycle } from '@/lib/api';
import { CalModals, CalRanges, CycleDates, CycleInfo } from '@/lib/types';
import { getCycleFromSelected } from '@/lib/utils/calUtils';
import { add } from 'date-fns';
import {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import Modal from 'react-modal';
import Button from './Button';

Modal.setAppElement('#action-modal');

/*
  model this after the 'AuthForm', which takes a 'mode' prop
  instead of the logic to determine which buttons to render being here,
  we'll move that logic (and add some) to 'calendar.tsx' - so, on a date click,
  that logic will determine the 'mode' and pass it here

    namely this logic, but will need to be refactored & expanded:
        const [canMarkNextPeriod, setCanMarkNextPeriod] = useState<Date[]>([new Date(), new Date()]);

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

*/
export default function CalActionsModal({
  mode,
  date,
  user,
  modals,
  setModals,
  setActionModalMode,
  ranges,
  isWithinRanges,
}: {
  mode: string;
  date: Date;
  user: CycleInfo;
  modals: CalModals;
  setActionModalMode: Dispatch<SetStateAction<string>>;
  setModals: Dispatch<SetStateAction<CalModals>>;
  ranges: CalRanges;
  isWithinRanges: (date: Date, ranges: Date[][]) => boolean;
}) {
  const {dates: cycleDates } = user;
  const { actionModal } = modals;
  const selectedCycle = getCycleFromSelected(date, cycleDates);

  const handleChoice = async (choice: string) => {
    if (choice === 'note') {
      setModals((s) => ({ ...s, actionModal: false, noteModal: true }));
    }
    if (choice === 'edit') {
      alert('beep boop, you chose EDIT');
      // TODO - can select desired range, then save
      // should we pass along the 'choice' ...?
      setModals((s) => ({ ...s, actionModal: false, eventModal: true }));
    }
    if (choice === 'delete') {
      // TODO: show a confirmation
      await deleteCycle(user._id, selectedCycle._id);
      setModals((s) => ({ ...s, actionModal: false }));
    }
    setActionModalMode('');
  };

  const handleRequestClose = () => {
    setModals((s) => ({ ...s, actionModal: false }));
    setActionModalMode('');
  };

  return (
    <div id="action-modal">
      <Modal
        isOpen={actionModal}
        onRequestClose={handleRequestClose}
      >
        <h1 className="mb-6 text-xl text-center">What shall we do?</h1>
        <div className="flex my-8 justify-evenly">
          <Button
            intent="primary"
            size="medium"
            onClick={() => handleChoice('note')}
          >
            Add Note
          </Button>
          {mode === 'during-period' && (
            <>
              <Button
                intent="primary"
                size="medium"
                onClick={() => handleChoice('edit')}
              >
                Edit This Period
              </Button>
              <Button
                intent="primary"
                size="medium"
                onClick={() => handleChoice('delete')}
              >
                Delete This Period
              </Button>
            </>
          )}
          {/* {mode === 'post-final' && (
              <Button
              intent="primary"
              size="medium"
              onClick={() => handleChoice('begin')}
            >
              Begin Period
            </Button>
            )} */}
          {/* </div> */}
        </div>
      </Modal>
    </div>
  );
}
