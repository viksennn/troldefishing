"use server"

import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({
    region: process.env.AWS_BUCKET_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
    }
});


export async function deleteProfilImg(imgUrl: string) {
    console.log("deleteProfilImg");

    const deleteObjectCommand = new DeleteObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: imgUrl.split("/").pop()
    });

    try {
        const result = await s3.send(deleteObjectCommand);
        console.log("Deleted:", result);
    } catch (error) {
        console.error("Error deleting object:", error);
        return { error: "Der opstod en fejl" };
    }
}
