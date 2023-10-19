import { NextApiRequest, NextApiResponse } from 'next';
import User from '@/lib/db/userModel';
import { comparePwds, createJWT } from '@/lib/auth';
import { serialize } from 'cookie';

// TO-DO: convert to NexRequest, NextRespone (APP)
// currently using (PAGES) types
export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const user = await User.findOne(req.body.email);

  if (!user) {
    res.status(401);
    res.json({ error: 'User not found' });
  }

  const isUser = await comparePwds(req.body.password, user?.password as string);

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
    res.json({});
  } else {
    res.status(401);
    res.json({ error: 'Username and password do not match' });
    res.json({});
  }
}
