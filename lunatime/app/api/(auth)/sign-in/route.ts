import { NextRequest, NextResponse } from 'next/server';
import User from '@/lib/db/userModel';
import { comparePwds, createJWT } from '@/lib/auth';

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const user = await User.findOne({ email: body.email });

  if (!user) {
    res = NextResponse.json(
      {
        body: { 'data': 'User does not exist' },
        success: false,
      },
      {
        status: 402,
        headers: { 'content-type': 'application/json' },
      },
    );
    return res;
  }

  const isUser = await comparePwds(body.password, user.password);

  if (isUser) {
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

  } else {
    return NextResponse.json(
      { error: 'Username and password do not match' }, { status: 401 }
    );
  }
}
