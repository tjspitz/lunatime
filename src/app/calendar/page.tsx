import { CycleDates, GetCycles, ProfileInfo } from '@/utils/types';
import CalActionModal from '../components/CalActionModal';
import CalendarContainer from './calendar';

const getCycles: GetCycles = async (id) => {
  try {
    const url = 'http://localhost:3000/api/calendar';
    const params = new URLSearchParams({ userId: id });
    const res = await fetch(`${url}?${params}`);
    return res.json();
  } catch (error: any) {
    console.error(error);
    return {} as CycleDates;
  }
};

const CalendarPage = async () => {
  const userId = '6485475f06277f54cae53e51'; // testing 'Olivia'
  const dates: CycleDates = await getCycles(userId);
  dates.dates.forEach((entry) => {
    const { cycle } = entry;
    for (const day in cycle) {
      cycle[day] = new Date(cycle[day])
    }
  });

  return (
    <main>
      <p className="text-2xl">
        Hi, this is the Calendar page.
      </p>
      <p className="text-2xl">
        This is the main part of the app.
      </p>
      <div className="m-8 flex justify-center">
        <CalendarContainer dates={dates} />
      </div>
      <div id='modal'><CalActionModal /></div>
    </main>
  );
};

export default CalendarPage;
