import { add, sub } from 'date-fns';
import {
  CyclePost,
  MakeFirstCycle,
  // MakeNewCycle,
  GetPmsRange,
  GetFertileRange,
  GetMenstrualRange,
} from './types';

export const makeFirstCycle: MakeFirstCycle = (current) => {
  const { cycleLength, periodLength, periodStart, lastEdited } = current;
  const newCycle: CyclePost = {
    lastEdited,
    cycleLength,
    periodLength,
    pmsRange: [null, null],
    fertileRange: getFertileRange(cycleLength, periodStart, true),
    menstrualRange: getMenstrualRange(periodStart, periodLength),
  };
  newCycle.pmsRange = getPmsRange(newCycle.fertileRange[1]);
  return newCycle;
};

// export const makeNewCycle: MakeNewCycle = (current, prev) => {
//   return null;
// };

const getPmsRange: GetPmsRange = (rangeEnd) => {
  const start = add(rangeEnd, { days: 1 });
  const end = add(start, { days: 14 });
  return [start, end];
};

const getFertileRange: GetFertileRange = (length, prevStart, isFirst) => {
  if (isFirst) {
    prevStart = sub(prevStart, { days: length });
  }
  const ovDay = add(prevStart, { days: length - 14 });
  const start = sub(ovDay, { days: 7 });
  const end = add(ovDay, { days: 1 });

  return [start, end];
};

const getMenstrualRange: GetMenstrualRange = (start, length) => {
  const end = add(start, { days: length });
  return [start, end];
};

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
