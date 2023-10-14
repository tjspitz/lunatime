import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const PUBLIC_FILE = /\.(.*)$/;

const validateJWT = async (jwt: string) => {
  const { payload } = await jwtVerify(
    jwt,
    new TextEncoder().encode(process.env.JWT_SECRET),
  );
  return payload.payload as any;
};

const middleware = async (req: NextRequest, res: NextResponse) => {
  const { pathname } = req.nextUrl;

  if (pathname === '/') {
    req.nextUrl.pathname = '/home';
    return NextResponse.redirect(req.nextUrl)
  }

  if (
    pathname === '/home' ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/sign-in') ||
    pathname.startsWith('/sign-up') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const jwt = req.cookies.get(process.env.COOKIE_NAME);

  if (!jwt) {
    req.nextUrl.pathname = '/sign-in';
    return NextResponse.redirect(req.nextUrl);
  }

  try {
    await validateJWT(jwt.value);
    return NextResponse.next();
  } catch (error) {
    console.error(error);
    req.nextUrl.pathname = '/sign-in';
    return NextResponse.redirect(req.nextUrl);
  }
};

export default middleware;