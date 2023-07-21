'use client';
import { useState } from 'react';
import Modal from 'react-modal';
import { styles } from '@/utils/styles';

Modal.setAppElement('#modal');

const CalActionModal = () => {
  const [open, setOpen] = useState<boolean>(false);


  const handleChoice = (e: any): void => {
    e.preventDefault();
    console.log('choice: ', e.target.value);
    setOpen(!open);
  };

  return (
    <div className='m-8 p-8 flex justify-center items-center'>
      <button
        onClick={() => setOpen(!open)}
        className={styles.button + styles.hoverSm}
      >
        Open this modal
      </button>
      <Modal
        isOpen={open}
        onRequestClose={() => setOpen(!open)}
        overlayClassName='bg-[rgba(0,0,0,.4] flex justify-center items-center absolute top-0 left-0 h-screen w-screen'
        className='w-3/4 bg-white rounded-xl p-8'
      >
        <h1 className='text-xl mb-6'>Would you like to...</h1>
        <button
          className={styles.button + styles.hoverSm}
          onClick={handleChoice}
        >
          Add a Note?
        </button>
        <button
          className={styles.button + styles.hoverSm}
          onClick={handleChoice}
        >
          Record an Event?
        </button>
      </Modal>
    </div>
  );

};

export default CalActionModal;
