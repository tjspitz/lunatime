'use client';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function CalendarPage() {
  return (
    <main className="flex flex-col min-h-[80vh]">
      <p>Hi, this is the Calendar page.</p>
      <p>This is the main part of the app.</p>

      <div className="m-8 flex justify-center">
        <Calendar
          className="min-w-[66%]"
          tileClassName="min-h-[10vh]"
          calendarType="US"
          view="month"
          minDetail="year"
          selectRange={true}
        />
      </div>
    </main>
  );
}
