import { connectMongo } from "@/app/data/mongodb";
import { FangstModel } from "@/app/data/mongoFishingModel";
import { NextResponse } from "next/server";

export async function GET(req: any) {
  await connectMongo();

  const { searchParams } = new URL(req.url);
  const antal = searchParams.get("antal") || "10";

  const fangster = await FangstModel.find()
    .populate('userId', 'navn')
    .lean();

  const sorteretFangster = fangster
    .sort((a, b) => new Date(b.dato).getTime() - new Date(a.dato).getTime())
    .slice(0, Number(antal));

  return NextResponse.json(sorteretFangster);
}
