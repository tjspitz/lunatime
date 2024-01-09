'use client';
import { CalModals } from '@/lib/types';
import { Dispatch, MouseEvent, SetStateAction, useState } from 'react';
// import { defaultStyles } from '@/lib/defaultStyles';
import Modal from 'react-modal';
import Button from '@/components/Button';

Modal.setAppElement('#note-modal');

export default function CalNoteModal ({
  date,
  modals,
  setModals,
}: {
  date: Date;
  modals: CalModals;
  setModals: Dispatch<SetStateAction<CalModals>>;
}) {
  const [noteEntry, setNoteEntry] = useState<string>('');
  const { noteModal } = modals;

  const handleChange = (e: any): void => {
    e.preventDefault();
    setNoteEntry(e.target.value);
  };

  const handleClose = (): void => {
    setNoteEntry('');
    setModals((s) => ({ ...s, noteModal: false}));
  };

  const handleSaveClick = (e: MouseEvent<HTMLButtonElement>): void => {
    // TO-DO:
    // make POST to User.notes[]
  };

  return (
    <div id="note-modal">
      <Modal
        isOpen={noteModal}
        onRequestClose={handleClose}
        // overlayClassName={defaultStyles.modalOverlay}
        // className={defaultStyles.modalStyle}
      >
        <h1 className="mb-6 text-xl">Write your note...</h1>
        <label htmlFor="newNote">
          Add a note for {date.toDateString()}...
          <textarea
            name="newNote"
            rows={6}
            cols={60}
            className="border-2 border-black"
            onChange={handleChange}
          />
        </label>
        <Button
          intent="primary"
          size="medium"
          onClick={handleClose}
        >
          Cancel
        </Button>
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
};
