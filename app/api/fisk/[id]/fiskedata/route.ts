import { FishingModel } from "@/app/data/mongoFishingModel";
import { connectMongo } from "@/app/data/mongodb";
import { NextResponse } from "next/server";

export async function GET(req:any, {params}:any) {

    const { searchParams } = new URL(req.url);
    const skip = parseInt(searchParams.get('skip') || '0');
    const limit = parseInt(searchParams.get('limit') || '10');

    const { id } = params;
    await connectMongo();
    const user = await FishingModel.findOne({ _id: id }).select('fiskeData');

    const reverseData = user?.fiskeData.reverse() || [];

    const sliced = user?.fiskeData.slice(skip, skip + limit);

    return NextResponse.json({
        data: sliced,
        hasMore: (user?.fiskeData.length || 0) > skip + limit,
      });
}