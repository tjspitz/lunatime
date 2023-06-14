import CalendarContainer from './calendar';

export interface CycleDates {
  _id: String;
  dates: [
    {
      _id: Date;
      cycle: {
        [key: string]: Date;
        fStart: Date;
        fEnd: Date;
        pStart: Date;
        pEnd: Date;
        mStart: Date;
        mEnd: Date;
      };
    }
  ];
}

const getData = async (id: string) => {
  try {
    const url = 'http://localhost:3000/api/calendar';
    const params = new URLSearchParams({ userId: id });
    const res = await fetch(`${url}?${params}`);
    return res.json();
  } catch (error: any) {
    console.error(error);
    return null;
  }
};

export default async function CalendarPage() {
  const userId = '6485475f06277f54cae53e51'; // testing 'Olivia'
  const dates: CycleDates = await getData(userId);
  dates.dates.forEach((entry) => {
    const { cycle } = entry;
    for (const day in cycle) {
      cycle[day] = new Date(cycle[day])
    }
  });

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
