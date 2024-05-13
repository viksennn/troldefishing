"use client"

import { PAGE_URL } from "@/app/url";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast";

import { useRouter } from "next/navigation";
import { FormEventHandler, useState } from "react";

export const FiskerOpretKnap = () => {

    const router = useRouter();

    const [FiskerNavn, setFiskerNavn] = useState("");

    const [isOpen, setIsOpen] = useState<boolean>();

    const handleOpretFisker:FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        const url = `${PAGE_URL}/api/fisk`;

        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(FiskerNavn)
        })
        router.refresh();
        setIsOpen(false);
        toast( {
            title: `${FiskerNavn} er nu blevet en del af fiskerne! 🎣`
        })
    }

    return (
        <div>
            <Dialog onOpenChange={setIsOpen} open={isOpen}>
                <DialogTrigger className="py-2 px-3 rounded bg-indigo-700 text-white ">Opret Fisker</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Opret ny fisker</DialogTitle>
                    </DialogHeader>
                    <div className="flex justify-center mt-5">
                        <form className="flex flex-col gap-3 justify-start w-3/4" onSubmit={handleOpretFisker}>
                            <input className="p-2 border-2 rounded" type="text" placeholder="Navn" onChange={(e) => setFiskerNavn(e.target.value)} />
                            <button className="bg-black text-white py-2 px-3 rounded" type="submit">Opret</button>
                        </form>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}