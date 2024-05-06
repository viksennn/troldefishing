"use client"

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

export const FiskeOpretKnap = ({label, slug}: any) => {

    const router = useRouter();

    const [FiskArt, setFiskArt] = useState<string>("");
    const [FiskLokation, setFiskLokation] = useState<string>("");
    const [FiskAgn, setFiskAgn] = useState<string>("");
    const [FiskDato, setFiskDato] = useState<string>("");

    const [isOpen, setIsOpen] = useState<boolean>();

    const handleOpretFisk:FormEventHandler<HTMLFormElement> = async (e) => {

        e.preventDefault();
        
        await fetch(`http://localhost:3000/api/fisk/${slug}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({art: FiskArt, agn: FiskAgn, lokation: FiskLokation, dato: FiskDato})
        })
        router.refresh();
        setIsOpen(false);
        toast( {
            title: `${FiskArt} er blevet tilføjet 🎣`
        })

        setFiskArt("");
        setFiskLokation("");
        setFiskAgn("");
        setFiskDato("");
    }

    return (
        <div>
            <Dialog onOpenChange={setIsOpen} open={isOpen}>
                <DialogTrigger className="py-2 px-3 rounded bg-black text-white hover:translate-x-1 transition-all">{label}</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Opret fisk</DialogTitle>
                    </DialogHeader>
                    <div className="flex justify-center mt-5">
                        <form className="flex flex-col gap-3 justify-start w-3/4" onSubmit={handleOpretFisk}>
                            <input required className="p-2 border-2 rounded" type="text" placeholder="Art" onChange={(e) => setFiskArt(e.target.value)} />
                            <input required className="p-2 border-2 rounded" type="text" placeholder="Lokation" onChange={(e) => setFiskLokation(e.target.value)} />
                            <input required className="p-2 border-2 rounded" type="text" placeholder="Agn" onChange={(e) => setFiskAgn(e.target.value)} />
                            <input required className="p-2 border-2 rounded" type="date" placeholder="Dato" onChange={(e) => setFiskDato(e.target.value)} />
                            <button className="bg-black text-white py-2 px-3 rounded" type="submit">Opret</button>
                        </form>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}