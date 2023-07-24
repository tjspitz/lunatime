'use client';
import { Dispatch, SetStateAction, useState } from 'react';
import { styles } from '@/utils/styles';
import Modal from 'react-modal';

Modal.setAppElement('#note-modal');

const CalNoteModal = ({
  choseDate,
  showNoteModal,
  setShowNoteModal,
}: {
  choseDate: Date;
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
        overlayClassName="bg-[rgba(0,0,0,.4] flex justify-center items-center absolute top-0 left-0 h-screen w-screen"
        className="w-3/4 border-2 border-black bg-white rounded-xl p-8"
      >
        <h1 className="text-xl mb-6">Enter a Note (modal)...</h1>
        <label>
          Add a note for {choseDate.toString()}...
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
