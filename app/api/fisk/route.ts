import { connectMongo } from "@/app/data/mongodb";
import { NextResponse } from "next/server";
import { FangstModel, FishingModel } from "@/app/data/mongoFishingModel";
import { generateGoals } from "@/lib/generateGoals";

export async function GET(req: any) {

    const { searchParams } = new URL(req.url);
    const fiskerne = searchParams.get("fiskerne") || "false";

    await connectMongo();
  
    // Find alle brugere
    const brugere = await FishingModel.find().select("-password").lean();
  
    if (!brugere || brugere.length === 0) {
      return NextResponse.json({ message: "Ingen brugere fundet" }, { status: 404 });
    }
  
    // Find alle fangster én gang uden password
    const alleFangster = await FangstModel.find().lean();
  
    if (fiskerne === "true") {
      //find antal af fangster for hver bruger og return bruger og antal fangster
      const brugereMedAntalFangster = brugere.map((bruger: any) => {
        const antalFangster = alleFangster.filter((fangst) => fangst.userId.toString() === bruger._id.toString()).length;
        return {
          ...bruger,
          antalFangster,
        };
      });

      const goals = generateGoals(alleFangster);

      // Tilføj mål til hver bruger
      brugereMedAntalFangster.forEach((bruger: any) => {
        const userFangster = alleFangster.filter((fangst) => fangst.userId.toString() === bruger._id.toString());
        bruger.goals = generateGoals(userFangster);
      });

      // Sorter brugere efter antal fangster
      brugereMedAntalFangster.sort((a: any, b: any) => b.antalFangster - a.antalFangster);
      return NextResponse.json(brugereMedAntalFangster);
    }

    // Map fangster til deres bruger
    const brugereMedFangster = brugere.map((bruger: any) => {
      const userFangster = alleFangster
        .filter((fangst) => fangst.userId.toString() === bruger._id.toString())
        .sort((a, b) => new Date(b.dato).getTime() - new Date(a.dato).getTime());
  
      return {
        ...bruger,
        fiskeData: userFangster,
      };
    });
  
    return NextResponse.json(brugereMedFangster);
  }

export async function POST(req:any) {
    const navn = await req.json();
    await connectMongo();
    await FishingModel.create({navn});
    return NextResponse.json({ message: "Fisk lagt til"}, { status: 201});
}

export async function DELETE(req:any) {
    const id = await req.nextUrl.searchParams.get("id");
    await connectMongo();
    await FishingModel.findByIdAndDelete(id);
    return NextResponse.json({ message: "Fisk slettet" }, {status: 200});
}

export async function PUT(req:any, {params}:any) {
    const {id} = params;
    const {navn} = await req.json();
    await connectMongo();
    await FishingModel.findByIdAndUpdate(id, {navn});
    return NextResponse.json({ message: "Fisk oppdatert" }, {status: 200});
}