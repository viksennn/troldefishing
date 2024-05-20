import { FishingModel } from "@/app/data/mongoFishingModel";
import { connectMongo } from "@/app/data/mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: any) {
    try {

        const { navn, password } = await req.json();

        await connectMongo();

        const hashedPassword = await bcrypt.hash(password, 10);

        await FishingModel.create({ navn, password: hashedPassword });
 
        return NextResponse.json({ navn, password });

    } catch (error) {
       
    }
}