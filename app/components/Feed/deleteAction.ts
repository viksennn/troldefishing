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


export async function deletePost(postId: string) {

    console.log("deletePost");

    const session =  await getServerSession(authOptions);

    if (!session) {
        return { error: "Du skal være logget ind" };
    }


    const post = await PostModel.findById(postId);

    if (!post) {
        return { error: "Post ikke fundet." };
    }

    if (post.userId !== session.user.id) {
        return { error: "Du kan kun slet din egen post" };
    }

    
    const mediaItem = await MediaModel.find({ refId: post._id });
    
    await MediaModel.deleteMany({ refId: post._id });
    
    await post.deleteOne();

    //s3 delete

    if (mediaItem.length === 0) {
        revalidatePath("/dashboard");
        redirect("/dashboard");
    }

    const deleteObjectCommand = new DeleteObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: mediaItem[0].url.split("/").pop()
    });

    try {
        await s3.send(deleteObjectCommand);
    } catch (error) {
        console.log("Error deleting file from S3", error);
    }

    revalidatePath("/dashboard");
    redirect("/dashboard");
}