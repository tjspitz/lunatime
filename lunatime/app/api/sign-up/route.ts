// import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import mongo from '@/lib/db/dbConfig';
import User from '@/lib/db/userModel';
import Cycle from '@/lib/db/cycleModel';
import { createJWT, hashPwd } from '@/lib/auth';
import { serialize } from 'cookie';

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
      cycleLength: body.cycleLength,
      menstrualLength: body.menstrualLength,
    });

    const jwt = await createJWT(user);

    // res.setHeader(
    //   "Set-Cookie",
    //   serialize(process.env.COOKIE_NAME as string, jwt, {
    //     httpOnly: true,
    //     path: "/",
    //     maxAge: 60 * 60 * 24 * 7,
    //   })
    // );

    // const newHeaders = new Headers(res.headers);
    // newHeaders.set(
    //   'Set-Cookie',
    //   serialize(process.env.COOKIE_NAME as string, jwt, {
    //     httpOnly: true,
    //       path: '/',
    //       maxAge: 604800,
    //   }),
    // );


    // res.status(201);
    // res.end();

    res = NextResponse.json(
      { success: true },
      { status: 201, headers: { 'content-type': 'application/json' } }
    );

    res.cookies.set(process.env.COOKIE_NAME as string, jwt, {
      httpOnly: true,
      path: '/', // TODO
      maxAge: 604800,
    });

    return res;
    // return NextResponse.json(res);

  } catch(error) {
    console.error('error: ', error)
    res = NextResponse.json(
      {
        body: { 'data': error },
        success: false,
      },
      {
        status: 401,
        headers: { 'content-type': 'application/json' },
      },
    );
    return res;
    // res.status(402);
    // res.end();
    // console.error('Failed to complete Registration in POST request: \n', error);
  }
}
