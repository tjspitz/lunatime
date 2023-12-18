import mongo from '@/lib/db/dbConfig';
import User from '@/lib/db/userModel';
import { NextResponse, NextRequest } from 'next/server';

// export async function GET(req: NextRequest, res: NextResponse) {
  // try {
  //   await mongo();
  //   const { searchParams } = new URL(req.url);
  //   const userId = searchParams.get('userId');
  //   const profile = await User.findById(userId, '-dates');
  //   return NextResponse.json(profile);
  // } catch (error) {
  //   return NextResponse.json(error);
  // }
// }

/*
export async function POST(req: NextRequest, res: NextResponse) {

}
*/

export async function PATCH(req: NextRequest, res: NextResponse) {
  try {
    await mongo();
    const body = await req.json();
    const { id, newPic, phone, email, address } = body;
    const update = { pic: newPic, phone, email, address };
    const options = {
      new: true,
      select: { newPic, phone, email, address },
    }

    res = await User.findByIdAndUpdate(id, update, options) as NextResponse;
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json(error);
  }
}
