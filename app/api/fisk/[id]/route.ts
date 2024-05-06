import { connectMongo } from "@/app/data/mongodb";
import { NextResponse } from "next/server";
import { FishingModel } from "@/app/data/mongoFishingModel";

export async function GET(req:any, {params}:any) {
    const { id } = params;
    await connectMongo();
    const fisk = await FishingModel.findOne({_id: id});
    return NextResponse.json({fisk});
}

export async function PUT(req:any, {params}:any ) {
    const {id} = params;
    const {navn} = await req.json();
    await connectMongo();
    await FishingModel.findByIdAndUpdate(id, {navn});
    return NextResponse.json({ message: "Fisk opdateret" }, {status: 200});
}

export async function POST(req: any, {params}:any) {
    const {id} = params;
    const {art, agn, lokation, dato} = await req.json();

    await connectMongo();

    const fiskeSet = {
        art: art,
        agn: agn,
        lokation: lokation,
        dato: dato
    }
    
    try {
        
        await FishingModel.findOneAndUpdate({_id: id}, { $push: { fiskeData: fiskeSet } });

        return NextResponse.json({ message: "Fisk oprettet", fiskeSet }, {status: 200});
    } catch (error) {
        console.log(error);
    }
}