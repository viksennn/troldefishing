import { FangstModel, FishingModel } from "@/app/data/mongoFishingModel";
import { connectMongo } from "@/app/data/mongodb";
import { NextResponse } from "next/server";

export async function GET(req: any, { params }: any) {
  const { searchParams } = new URL(req.url);
  const skip = parseInt(searchParams.get("skip") || "0");
  const limit = parseInt(searchParams.get("limit") || "10");

  const { id } = params;

  await connectMongo();

  const userFangster = await FangstModel.find({ userId: id })
  
  const sorted = userFangster.sort((a, b) => {
    return new Date(b.dato).getTime() - new Date(a.dato).getTime();
  })

  const sliced = sorted.slice(skip, skip + limit);

  return NextResponse.json({
    data: sliced,
    hasMore: sorted.length > skip + limit,
  });
}
