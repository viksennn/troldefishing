"use client"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { FaImage, FaPen, FaTrash } from "react-icons/fa";
import { TbFishBone } from "react-icons/tb";
import { PAGE_URL } from "../url";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FormEventHandler, useState } from "react";

import z from "zod";
import { format } from "date-fns";
import  { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { fiskeAgnData, fiskeArterData, fiskeLokationerData } from "@/app/data/fiskefangst";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FishTypeCard } from "./achivements/FishTypeCard";
import { FiskeBillede } from "./ui/FiskeBillede";
import { utapi } from "../server/uploadthings";
import { deleteFangst } from "../(pages)/opret-fangst/deleteAction";

const FormSchema = z.object({
    art: z
      .string({
            required_error: "Vil du være sød at vælge en art...",
      }),
    lokation: z
        .string({
            required_error: "Vil du være sød at vælge en lokation...",
        }),
    agn: z
        .string({
            required_error: "Vil du være sød at vælge agn...",
        }),
        dato: z
        .date({
            required_error: "Vil du være sød at vælge dato...",
        }),
    })
    
    export const FiskCardProfile = ({ data, user }:any) => {
    
        const id = data._id;
    
        const router = useRouter();
    
        const [isOpen, setIsOpen] = useState<boolean>();

        const date = new Date(data.dato);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            art: data.art,
            lokation: data.lokation,
            agn: data.agn,
            dato: date,
        },
      })
     
      async function onSubmit(data: z.infer<typeof FormSchema>) {

        

        const url = `${PAGE_URL}/api/fisk/${user}/fiskedata/${id}`;

        await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            })

        console.log(data)

        router.refresh();
        setIsOpen(false);
        toast( {
            title: `Fangst er blevet opdateret 🎣`
        })
      }

    const imgUrl = data.imgUrl;

    const handleDeleteClick = async () => {
        
        await deleteFangst(id);

        router.refresh();
        console.log("slet");
        toast({
            title: `${data.art} er blevet slettet 🫤`
        });
    };

    const formatDato = format(new Date(data.dato), 'dd-MM-yyyy')

    
    return (
        <div className="p-3 border rounded w-full lg:w-[400px] mt-3 flex flex-row mb-8">
            <div className="flex items-center justify-center mr-5">
                <FishTypeCard art={data.art} className={"h-36 object-contain"}/>
            </div>
            <div className="flex flex-col justify-start w-full">
                <div className="">
                    <p className="text-base lg:text-base"><span className="text-gray-500">Type: </span>{data.art}</p>
                    <p className="text-base lg:text-base"><span className="text-gray-500">Lokation: </span>{data.lokation}</p>
                    <p className="text-base lg:text-base"><span className="text-gray-500">Fanget med: </span>{data.agn}</p>
                    <p className="text-base lg:text-base"><span className="text-gray-500">Dato: </span>{formatDato}</p>

                    <div className="flex items-center justify-between mt-2 flex-row-reverse">
                        {data.imgUrl ? (<FiskeBillede img={imgUrl} trigger={<p className="text-xl p-1"><FaImage /></p>} />) : <p className="text-gray-700 text-base lg:text-sm mt-1.5 font-bold">Intet billede</p>}
                        <Popover>
                            <PopoverTrigger><TbFishBone className="w-8 h-8 lg:w-6 lg:h-6" /></PopoverTrigger>
                            <PopoverContent className="flex flex-col justify-center items-center gap-3">
                                <p className="text-sm">Sikker på du vil slette {data.art}?</p>
                                <div className="flex gap-2 items-center">
                                    <p className="text-sm font-bold">Ja tak </p>
                                    <button className="p-1 rounded bg-red-600 text-white text-sm" onClick={(handleDeleteClick)}><FaTrash /></button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
            </div>
        </div>
    );
};
