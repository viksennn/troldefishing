// Import necessary modules and functions
import { connectMongo } from "@/app/data/mongodb";
import { NextResponse } from "next/server";
import { FishingModel } from "@/app/data/mongoFishingModel";

// Define the handler for getting an individual fish data
export async function GET(req: any, { params }: any) {
    const { id, fishId } = params;

    await connectMongo();

    try {
        const fish = await FishingModel.findOne(
            { _id: id, "fiskeData._id": fishId },
            { "fiskeData.$": 1 }
        );

        if (fish && fish.fiskeData && fish.fiskeData.length > 0) {
            return NextResponse.json({ fishData: fish.fiskeData[0] }, { status: 200 });
        } else {
            return NextResponse.json({ message: "Fish data ikke fundet" }, { status: 404 });
        }
    } catch (error) {
        console.error("Error i at få data:", error);
        return NextResponse.json({ message: "Errro i at få data" }, { status: 500 });
    }
}

export async function PUT(req: any, { params }: any) {
    const { id, fishId } = params;
    const {art, agn, lokation, dato} = await req.json();

    await connectMongo();

    const updatedFiskeSet = {
        art: art,
        agn: agn,
        lokation: lokation,
        dato: dato
    }

    try {
        await FishingModel.updateOne(
            { _id: id, "fiskeData._id": fishId },
            { $set: { "fiskeData.$": updatedFiskeSet } }
        );

        return NextResponse.json({ message: "Fiske data updated" }, { status: 200 });
    } catch (error) {
        console.error("Error i at updatere", error);
        return NextResponse.json({ message: "Errro i at updatere data" }, { status: 500 });
    }
}
