import CalendarContainer from './calendar';

export interface CycleDates {
  _id: Date;
  cycle: {
    _id: Date;
    fStart: Date;
    fEnd: Date;
    pStart: Date;
    pEnd: Date;
    mStart: Date;
    mEnd: Date;
  }
}

const getData = async (id: string) => {
  try {
    const url = 'http://localhost:3000/api/calendar';
    const params = new URLSearchParams({userId: id});
    const res = await fetch(`${url}?${params}`);
    return res.json();
  } catch (error: any) {
    console.error(error);
    return null;
  }
};

export default async function CalendarPage() {
  const userId = '6485475f06277f54cae53e51'; // testing 'Olivia'
  const dates: CycleDates  = await getData(userId);

  return (
    <main>
      <p>Hi, this is the Calendar page.</p>
      <p>This is the main part of the app.</p>
      <div className="m-8 flex justify-center">
        <CalendarContainer dates={dates} />
      </div>
    </main>
  );
}

/*
import React, { useState } from 'react';
import Calendar from 'react-calendar';

const datesToAddContentTo = [tomorrow, in3Days, in5Days];

function tileContent({ date, view }) {
  // Add class to tiles in month view only
  if (view === 'month') {
    // Check if a date React-Calendar wants to check is on the list of dates to add class to
    if (datesToAddContentTo.find(dDate => isSameDay(dDate, date))) {
      return 'My content';
    }
  }
}

function MyApp() {
  const [value, setValue] = useState(new Date());

  return (
    <Calendar
      onChange={onChange}
      value={date}
      tileContent={tileContent}
    />
  );
}
*/
