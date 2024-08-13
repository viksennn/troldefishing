"use server"

import { MediaModel, PostModel } from "@/app/data/mongoFishingModel";
import { authOptions } from "@/lib/authOptions";
import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


const s3 = new S3Client({
    region: process.env.AWS_BUCKET_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_MAIN_ACCESS_KEY!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
    }
})


export async function deletePost(data: any) {
    const postId = data._id;  // Opdateret for at bruge det korrekte felt for postId
    const image = data.image?.url;

    console.log("deletePost");

    const session = await getServerSession(authOptions);

    if (!session) {
        return { error: "Du skal være logget ind" };
    }

    const post = await PostModel.findById(postId);

    if (!post) {
        return { error: "Post ikke fundet." };
    }

    // Sørg for at sammenligne bruger-ID korrekt
    if (post.userId.toString() !== session.user.id) {
        return { error: "Du kan kun slette din egen post" };
    }

    if (!image) {
        await post.deleteOne();
        return { success: true };
    }
    

    // S3 delete
    const deleteObjectCommand = new DeleteObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: image.split("/").pop(), // Fjern [0], da image allerede er en string
    });

    try {
        await s3.send(deleteObjectCommand);
        await post.deleteOne();
        return { success: true };
    } catch (error) {
        console.log("Error deleting file from S3", error);
        return { error: "Fejl ved sletning af fil fra S3" };
    }
}
