"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export const FiskeBillede = ({img}: any) => {



    return (
            <Dialog>
                <DialogTrigger className="p-2 rounded bg-black text-white text-sm mt-1">Vis billede</DialogTrigger>
                <DialogContent className="bg p-2 w-[80vw] h-[80vh] flex items-center justify-center rounded overflow-hidden">
                    <img src={img} alt="fiskebillede" className="rounded" />
                </DialogContent>
            </Dialog>
    )
}