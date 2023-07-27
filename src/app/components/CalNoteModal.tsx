'use client';
import { Dispatch, SetStateAction, useState } from 'react';
import { defaultStyles } from '@/utils/defaultStyles';
import Modal from 'react-modal';

Modal.setAppElement('#note-modal');

const CalNoteModal = ({
  date,
  showNoteModal,
  setShowNoteModal,
}: {
  date: Date;
  showNoteModal: boolean;
  setShowNoteModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const [noteEntry, setNoteEntry] = useState<string>('');
  const handleChange = (e: any): void => {
    e.preventDefault();
    setNoteEntry(e.target.value);
  };
  const handleClose = (): void => {
    setNoteEntry('');
    setShowNoteModal(false);
  };

  return (
    <div className="m-8 p-8 flex justify-center items-center">
      <Modal
        isOpen={showNoteModal}
        onRequestClose={handleClose}
        overlayClassName={defaultStyles.modalOverlay}
        className={defaultStyles.modalStyle}
      >
        <h1 className="text-xl mb-6">Enter a Note (modal)...</h1>
        <label>
          Add a note for {date.toDateString()}...
          <textarea
            name="newNote"
            rows={6}
            cols={60}
            className="border-2 border-black"
            onChange={handleChange}
          />
        </label>
      </Modal>
    </div>
  );
};

export default CalNoteModal;
