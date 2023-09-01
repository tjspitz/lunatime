import { CycleDates, GetCycles, ReqOptions } from '@/utils/types';
import CalendarContainer from './calendar';

const getCycles: GetCycles = async (id) => {
  try {
    const url = 'http://localhost:3000/api/calendar';
    const params = new URLSearchParams({ userId: id });
    const options: ReqOptions = { cache: 'no-store' };
    const res = await fetch(`${url}?${params}`, options);
    return res.json();
  } catch (error: any) {
    console.error(error);
    return {} as CycleDates;
  }
};

const CalendarPage = async () => {
  const userId = '6485475f06277f54cae53e51'; // testing 'Olivia'
  const data: CycleDates = await getCycles(userId);
  data.dates.forEach((entry) => {
    const { cycle } = entry;
    for (const day in cycle) {
      cycle[day] = new Date(cycle[day]);
    }
  });

  return (
    <main>
      <div className="flex justify-center m-8">
        <CalendarContainer dates={data} />
      </div>
    </main>
  );
};

export default CalendarPage;
