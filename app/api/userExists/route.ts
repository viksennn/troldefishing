import { FishingModel } from "@/app/data/mongoFishingModel";
import { connectMongo } from "@/app/data/mongodb";
import { NextResponse } from "next/server";

export async function POST(req: any) {
    try {
        await connectMongo();
        const {navn} = await req.json();
        const user = await FishingModel.findOne({navn}).select("_id");
        return NextResponse.json({user});
    } catch (error) {

    }
}