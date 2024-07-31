"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { FormEventHandler, useState } from "react";
import { FaArrowRight, FaFileImage } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5"
import { PAGE_URL } from "../url";
import { signOut } from "next-auth/react";
import { getSignedURL } from "../(pages)/opret-fangst/action";
import { get } from "http";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { deleteProfilImg } from "../server/deleteAction";

const computeSHA256 = async (file: File) => {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
  };

export const ProfileSetting = ({data}:any) => {

    const [isOpen, setIsOpen] = useState<boolean>();

    const [fiskerNavn, setFiskerNavn] = useState(data.navn);

    const [file, setFile] = useState<File>();
    
    const [fileUrl, setFileUrl] = useState<string | undefined>(data.profilImgUrl );
    const maxFileSize = 5 * 1024 * 1024; // 5MB

    const [statusMessage, setStatusMessage] = useState<string>();
    
    const oldProfilImg = data.profilImgUrl;

    const router = useRouter();

    const id = data._id;

    const handleDelete = async () => {

        const confirm = window.confirm(`Er du sikker på at du vil slette ${data.navn}?`);

        if (confirm) {
            await fetch(`${PAGE_URL}/api/fisk?id=${id}`, {
                method: "DELETE",
            })

            console.log("Delete");
            
            signOut();
            router.push("/");

        } else {
            setIsOpen(false);
        }
    }

    
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

            return;
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

    const handleEdit:FormEventHandler<HTMLFormElement> = async (e) => {

        e.preventDefault();

        if (file) {
            setStatusMessage("Uploader billede...");
            console.log("Uploading image...");
            const checksum  = await computeSHA256(file);
            const signedUrlResult = await getSignedURL(file.type, file.size, checksum);
            if (signedUrlResult.failure !== undefined) {
                if (signedUrlResult.failure === "Invalid file type") {
                    toast({
                        variant: "destructive",
                        title: "Fejl ved upload af billede",
                        description: "Forkert filtype",
                    })
                    setStatusMessage("Forkert filtype");
                    return;
                }
                if (signedUrlResult.failure === "File too large") {
                    toast({
                        variant: "destructive",
                        title: "Fejl ved upload af billede",
                        description: "Filen er for stor. Maks 5MB!",
                    })
                    setStatusMessage("For stor fil");
                    return;
                } else {
                    toast({
                        variant: "destructive",
                        title: "Ups noget gik galt...",
                        description: "Spørg Viktor",
                    })
                    setStatusMessage("Fejl");
                }
                console.error(signedUrlResult.failure);
                throw(new Error(signedUrlResult.failure));
            }
    
            const {url} = signedUrlResult.success;
            const s3fileUrl = url.split("?")[0] ?? "hallo";

            setStatusMessage("Gemmer ændringer...");
            
            console.log(s3fileUrl);

            if (oldProfilImg) {
                await deleteProfilImg(oldProfilImg);
            }

            await fetch(`${PAGE_URL}/api/fisk/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({navn: fiskerNavn, profilImgUrl: s3fileUrl}),
            });
            
            await fetch(url, {
                method: "PUT",
                body: file,
                headers: {
                    "Content-Type": file?.type
                }
            });


            setIsOpen(false);

            router.refresh();

            toast({
                variant: "default",
                title: "Profil opdateret",
                description: "Dine ændringer er blevet gemt",
            });
        } else {
            await fetch(`${PAGE_URL}/api/fisk/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({navn: fiskerNavn}),
            });

            setStatusMessage("Gemmer ændringer...");
            toast({
                variant: "default",
                title: "Profil opdateret",
                description: "Dine ændringer er blevet gemt",
            });
            setIsOpen(false);

            router.refresh();
        }
    }

    return (
        <Dialog onOpenChange={setIsOpen} open={isOpen}>
            <DialogTrigger><IoSettingsSharp size={35} className="transition-all hover:scale-[1.1]"/></DialogTrigger>
            <DialogContent className="min-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Indstillinger</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleEdit}>
                    <div className="flex flex-row-reverse justify-evenly items-center">
                        <div>
                            <div className="flex flex-col gap-3 justify-between">
                                <input className="p-2 border-2 rounded" type="text" placeholder="Navn" value={fiskerNavn} onChange={(e) => setFiskerNavn(e.target.value)} />
                            </div>
                        </div>
                        <div className="mt-2">
                            {fileUrl && (
                                <label className="relative flex items-center justify-center h-40 w-40 bg-gray-200 cursor-pointer rounded-full my-4 overflow-hidden">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageChange}
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <img src={fileUrl} alt="profil billede" className="object-cover h-full w-full rounded-full" />
                                    </div>
                                </label>
                            )}
                            {!fileUrl && (
                                <label className="flex items-center justify-center h-40 w-40 bg-gray-200 cursor-pointer rounded-full my-4">
                                    <div className="flex gap-2 items-center">
                                        <FaFileImage />
                                        <span className="text-indigo-500 text-xs">Vælg billede</span>
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageChange}
                                    />
                                </label>        
                            )}                
                        </div>
                    </div>
                    <div className="mt-2 flex justify-center items-center flex-col">
                        <textarea className="p-2 border-2 rounded w-4/5 resize-none" placeholder="Skriv noget om dig selv"></textarea>
                    </div>
                    <div className="flex justify-evenly items-center mb-2 mt-6 flex-row-reverse">
                        <div className="flex flex-col gap-3">
                            <p>Gem ændringer</p>
                            <button className="px-5 py-2 bg-gray-700 text-white rounded" type="submit">Gem</button>
                        </div>
                        <div className="flex flex-col gap-3">
                            <p>Vil du slette <span className="font-bold">{data.navn}</span>?</p>
                            <button className="px-5 py-2 bg-red-700 text-white rounded" onClick={handleDelete}>Slet</button>
                        </div>
                    </div>
                    <div className="w-full text-center">
                        <p>{statusMessage}</p>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

function setStatusMessage(arg0: string) {
    throw new Error("Function not implemented.");
}
