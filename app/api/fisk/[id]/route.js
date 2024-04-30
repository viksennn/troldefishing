import { connectMongo, FishingModel } from "@/app/data/mongodb";
import { NextResponse } from "next/server";

export async function GET(req, {params}) {
    const { id } = params;
    await connectMongo();
    console.log(id);
    const fisk = await FishingModel.findOne({ _id: id });
    return NextResponse.json({fisk});
}

export async function PUT(req, {params}) {
    const {id} = params;
    const {navn} = await req.json();
    await connectMongo();
    await FishingModel.findByIdAndUpdate(id, {navn});
    return NextResponse.json({ message: "Fisk oppdatert" }, {status: 200});
}