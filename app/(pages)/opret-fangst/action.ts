"use server"

import { authOptions } from "@/lib/authOptions";
import {getServerSession} from "next-auth";

import {S3Client, PutObjectCommand} from "@aws-sdk/client-s3";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

import crypto from "crypto";

import mongoose from "mongoose";
import { FishingModel, MediaModel, PostModel } from "@/app/data/mongoFishingModel";
import { connectMongo } from "@/app/data/mongodb";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const generateFilename = (byes = 32) => crypto.randomBytes(byes).toString("hex");

const s3 = new S3Client({
    region: process.env.AWS_BUCKET_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_MAIN_ACCESS_KEY!,
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

    return { success: { url: signedUrl}};
    
}

type CreatePostArgs = {
    art: string;
    lokation: string;
    agn: string;
    dato: Date;
    imgUrl?: string;
}

export async function createFangst({ art, lokation, agn, dato, imgUrl }: CreatePostArgs) {
    const session = await getServerSession(authOptions);
    const sessionUserId = session?.user.id as string;

    if (!session) {
        throw new Error("Not authenticated");
    }

    await connectMongo();

    const fiskeSet = {
        art: art,
        agn: agn,
        lokation: lokation,
        dato: dato,
        imgUrl: imgUrl,
    };

    const fangstItem = await FishingModel.findOneAndUpdate(
        { _id: sessionUserId },
        { $push: { fiskeData: fiskeSet } },
        { new: true, useFindAndModify: false }
    );

    fangstItem.save();

    revalidatePath("/min-profil");
    redirect("/min-profil");
}