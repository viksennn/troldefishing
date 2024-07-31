"use server"

import { FishingModel, MediaModel, PostModel } from "@/app/data/mongoFishingModel";
import { authOptions } from "@/lib/authOptions";
import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import mongoose from "mongoose";

const s3 = new S3Client({
    region: process.env.AWS_BUCKET_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_MAIN_ACCESS_KEY!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
    }
});

export async function deleteFangst(fishId: string) {
    console.log("deleteFangst");

    const session = await getServerSession(authOptions);

    if (!session) {
        console.error("User not logged in");
        return { error: "Du skal være logget ind" };
    }

    const sessionUserId = session.user.id;
    console.log("User session ID:", sessionUserId);

    // Convert fishId to ObjectId
    const fishObjectId = new mongoose.Types.ObjectId(fishId);

    const fangst = await FishingModel.findOne({ _id: sessionUserId });

    if (!fangst) {
        console.error("No matching record found for user ID:", sessionUserId);
        return { error: "Ingen fangst fundet" };
    }

    console.log("Fangst:", fangst);

    // Find the fish item with matching ObjectId
    const fishItem = fangst.fiskeData.find((fish: any) => fish._id.equals(fishObjectId));

    if (!fishItem) {
        console.error("Fish ID not found in fiskeData:", fishId);
        return { error: "Ingen fangst fundet med det ID" };
    }

    const fangstImg = fishItem.imgUrl;
    console.log("fangstimg:", fangstImg);

    if (fangstImg) {
        const deleteObjectCommand = new DeleteObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: fangstImg.split("/").pop()
        });

        try {
            await s3.send(deleteObjectCommand);
            console.log("Image deleted successfully from S3");
        } catch (error) {
            console.error("Error deleting image from S3", error);
        }
    }

    const updatedFangst = await FishingModel.findOneAndUpdate(
        { _id: sessionUserId },
        { $pull: { fiskeData: { _id: fishObjectId } } },
        { new: true } // Return the updated document
    );

    console.log("Updated Fangst:", updatedFangst);
}
