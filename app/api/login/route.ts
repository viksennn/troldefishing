import { FishingModel } from "@/app/data/mongoFishingModel";
import { connectMongo } from "@/app/data/mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

type User = {
    navn: string;
    password: string;
    _id: string;
};

export async function POST(req: any) {
    try {

        const { navn, password } = await req.json();

        await connectMongo();

        const user: User | null = await FishingModel.findOne({ navn });

        if (!user) {
            return new Response(JSON.stringify({ error: "Brugernavnet findes ikke." }), { status: 400 });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return new Response(JSON.stringify({ error: "Forkert adgangskode." }), { status: 400 });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET!,
            { expiresIn: "7d" }
          );

        return NextResponse.json({token});

    } catch (error) {
       
    }

}