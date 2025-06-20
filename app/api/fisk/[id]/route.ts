import { connectMongo } from "@/app/data/mongodb";
import { NextResponse } from "next/server";
import { FishingModel, FangstModel } from "@/app/data/mongoFishingModel";
import uniqid from 'uniqid';
import { UTApi } from "uploadthing/server";
import { generateGoals } from "@/lib/generateGoals";

export async function GET(req: any, { params }: any) {
    const { id } = params;
  
    await connectMongo();
  
    const user = await FishingModel.findById(id).lean();
  
    if (!user) {
      return NextResponse.json({ error: "Bruger ikke fundet" }, { status: 404 });
    }
    
    const fangster = await FangstModel.find({ userId: id }).sort({ dato: -1 }).lean();

    const goals = generateGoals(fangster);
  
    const userWithFangster = {
        ...user,
        fiskeData: fangster,
        goals: goals,
    };
  
    return NextResponse.json(userWithFangster);
  }

export async function PUT(req:any, {params}:any ) {
    const {id} = params;
    const {navn, profilImgUrl} = await req.json();
    await connectMongo();
    await FishingModel.findByIdAndUpdate(id, {navn, profilImgUrl});
    return NextResponse.json({ message: "Fisk opdateret" }, {status: 200});
}

export async function POST(req: any, {params}:any) {
    const {id} = params;
    const {art, agn, lokation, dato, imgUrl, imgKey} = await req.json();

    await connectMongo();

    const fiskeSet = {
        art: art,
        agn: agn,
        lokation: lokation,
        dato: dato,
        imgUrl: imgUrl,
    }
    
    try {
        
        await FishingModel.findOneAndUpdate({_id: id}, { $push: { fiskeData: fiskeSet } });

        return NextResponse.json({ message: "Fisk oprettet", fiskeSet }, {status: 200});
    } catch (error) {
        console.log(error);
    }
}

export async function DELETE(req: any, { params }: any) {
    const { id } = params;
    const { fishId, imgKey } = await req.json();
    
    await connectMongo();

    try {

        const utapi = new UTApi();

        if (imgKey) {
            await utapi.deleteFiles(imgKey);
        }

        await FishingModel.findOneAndUpdate({ _id: id }, { $pull: { fiskeData: { _id: fishId } } });
        return NextResponse.json({ message: "Fish deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting fish:", error);
        return NextResponse.json({ message: "Error deleting fish" }, { status: 500 });
    }
}