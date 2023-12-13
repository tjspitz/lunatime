import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { getUserFromCookie } from '@/lib/auth';
import { add } from 'date-fns';
import { makeCycle } from '@/lib/mCalc';
import { CyclePost, CycleReq } from '@/lib/types';

// the only time this API is called is when a user is new (has no cycles)
// following the first time, user would either confirm or edit predicted next cycle
// calling a PUT or PATCH API from Calendar

export async function POST(req: NextRequest, res: NextResponse) {
  const userCookie = cookies().get('lunatime_cookie');

  // req.json() will return Dates as Strings
  // they need to be converted back to Date objects
  const body: CycleReq = await req.json();

  // first entry
  const firstReq = { ...body };
  firstReq.lastEdited = new Date(firstReq.lastEdited);
  firstReq.periodStart = new Date(firstReq.periodStart);

  // second (predictive) entry
  const nextReq = { ...firstReq };
  nextReq.periodStart = add(firstReq.periodStart, { days: firstReq.cycleLength });

  const firstCycle: CyclePost = makeCycle(firstReq);
  const nextCycle: CyclePost = makeCycle(nextReq);

  try {
    // mongo is connected in getUserFromCookie
    // TO-DO: provide exclusions
    const user = await getUserFromCookie(userCookie as RequestCookie, '');
    if (!user) {
      throw new Error('user was not found in the database');
    }
    user.cycleLength = firstCycle.cycleLength;
    user.periodLength = firstCycle.periodLength;
    user.dates.push(firstCycle, nextCycle);
    await user.save();
    res = NextResponse.json(
      { success: true },
      {
        status: 201,
        headers: { 'content-type': 'application/json' }
      },
    );
    return res;
  } catch (error) {
    console.error(error);
    res = NextResponse.json(
      {
        body: { 'data': error },
        success: false,
      },
      {
        status: 400,
        headers: { 'content-type': 'application/json' },
      },
    );
    return res;
  }
}
