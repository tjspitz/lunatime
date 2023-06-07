'use client';

import 'react-calendar/dist/Calendar.css';

import styles from './styles.module.css'
import Calendar from 'react-calendar';
import { useState } from 'react';

export default function CalendarPage() {
  const [value, setValue] = useState(new Date());

  const dateRangeClass = ({ date, view }) => {
    let style = 'min-h-[10vh]';

    if (view === 'month') {
      if (true) {
        style += styles.menst;
      }
    }
    return style
  };

  const handleChange = (newDate) => {
    console.log(newDate);

    setValue(newDate);
  };

  return (
    <main className="flex flex-col min-h-[80vh]">
      <p>Hi, this is the Calendar page.</p>
      <p>This is the main part of the app.</p>

      <div className="m-8 flex justify-center">
        <Calendar
          className="min-w-[66%]"
          tileClassName={dateRangeClass}
          calendarType="US"
          view="month"
          minDetail="year"
          selectRange={true}
          value={value}
          onChange={handleChange}
        />
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
