'use client';
import { Dispatch, SetStateAction } from 'react';
import { defaultStyles } from '@/utils/defaultStyles';
import Modal from 'react-modal';

Modal.setAppElement('#action-modal');

const CalActionModal = ({
  choseDate,
  showActionModal,
  setShowActionModal,
  setShowNoteModal,
  setShowEventModal,
}: {
  choseDate: Date;
  showActionModal: boolean;
  setShowActionModal: Dispatch<SetStateAction<boolean>>;
  setShowNoteModal: Dispatch<SetStateAction<boolean>>;
  setShowEventModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const handleChoice = (e: any): void => {
    e.preventDefault();
    const choice = e.target.innerText;
    if (choice === 'Add a Note') {
      setShowNoteModal(true);

    } else if (choice === 'Record an Event') {
      setShowEventModal(true);
    }
    setShowActionModal(false);
  };

  return (
    <div className="m-8 p-8 flex justify-center items-center">
      <Modal
        isOpen={showActionModal}
        onRequestClose={() => setShowActionModal(false)}
        overlayClassName="bg-[rgba(0,0,0,.4] flex justify-center items-center absolute top-0 left-0 h-screen w-screen"
        className="w-3/4 border-2 border-black bg-white rounded-xl p-8"
      >
        <h1 className="text-xl mb-6">Would you like to...</h1>
        <button
          className={defaultStyles.button + defaultStyles.hoverSm}
          onClick={handleChoice}
        >
          Add a Note
        </button>
        <button
          className={defaultStyles.button + defaultStyles.hoverSm}
          onClick={handleChoice}
        >
          Record an Event
        </button>
      </Modal>
    </div>
  );
};

export default CalActionModal;

    /*
    modal: what would you like to do?
    - set this as a fertile/pms/menstrual date
    - add a note to this date
    - nothing (x)
    */