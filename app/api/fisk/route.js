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

export async function DELETE(req) {
    const id = await req.nextUrl.searchParams.get("id");
    await connectMongo();
    await FishingModel.findByIdAndDelete(id);
    return NextResponse.json({ message: "Fisk slettet" }, {status: 200});
}

export async function PUT(req, {params}) {
    const {id} = params;
    const {navn} = await req.json();
    await connectMongo();
    await FishingModel.findByIdAndUpdate(id, {navn});
    return NextResponse.json({ message: "Fisk oppdatert" }, {status: 200});
}