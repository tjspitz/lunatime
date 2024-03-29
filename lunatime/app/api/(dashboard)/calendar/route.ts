import { getUserFromCookie } from '@/lib/auth';
import mongo from '@/lib/db/dbConfig';
import User from '@/lib/db/userModel';
import { CyclePost, CycleReq } from '@/lib/types';
import { makeCycle } from '@/lib/utils/cycleApiUtils';
import { add } from 'date-fns';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse, userAgent } from 'next/server';
import { defaultContentType } from '@/lib/api';

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
        headers: defaultContentType,
      },
    );
    return res;
  } catch (error) {
    console.error(error);
    res = NextResponse.json(
      {
        body: error,
        success: false,
      },
      {
        status: 400,
        headers: defaultContentType,,
      },
    );
    return res;
  }
}

// DELETE a cycle from the User.dates[][]
export async function DELETE(req: NextRequest, res: NextResponse) {
  const [userId, cycleId] = await req.json();
  const update = { $pull: { 'dates': { _id: cycleId } } };

  try {
    await User.findByIdAndUpdate(userId, update);
    res = NextResponse.json({ status: 204 });
    return res;
  } catch (error) {
    console.error(error);
    res = NextResponse.json(
      { success: false },
      {
        status: 400,
        headers: defaultContentType,
      },
    )
  }
}
