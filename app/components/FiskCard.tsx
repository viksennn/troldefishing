"use client"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { FaPen, FaTrash } from "react-icons/fa";
import { TbFishBone } from "react-icons/tb";
import { PAGE_URL } from "../url";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FormEventHandler, useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export const FiskCard = ({ data, user }:any) => {

    const id = data._id;

    const router = useRouter();

    const [isOpen, setIsOpen] = useState<boolean>();

    const [FiskArt, setFiskArt] = useState<string>(data.art);
    const [FiskLokation, setFiskLokation] = useState<string>(data.lokation);
    const [FiskAgn, setFiskAgn] = useState<string>(data.agn);
    const [FiskDato, setFiskDato] = useState<string>(data.dato);

    const handleDeleteClick = async () => {
        const url = `${PAGE_URL}/api/fisk/${user}`;
        await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ fishId: id }),
        });

        router.refresh();
        console.log("slet");
        toast({
            title: `${data.art} er blevet slettet 🫤`
        });
    };

    const handleEditClick:FormEventHandler<HTMLFormElement> = async (e) => {

        e.preventDefault();

        const url = `${PAGE_URL}/api/fisk/${user}/fiskedata/${id}`;
        await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ art: FiskArt, agn: FiskAgn, lokation: FiskLokation, dato: FiskDato }),
        })

        setFiskArt("");
        setFiskAgn("");
        setFiskLokation("");
        setFiskDato("");

        toast({
            title: `${FiskArt} er blevet opdateret 🎣`
        })

        router.refresh();
    }

    return (
        <div className="p-3 border rounded w-full lg:w-[600px] mt-3 flex justify-between flex-col lg:flex-row mb-8">
            <div className="">
                <p className="text-xl lg:text-lg"><span className="text-gray-500">Type: </span>{data.art}</p>
                <p className="text-xl lg:text-lg"><span className="text-gray-500">Lokation: </span>{data.lokation}</p>
                <p className="text-xl lg:text-lg"><span className="text-gray-500">Fanget med: </span>{data.agn}</p>
                <p className="text-xl lg:text-lg"><span className="text-gray-500">Dato: </span>{data.dato}</p>
            </div>
            <div className="flex lg:flex-col lg:justify-end justify-center items-center mt-8 gap-10 lg:mt-2 lg:gap-2">
                <Dialog onOpenChange={setIsOpen} open={isOpen}>
                <DialogTrigger><FaPen className="w-6 h-6 lg:w-4 lg:h-4" /></DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Opret fisk</DialogTitle>
                    </DialogHeader>
                    <div className="flex justify-center mt-5">
                        <form className="flex flex-col gap-3 justify-start w-3/4" onSubmit={(handleEditClick)}>
                            <input className="p-2 border-2 rounded" type="text" value={FiskArt} placeholder="Art" onChange={(e) => setFiskArt(e.target.value)} />
                            <input className="p-2 border-2 rounded" type="text" value={FiskLokation} placeholder="Lokation" onChange={(e) => setFiskLokation(e.target.value)} />
                            <input className="p-2 border-2 rounded" type="text" value={FiskAgn} placeholder="Agn" onChange={(e) => setFiskAgn(e.target.value)} />
                            <input className="p-2 border-2 rounded" type="date" value={FiskDato} placeholder="Dato" onChange={(e) => setFiskDato(e.target.value)} />
                            <button className="bg-black text-white py-2 px-3 rounded" type="submit">Opdater {FiskArt}</button>
                        </form>
                    </div>
                </DialogContent>
            </Dialog>
                <Popover>
                    <PopoverTrigger><TbFishBone className="w-8 h-8 lg:w-6 lg:h-6" /></PopoverTrigger>
                    <PopoverContent className="flex flex-col justify-center items-center gap-3">
                        <p className="text-sm">Sikker på du vil slette {data.art}?</p>
                        <div className="flex gap-2 items-center">
                            <p className="text-sm font-bold">Ja tak, </p>
                            <button className="p-1 rounded bg-red-600 text-white text-sm" onClick={(handleDeleteClick)}><FaTrash /></button>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
};
