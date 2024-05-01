import { connectMongo } from "@/app/data/mongodb";
import { NextResponse } from "next/server";
import { FishingModel } from "@/app/data/mongoFishingModel";

export async function GET(req, {params}) {
    const { id } = params;
    await connectMongo();
    const fisk = await FishingModel.findOne({_id: id});
    return NextResponse.json({fisk});
}

export async function PUT(req, {params}) {
    const {id} = params;
    const {navn} = await req.json();
    await connectMongo();
    await FishingModel.findByIdAndUpdate(id, {navn});
    return NextResponse.json({ message: "Fisk opdateret" }, {status: 200});
}

export async function POST(req, {params}) {
    const {id} = params;
    const {art, agn, lokation, dato} = await req.json();

    await connectMongo();

    const fiskeSet = {
        art: art,
        agn: agn,
        lokation: lokation,
        dato: dato
    }

    console.log(fiskeSet);
    
    try {
        if (!fisk) {
            return NextResponse.error("Fisk ikke fundet", {status: 404});
        }

        const fisk = await FishingModel.findOneAndUpdate({_id: id}, { $push: {fiskeData: fiskeSet} });
        
        await fisk.save();
        return NextResponse.json({ message: "Fisk oprettet", fiskeSet }, {status: 200});
    } catch (error) {
        return NextResponse.error("Fejl ved oprettelse af fisk", {status: 500});
    }
}