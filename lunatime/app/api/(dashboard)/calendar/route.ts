import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { getUserFromCookie } from '@/lib/auth';
import { makeFirstCycle } from '@/lib/mCalc';
import { CyclePost, CycleReq } from '@/lib/types';

export async function POST(req: NextRequest, res: NextResponse) {
  const userCookie = cookies().get('lunatime_cookie');

  // req.json() will return Dates as Strings
  // they need to be converted back to Date objects
  const body: CycleReq = await req.json();
  body.lastEdited = new Date(body.lastEdited);
  body.periodStart = new Date(body.periodStart);

  const cycle: CyclePost = makeFirstCycle(body);


  try {
    // mongo is connected in getUserFromCookie
    const user = await getUserFromCookie(userCookie as RequestCookie);
    if (!user) {
      throw new Error('user was not found in the database');
    }
    user.dates.push(cycle);
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
    console.error(error)
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
