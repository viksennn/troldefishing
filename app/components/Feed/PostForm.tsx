"use client"

import { PAGE_URL } from "@/app/url";
import { useState } from "react";
import { PiPaperPlaneRightFill } from "react-icons/pi";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FaFileImage } from "react-icons/fa6";

import { createPost, getSignedURL } from "./action";
import { max } from "date-fns";
import { connectMongo } from "@/app/data/mongodb";
import { MediaModel } from "@/app/data/mongoFishingModel";

export const PostForm = ({ userId }: any) => {

    const [content, setContent] = useState<string>("");

    const [file, setFile] = useState<File | undefined>(undefined);
    const [fileUrl, setFileUrl] = useState<string | undefined>(undefined);

    const [statusMessage, setStatusMessage] = useState<string | undefined>(undefined);

    const computeSHA256 = async (file: File) => {
        const buffer = await file.arrayBuffer();
        const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray
          .map((b) => b.toString(16).padStart(2, "0"))
          .join("");
        return hashHex;
      };

    const maxFileSize = 1024 * 1024 * 5; // 5MB

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        setStatusMessage("Indlæser...");

        try {
            let mediaId: string | undefined = undefined;
            if (file) {
                setStatusMessage("Uploader billede...");
                const checksum  = await computeSHA256(file);
                const signedUrlResult = await getSignedURL(file.type, file.size, checksum);
                if (signedUrlResult.failure !== undefined) {
                    if (signedUrlResult.failure === "Invalid file type") {
                        setStatusMessage("Forkert filtype");
                        return;
                    }
                    if (signedUrlResult.failure === "File too large") {
                        setStatusMessage("Filen er for stor");
                        return;
                    } else {
                        setStatusMessage("Fejl");
                    }
                    console.error(signedUrlResult.failure);
                    throw(new Error(signedUrlResult.failure));
                }
        
                const {url} = signedUrlResult.success;
                mediaId = signedUrlResult.success.mediaId;

                console.log(url, mediaId);
        
                await fetch(url, {
                    method: "PUT",
                    body: file,
                    headers: {
                        "Content-Type": file?.type
                    }
                });
            }

            await createPost({ content, mediaId, sessionUserId: userId });

        } catch (error) {
            setStatusMessage("Fejl");
            return;
        }
        setStatusMessage("Oprettet");

        setTimeout(() => {
            setStatusMessage(undefined);
        }, 2000);

        setContent("");
        setFile(undefined);
        setFileUrl(undefined);

    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        setFile(file)

        if (file && file.size > maxFileSize) {
            toast({
                variant: "destructive",
                title: "Fejl ved upload af billede",
                description: "Filen er for stor. Maks 5MB!",
            })
            setFile(undefined);
            setFileUrl(undefined);

            return null;
        }

        if (fileUrl) {
            URL.revokeObjectURL(fileUrl)
        }
        
        if (file) {
            const url = URL.createObjectURL(file)
            setFileUrl(url)
        } else {
            setFileUrl(undefined)
        }
        
    }

    return (
        <div className="">
            <form onSubmit={handleSubmit}>
            <div className="border rounded-lg p-2">
                <div className="p-4">
                    <textarea
                        onChange={(e) => setContent(e.target.value)}
                        name="content"
                        className="resize-none border-none w-full focus:outline-none"
                        placeholder="Skriv noget om fisk eller sådan noget..."
                        value={content}
                    />
                </div>
                {fileUrl && file && (
                    <div className="flex flex-col">
                        <div className="mt-2 flex justify-center">
                            <img src={fileUrl} alt={file.name} className="w-4/5 h-auto object-cover rounded-lg" />
                        </div>
                        <div>
                            <button
                                type="button"
                                className="mt-2 text-white bg-red-500 py-1 px-2 text-xs rounded-lg"
                                onClick={() => {
                                    setFile(undefined)
                                    setFileUrl(undefined)
                                }}
                            >
                                Fjern billede
                            </button>
                        </div>
                    </div>
                )}
                <div className="text text-center">{statusMessage}</div>
            </div>
                <div className="flex items-center justify-between mt-3">
                    {!fileUrl && !file && (
                        <div>
                            <div className="">
                                <Label htmlFor="picture" className="p-1 flex items-center justify-center rounded-md hover:cursor-pointer"><FaFileImage size={35}/></Label>
                                <Input id="picture" type="file" className="hidden" onChange={handleChange} accept="image/jpeg,image/jpg,image/png,image/webp,image/gif,video/mp4,video/webm" />
                            </div>
                            <div>
                                <p className="text-xs">max 5mb</p>
                            </div>
                        </div>
                    )}
                    <div className="">
                        <button
                            type="submit"
                            className="mt-2 text-white bg-black py-2 px-3 rounded-lg"
                        >
                            <PiPaperPlaneRightFill size={25} />
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};
