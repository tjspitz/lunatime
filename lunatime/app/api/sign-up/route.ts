import { NextApiRequest, NextApiResponse } from 'next';
import User from '@/lib/db/userModel';
import { createJWT, hashPwd } from '@/lib/auth';
import { serialize } from 'cookie';
import { cookies } from 'next/headers';

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const user = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    email: req.body.email,
    username: req.body.username,
    password: await hashPwd(req.body.password),
    pic: req.body.pic,
    cycleLength: req.body.cycleLength,
    menstrualLength: req.body.menstrualLength,
    address: req.body.address,
  });

  const jwt = await createJWT(user);

  res.setHeader(
    'Set-Cookie',
    serialize(process.env.COOKIE_NAME as string, jwt, {
      httpOnly: true,
      path: '/',
      maxAge: 604800,
    }),
  );
  res.status(201);
  res.end();
}

/*
  trying to do cookies the Next.js way, but a lot of TypeScript warnings, even with casting...

  res.setHeader(
    'Set-Cookie',
    (cookies().set({
      name: process.env.COOKIE_NAME as string,
      value: jwt,
      httpOnly: true,
      path: '/',
      maxAge: 604800,
    }) as unknown) as string[]
  );
*/
