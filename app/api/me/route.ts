// app/api/me/route.ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { connectMongo } from '@/app/data/mongodb';
import { FishingModel } from '@/app/data/mongoFishingModel';

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Ingen token' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const userId = decoded.userId;

    await connectMongo();
    const user = await FishingModel.findById(userId).select('-password');

    if (!user) {
      return NextResponse.json({ error: 'Bruger ikke fundet' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json({ error: 'Token ugyldig eller fejl opstod' }, { status: 403 });
  }
}
