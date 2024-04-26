import { connectMongo, FishingModel } from "@/app/data/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
    await connectMongo();
    const fisk = await FishingModel.find();
    return NextResponse.json(fisk);
}