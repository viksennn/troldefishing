"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { FormEventHandler, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5"
import { PAGE_URL } from "../url";

export const ProfileSetting = ({data}:any) => {

    const [isOpen, setIsOpen] = useState<boolean>();

    const [fiskerNavn, setFiskerNavn] = useState(data.navn);

    const router = useRouter();

    const id = data._id;

    const handleDelete = async () => {

        const confirm = window.confirm(`Er du sikker på at du vil slette ${data.navn}?`);

        if (confirm) {
            await fetch(`${PAGE_URL}/api/fisk?id=${id}`, {
                method: "DELETE",
            })

            console.log("Delete")


            setIsOpen(false);
            router.push("/fiskerne");
            router.refresh();
            toast({
                title: `${data.navn} er blevet slettet`,
            });
        } else {
            setIsOpen(false);
        }
    }

    const handleEdit:FormEventHandler<HTMLFormElement> = async (e) => {

        console.log("test")
        e.preventDefault();

        await fetch(`http://localhost:3000/api/fisk/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({navn: fiskerNavn})
        });

        setIsOpen(false);
        router.refresh();
        toast( {
            title: "Navnet er blevet ændret!"
        })
    }

    return (
        <Dialog onOpenChange={setIsOpen} open={isOpen}>
            <DialogTrigger><IoSettingsSharp size={35} className="transition-all hover:scale-[1.1]"/></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Indstillinger</DialogTitle>
                </DialogHeader>
                <div>
                    <div>
                        <form className="flex flex-col gap-3 justify-between w-3/4" onSubmit={handleEdit}>
                            <input className="p-2 border-2 rounded" type="text" placeholder="Navn" value={fiskerNavn} onChange={(e) => setFiskerNavn(e.target.value)} />
                            <button className="bg-black text-white py-2 px-3 rounded" type="submit">Gem</button>
                        </form>
                    </div>
                    <div className="flex flex-col my-5 gap-3">
                        <p>Vil du slette <span className="font-bold">{data.navn}</span>?</p>
                        <button className="px-5 py-2 bg-red-700 text-white rounded w-1/4" onClick={handleDelete}>Slet</button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}