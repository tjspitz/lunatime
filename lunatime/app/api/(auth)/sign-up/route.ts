import { NextRequest, NextResponse } from 'next/server';
import mongo from '@/lib/db/dbConfig';
import User from '@/lib/db/userModel';
import { createJWT, hashPwd } from '@/lib/auth';

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
      path: '/',
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
