import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/lib/db/userModel';
import { comparePwds, createJWT } from '@/lib/auth';
import { serialize } from 'cookie';

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
    )
    return res;
    // res.status(401);
    // res.json({ error: "Invalid login" });
    // return NextResponse.json({ error: 'User not found' }, { status: 401 });
  }

  const isUser = await comparePwds(body.password, user.password);

  if (isUser) {
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
    //     path: '/',
    //     maxAge: 604800,
    //   }),
    // );


    res = NextResponse.json(
      { success: true },
      { status: 201, headers: { 'content-type': 'application/json' } }
    )

    res.cookies.set(process.env.COOKIE_NAME as string, jwt, {
      httpOnly: true,
      path: '/', // TODO
      maxAge: 604800,
    });



    return res;
    // res.status(201);
    // res.end();
  } else {
    // res.status(401);
    // res.json({ error: "Username and password do not match" });
    return NextResponse.json(
      { error: 'Username and password do not match' }, { status: 401 }
    );
  }
}
