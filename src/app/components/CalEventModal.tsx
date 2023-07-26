'use client';
import Modal from 'react-modal';
import { Dispatch, SetStateAction } from 'react';
import { CycleDates } from '@/utils/types';
import { defaultStyles } from '@/utils/defaultStyles';

Modal.setAppElement('#event-modal');

const CalEventModal = ({
  choseDate,
  showEventModal,
  setShowEventModal,
}: {
  choseDate: Date;
  showEventModal: boolean;
  setShowEventModal: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="m-8 p-8 flex justify-center items-center">
      <Modal
        isOpen={showEventModal}
        onRequestClose={() => setShowEventModal(false)}
        overlayClassName="bg-[rgba(0,0,0,.4] flex justify-center items-center absolute top-0 left-0 h-screen w-screen"
        className="w-3/4 border-2 border-black bg-white rounded-xl p-8"
      >
        <h1 className="text-xl mb-6">Here&apos;s an event (modal)...</h1>
        <p>Event on {choseDate.toDateString()}</p>
      </Modal>
    </div>
  );
};

export default CalEventModal;
