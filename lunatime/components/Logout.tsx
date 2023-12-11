'use client';
import { MouseEvent } from 'react';
import Button from '@/components/Button';

const Logout = () => {
  const handleLogoutClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('logging out...');

    // await signOut;

    console.log('signed out!');
  };

  return (
    <div className="flex justify-end ">
      <Button
        intent="primary"
        size="small"
        onClick={handleLogoutClick}
      >
        Logout
      </Button>
    </div>
  );
};

export default Logout;
