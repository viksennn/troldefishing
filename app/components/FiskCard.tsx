"use client"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { FaTrash } from "react-icons/fa";
import { TbFishBone } from "react-icons/tb";

export const FiskCard = ({ data, user }:any) => {

    const id = data._id;

    const router = useRouter();

    const handleDeleteClick = async () => {
        const url = `http://localhost:3000/api/fisk/${user}`;
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

    return (
        <div className="p-3 border rounded w-[400px] mt-3 flex justify-between">
            <div className="">
                <p><span className="text-gray-500">Type: </span>{data.art}</p>
                <p><span className="text-gray-500">Lokation: </span>{data.lokation}</p>
                <p><span className="text-gray-500">Fanget med: </span>{data.agn}</p>
                <p><span className="text-gray-500">Dato: </span>{data.dato}</p>
            </div>
            <div className="flex flex-col justify-end">
                <Popover>
                    <PopoverTrigger><TbFishBone size={25} /></PopoverTrigger>
                    <PopoverContent className="flex flex-col justify-center items-center gap-3">
                        <p className="text-sm">Du er i gang med at slette</p>
                        <p className="text-sm underline">{data.art}</p>
                        <p className="text-sm font-bold">Er du sikker?</p>
                        <button className="p-1 rounded bg-red-600 text-white text-sm" onClick={(handleDeleteClick)}><FaTrash /></button>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
};
