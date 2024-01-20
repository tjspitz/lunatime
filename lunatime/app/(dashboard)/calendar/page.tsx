import { cookies } from 'next/headers';
import { getUserFromCookie } from '@/lib/auth';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { CycleInfo, GetCycles, ReqOptions } from '@/lib/types';
import CalendarContainer from './calendar';

export default async function CalendarPage () {
  const include = '_id cycleLength periodLength dates';
  const user: CycleInfo = JSON.parse(await getCycles(include));
  user.dates = user.dates.map((cycle) => {
    const isoFertRange = cycle.fertileRange;
    const isoPmsRange = cycle.pmsRange;
    const isoPeriodRange = cycle.menstrualRange;
    return (
      {
        ...cycle,
        fertileRange: [new Date(isoFertRange[0]), new Date(isoFertRange[1])],
        pmsRange: [new Date(isoPmsRange[0]), new Date(isoPmsRange[1])],
        menstrualRange: [new Date(isoPeriodRange[0]), new Date(isoPeriodRange[1])],
      }
    );
  });

  return (
    <main className="w-3/4 mx-auto mt-4">
      <div className="w-full">
        <div className="text-center">
          <h2 className="mb-2 text-xl">My Calendar</h2>
          <p className="text-lg italic text-black/25">
            This will be the page which renders your calendar
          </p>
          <CalendarContainer user={user} />
        </div>
      </div>
    </main>
  );
};

// TO-DO: typing
async function getCycles (include: string) {
  const userCookie = cookies().get('lunatime_cookie');
  const userCycles = await getUserFromCookie(
    userCookie as RequestCookie,
    include
  );
  return JSON.stringify(userCycles);
}
