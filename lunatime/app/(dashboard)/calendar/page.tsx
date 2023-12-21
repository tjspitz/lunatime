import { cookies } from 'next/headers';
import { getUserFromCookie } from '@/lib/auth';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { CycleInfo, GetCycles, ReqOptions } from '@/lib/types';
import CalendarContainer from './calendar';

export default async function CalendarPage () {
  const include = 'cycleLength periodLength dates';
  const cycles: CycleInfo = JSON.parse(await getCycles(include));

  return (
    <main className="w-3/4 mx-auto mt-4">
      <div className="w-full">
        <div className="text-center">
          <h2 className="mb-2 text-xl">My Calendar</h2>
          <p className="text-lg italic text-black/25">
            This will be the page which renders your calendar
          </p>
          <CalendarContainer cycles={cycles} />
        </div>
      </div>
    </main>
  );
};

async function getCycles (include: string) {
  const userCookie = cookies().get('lunatime_cookie');
  const userCycles = await getUserFromCookie(
    userCookie as RequestCookie,
    include
  );
  return JSON.stringify(userCycles);
}
/*
import { CycleDates, GetCycles, ReqOptions } from '@/utils/types';
import CalendarContainer from './calendar';

export default async function CalendarPage () {
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

async function getCycles (id): GetCycles {
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
}
*/