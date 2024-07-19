import { connectMongo } from "@/app/data/mongodb";
import { MediaModel, PostModel } from "@/app/data/mongoFishingModel";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectMongo();
        
        const posts = await PostModel.find().lean();
        
        const postsWithMedia = await Promise.all(posts.map(async post => {
            try {
                const media = await MediaModel.find({ refId: post._id }).lean();
                return { ...post, media };
            } catch (error) {
                console.error(`Error fetching media for post ${post._id}:`, error);
                return { ...post, media: [] };
            }
        }));
        
        return NextResponse.json(postsWithMedia);
    } catch (error) {
        console.error("Error fetching posts with media:", error);
        return NextResponse.json({ error: "Failed to fetch posts with media" }, { status: 500 });
    }
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

