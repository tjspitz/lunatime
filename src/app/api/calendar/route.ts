import mongo from '@/utils/dbConfig';
import User from '@/models/userModel';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    await mongo();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const dates = await User.findById(userId, 'dates');
    return NextResponse.json(dates);
  } catch (error) {
    return NextResponse.json(error);
  }
}

/*
export async function POST(req: NextRequest, res: NextResponse) {

}

export async function PATCH(req: NextRequest, res: NextResponse) {

}
*/