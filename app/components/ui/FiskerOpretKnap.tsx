"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

import { useRouter } from "next/navigation";
import { FormEventHandler, useState } from "react";

export const FiskerOpretKnap = () => {

    const router = useRouter();

    const [FiskerNavn, setFiskerNavn] = useState("");

    const handleOpretFisker:FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        
        await fetch(`http://localhost:3000/api/fisk`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(FiskerNavn)
        })
        router.refresh();
    }

    return (
        <div>
            <Dialog>
                <DialogTrigger className="py-2 px-3 rounded bg-black text-white ">Opret Fisker</DialogTrigger>
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