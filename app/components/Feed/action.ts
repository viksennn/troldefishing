"use server"

import { authOptions } from "@/lib/authOptions";
import {getServerSession} from "next-auth";

import {S3Client, PutObjectCommand} from "@aws-sdk/client-s3";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

import crypto from "crypto";

import { MediaModel, PostModel } from "@/app/data/mongoFishingModel";
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
    try {
        const session = await getServerSession(authOptions);
        const sessionUserId = session?.user.id as string;

        if (!session) {
            throw new Error("Not authenticated");
        }

        await connectMongo();


        const postItem = new PostModel({
            content,
            userId: sessionUserId,
            comments: [],
            likes: [],
            image: mediaId ? mediaId : undefined,
            createdAt: new Date(),
        });

        await postItem.save();

    } catch (error) {
        console.error("Error creating post:", error);
        throw new Error("Failed to create post");
    }
}

export async function likePost(postId: string) {
    try {
        const session = await getServerSession(authOptions);
        const sessionUserId = session?.user.id as string;

        if (!session) {
            throw new Error("Not authenticated");
        }

        await connectMongo();

        const postItem = await PostModel.findById(postId);

        if (!postItem) {
            return { failure: "InvalidPostId" };
        }

        const userLikeIndex = postItem.likes.findIndex((like: string) => like === sessionUserId);

        if (userLikeIndex !== -1) {
            // Unlike the post
            postItem.likes.splice(userLikeIndex, 1);
        } else {
            // Like the post
            postItem.likes.push(sessionUserId);
        }

        await postItem.save();

        return { success: userLikeIndex !== -1 ? "Unliked" : "Liked" };
    } catch (error) {
        console.error("Error liking/unliking post:", error);
        throw error; // Rethrow to be caught in handleLike
    }
}

export async function createComment(postId: string, content: string) {
    const session = await getServerSession(authOptions);
    const sessionUserId = session?.user.id;

    if (!session) {
        throw new Error("Not authenticated");
    }

    await connectMongo();

    const postItem = await PostModel.findById(postId);

    if (!postItem) {
        return { failure: "InvalidPostId" };
    }

    const commentItem = {
        content,
        userId: sessionUserId,
        createdAt: new Date(),
    };

    // Ensure commentItem is a plain object
    if (Object.getPrototypeOf(commentItem) !== Object.prototype) {
        throw new Error("Comment item must be a plain object");
    }

    postItem.comments.push(commentItem);

    await postItem.save();

}

// Ensure this function works independently
export async function deleteComment(postId: any, commentId: any) {
    const session = await getServerSession(authOptions);
    const sessionUserId = session?.user.id as string;

    if (!session) {
        throw new Error("Not authenticated");
    }

    await connectMongo();

    const postItem = await PostModel.findById(postId);

    if (!postItem) {
        console.log(`Invalid post ID: ${postId}`);
        return { failure: "InvalidPostId" };
    }

    const commentIndex = postItem.comments.findIndex((comment: any) => comment._id.toString() === commentId);

    if (commentIndex === -1) {
        console.log(`Invalid comment ID: ${commentId}`);
        return { failure: "InvalidCommentId" };
    }

    if (postItem.comments[commentIndex].userId !== sessionUserId) {
        console.log(`Unauthorized user: ${sessionUserId}`);
        return { failure: "Unauthorized" };
    }

    postItem.comments.splice(commentIndex, 1);

    await postItem.save();

    console.log("Comment deleted");

    revalidatePath("/dashboard");
    return { success: "CommentDeleted" };
}

