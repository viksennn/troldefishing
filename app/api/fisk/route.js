import { connectMongo, FishingModel } from "@/app/data/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
    await connectMongo();
    const fisk = await FishingModel.find();
    return NextResponse.json(fisk);
}

export async function POST(req) {
    const navn = await req.json();
    await connectMongo();
    await FishingModel.create({navn});
    return NextResponse.json({ message: "Fisk lagt til"}, { status: 201});
}