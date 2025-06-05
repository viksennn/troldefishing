import { FishingModel } from "@/app/data/mongoFishingModel";
import { connectMongo } from "@/app/data/mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { navn, password } = await req.json();

    await connectMongo();

    const existingUser = await FishingModel.findOne({ navn });

    if (existingUser) {
      return NextResponse.json(
        { error: "Brugernavnet er allerede taget." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await FishingModel.create({ navn, password: hashedPassword });

    // ✔️ Opret JWT-token
    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    return NextResponse.json({ token }, { status: 201 });
  } catch (error: any) {
    console.error("Signup-fejl:", error);
    return NextResponse.json(
      { error: "Intern serverfejl" },
      { status: 500 }
    );
  }
}
