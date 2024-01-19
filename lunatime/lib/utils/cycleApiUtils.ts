import { add, differenceInDays, sub } from 'date-fns';
import {
  CyclePost,
  GetFertileRange,
  GetMenstrualRange,
  GetPmsRange,
  MakeCycle,
} from '@/lib/types';

export const makeCycle: MakeCycle = (current) => {
  const { cycleLength, periodLength, periodStart, lastEdited } = current;
  const newCycle: CyclePost = {
    lastEdited,
    cycleLength,
    periodLength,
    menstrualRange: getMenstrualRange(periodStart, periodLength),
    fertileRange: getFertileRange(cycleLength, periodStart),
    pmsRange: [null, null],
  };
  newCycle.pmsRange = getPmsRange(newCycle.fertileRange[1]);

  return normalize(newCycle);
};

const getMenstrualRange: GetMenstrualRange = (start, length) => {
  const end = add(start, { days: length - 1});
  return [start, end];
};

const getFertileRange: GetFertileRange = (length, period) => {
  const ovDay = add(period, { days: length - 14 });
  const start = sub(ovDay, { days: 7 });
  const end = add(ovDay, { days: 1 });

  return [start, end];
};

const getPmsRange: GetPmsRange = (fertileEnd) => {
  const start = add(fertileEnd, { days: 1 });
  const end = add(start, { days: 14 });
  return [start, end];
};

const normalize = (cycle) => {
  const normalizedCycle = { ...cycle };
  const { fertileRange, pmsRange, menstrualRange } = normalizedCycle;
  const nextPeriodStart = add(menstrualRange[0], { days: cycle.cycleLength });
  let diff;

  diff = differenceInDays(fertileRange[1], pmsRange[0]);
  if (diff > -1) {
    pmsRange[0] = add(fertileRange[1], { days: 1 });
  }

  diff = differenceInDays(pmsRange[1], nextPeriodStart);
  if (diff > -1) {
    pmsRange[1] = sub(nextPeriodStart, { days: 1 });
  }
  return normalizedCycle as CyclePost;
}

/*
To calculate when your next period will be:

Measure how long your average cycle is, i.e., the time between one period beginning and the next one beginning.

Note how long your average period duration is.

Add the length of your cycle to the date your last period began. This is the day your next period should begin.

Add the length of your period to the date your next period will begin. This is when your next period should end.

*/

/*
Here's how to calculate your fertility window:

Calculate your ovulation day. Take your average cycle duration, subtract 14 days from this value, and add the remaining number of days to the date your last period began.

Sperm can survive inside a woman's body for 7 days, so subtract 7 days from your ovulation day. This is when your fertile window begins.

On average, the egg can survive one day outside of the ovaries, so add 1 day to your ovulation day. This is the end of your fertile window.

This time between these two dates is your fertile window.
*/
