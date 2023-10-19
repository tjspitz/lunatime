import { NextRequest, NextResponse } from 'next/server';
import { NextApiResponse } from 'next';
import mongo from '@/lib/db/dbConfig';
import User from '@/lib/db/userModel';
import { createJWT, hashPwd } from '@/lib/auth';
import { serialize } from 'cookie';

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();

  try {
    await mongo();
  } catch(error) {
    console.error('Failed to reach MongoDB: \n', error);
  }

  try {
    const user = await User.create({
      firstName: body.firstName,
      lastName: body.lastName,
      // phone: body.phone,
      email: body.email,
      // username: body.username,
      password: await hashPwd(body.password),
      // pic: body.pic,
      // cycleLength: body.cycleLength,
      // menstrualLength: body.menstrualLength,
      // address: body.address,
    });

    const jwt = await createJWT(user);

    const newHeaders = new Headers(req.headers);
    newHeaders.set(
      'Set-Cookie',
      serialize(process.env.COOKIE_NAME as string, jwt, {
        httpOnly: true,
        path: '/',
        maxAge: 604800,
      }),
    );

    return NextResponse.json(res);

  } catch(error) {
    console.error('Failed to complete Registration in POST request: \n', error);
  }
}
