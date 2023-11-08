// import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import mongo from '@/lib/db/dbConfig';
import User from '@/lib/db/userModel';
import Cycle from '@/lib/db/cycleModel';
import { createJWT, hashPwd } from '@/lib/auth';

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();

  /* Create/embed the first 'date' obj

    body.lastPeriod: date last one started
      // calulate its end based on body.menstrualLength

    body.dates: await Cycle.create({
      cycleLength: body.cycleLength,
      menstrualLength: body.menstrualLength,
      fertileRange: <...>,
      pmsRange: <...>,
      menstrualRange: [body.lastPeriod, (body.lastPeriod + body.menstrualLength)],

    })

  */

  try {
    await mongo();
  } catch(error) {
    console.error('Failed to reach MongoDB: \n', error);
  }

  try {
    const user = await User.create({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      password: await hashPwd(body.password),
    });

    const jwt = await createJWT(user);

    res = NextResponse.json(
      { success: true },
      { status: 201, headers: { 'content-type': 'application/json' } }
    );

    res.cookies.set(process.env.COOKIE_NAME as string, jwt, {
      httpOnly: true,
      path: '/home', // TODO
      maxAge: 604800,
    });

    return res;

  } catch(error) {
    console.error('error: ', error)
    return NextResponse.json(
      {
        body: { 'data': error },
        success: false,
      },
      {
        status: 401,
        headers: { 'content-type': 'application/json' },
      },
    );
  }
}
