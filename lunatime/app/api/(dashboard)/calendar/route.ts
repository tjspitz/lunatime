import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getUserFromCookie } from '@/lib/auth';
import { makeFirstCycle } from '@/lib/mCalc';
import mongo from '@/lib/db/dbConfig';
import { CyclePost, CycleReq } from '@/lib/types';

export async function POST(req: NextRequest, res: NextResponse) {
  const userCookie = cookies().get('lunatime_cookie');
  const body: CycleReq = await req.json();
  const cycle: CyclePost = makeFirstCycle(body);

  try {
    await mongo();
  } catch(error) {
    console.error('Failed to reach MongoDB: \n', error);
  }

  try {
    const user = await getUserFromCookie(userCookie);
    if (!user) {
      throw new Error('user was not found in the database');
    }
    await user.dates.push(cycle);
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
