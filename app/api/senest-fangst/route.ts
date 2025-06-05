import { FishingModel } from "@/app/data/mongoFishingModel";
import { connectMongo } from "@/app/data/mongodb";
import { NextResponse } from "next/server";

interface FiskeData {
    art: string;
    lokation: string;
    agn: string;
    dato: string;
    imgUrl?: string;
    imgKey?: string;
    _id: string;
}

interface CatchWithFisher {
catch: FiskeData;
    fisherman: string;
    id: string;
}

export async function GET(req: any, params: any) {

    //params for number of display

    const { searchParams } = new URL(req.url);
    const antal = searchParams.get('antal') || 10 as number;


    await connectMongo();
    const fisk = await FishingModel.find();
    
    if (fisk.length > 0) {
        const allCatches: CatchWithFisher[] = fisk.flatMap((person: any) => 
          person.fiskeData.map((fiskeData: any) => ({
            catch: fiskeData,
            fisherman: person.navn,
            id: person._id
          }))
        );

        const latest = allCatches.sort((a, b) => new Date(b.catch.dato).getTime() - new Date(a.catch.dato).getTime());

        return NextResponse.json(latest.slice(0, Number(antal)));
    }
}