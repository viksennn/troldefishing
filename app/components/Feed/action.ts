"use server"

import { authOptions } from "@/lib/authOptions";
import {getServerSession} from "next-auth";

import {S3Client, PutObjectCommand} from "@aws-sdk/client-s3";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

import crypto from "crypto";

import mongoose from "mongoose";
import { MediaModel, PostModel } from "@/app/data/mongoFishingModel";
import { connectMongo } from "@/app/data/mongodb";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { create } from "domain";

const generateFilename = (byes = 32) => crypto.randomBytes(byes).toString("hex");

const s3 = new S3Client({
    region: process.env.AWS_BUCKET_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
    }
})


const acceptedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
    "video/mp4",
    "video/webm"
]

const maxFileSize = 1024 * 1024 * 5; // 5MB

export async function getSignedURL(type: string, size: number, checksum: string) {
    const session =  await getServerSession(authOptions);

    const sessionUserId = session?.user.id as string;

    if (!session) {
        return { failure: "Not authenticated" };
    }

    if(!acceptedTypes.includes(type)) {
        return { failure: "Invalid file type" };
    }
    
    if (size > maxFileSize) {
        return { failure: "File too large" };
    }
    
    const putObjectCommand = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: generateFilename(),
        ContentType: type,
        ContentLength: size,
        ChecksumSHA256: checksum,
        Metadata: {
            userId: sessionUserId
        }
    }
)
    const signedUrl = await getSignedUrl(s3, putObjectCommand, { 
        expiresIn: 60 
    });

    const mediaResult = await new MediaModel({
        type: type.startsWith("image") ? "image" : "video",
        url: signedUrl.split("?")[0],
        userId: sessionUserId
    });

    await mediaResult.save();

    return { success: { url: signedUrl, mediaId: mediaResult._id } };
    
}

    type CreatePostArgs = {
        content: string;
        mediaId?: string;
        sessionUserId: string;
    }

export async function createPost({content, mediaId}: CreatePostArgs)  {

    const session = await getServerSession(authOptions);
    const sessionUserId = session?.user.id as string;

    if (!session) {
        throw new Error("Not authenticated");
    }

    if (mediaId) {
        const mediaItem = await MediaModel.findById(mediaId);

        if (!mediaItem) {
            return { failure: "Invalid media ID" };
        }
    }

    await connectMongo();

    const postItem = await new PostModel({
        content,
        userId: sessionUserId,
        image: mediaId ? mediaId : undefined,
        createdAt: new Date(),
    });

    await postItem.save();

    if (mediaId) {
        await MediaModel.findByIdAndUpdate(mediaId, { refId: postItem._id });
    }

    revalidatePath("/dashboard");
    redirect("/dashboard");
}