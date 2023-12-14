import bcrypt from 'bcrypt';
import { SignJWT, jwtVerify } from 'jose';
import User from './db/userModel';
import mongo from './db/dbConfig';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';

// FUN FACT: bcrypt is now cooperating w/ node v > 16.18.1
export const hashPwd = (pwd: string) => bcrypt.hash(pwd, 10);
export const comparePwds = (plainPwd: string, hashedPwd: string) =>
  bcrypt.compare(plainPwd, hashedPwd);

export const createJWT = (user) => {
  const issuedAt = Math.floor(Date.now() / 1000);
  const exp = issuedAt + 60 * 60 * 24 * 7;

  return new SignJWT({ payload: { id: user._id, email: user.email } })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setExpirationTime(exp)
    .setIssuedAt(issuedAt)
    .setNotBefore(issuedAt)
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
};

export const validateJWT = async (jwt: string) => {
  const { payload } = await jwtVerify(
    jwt,
    new TextEncoder().encode(process.env.JWT_SECRET)
  );
  return payload;
};

export const getUserFromCookie = async (cookie: RequestCookie, excluded: string) => {
  const jwt = cookie.value;
  const {
    // ermagherd TypeScript
    payload: { id },
  } = await validateJWT(jwt);
  try {
    await mongo();
    const user = await User.findById(id, excluded);
    return user;
  } catch (error) {
    console.error('getUserfromCookie failure:\n', error);
    return error;
  }
};
