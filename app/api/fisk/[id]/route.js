import { connectMongo, FishingModel } from "@/app/data/mongodb";
import { NextResponse } from "next/server";

export async function GET(request, {params}) {
    const { id } = params;
    await connectMongo();
    const fisk = await FishingModel.findOne({ _id: id });
    return NextResponse.json({fisk});
}