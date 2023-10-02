import { NextApiRequest, NextApiResponse } from 'next';
import User from '@/lib/db/userModel';
import { comparePwds, createJWT } from '@/lib/auth';
import { serialize } from 'cookie';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const user = await User.findOne(req.body.username);

  if (!user) {
    res.status(401);
    res.json({ error: 'User not found' });
    return res;
  }

  const isUser = await comparePwds(req.body.password, user.password as string);

  if (isUser) {
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
    return res;
  } else {
    res.status(401);
    res.json({ error: 'Username and password do not match' });
    return res;
  }
}
