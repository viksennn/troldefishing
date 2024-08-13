import { connectMongo } from "@/app/data/mongodb";
import { MediaModel, PostModel } from "@/app/data/mongoFishingModel";
import { NextResponse } from "next/server";

export async function GET(req:any) {
    await connectMongo();
    
    const posts = await PostModel.find()
    .populate('userId', 'navn profilImgUrl')
    .populate('likes', 'navn profilImgUrl')
    .populate('comments.userId', 'navn profilImgUrl')

    return NextResponse.json(posts, { status: 200 });

}

export async function POST(req:any) {
    const post = await req.json();
    await connectMongo();
    await PostModel.create(post);
    return NextResponse.json({ message: "Post lagt til"}, { status: 201});
}

export async function DELETE(req:any) {
    const id = await req.nextUrl.searchParams.get("id");
    await connectMongo();
    await PostModel.findByIdAndDelete(id);
    return NextResponse.json({ message: "Post slettet" }, {status: 200});
}

