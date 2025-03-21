"use client"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { FaPen, FaTrash } from "react-icons/fa";
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
import { FaImage } from "react-icons/fa6";

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
    
    export const FiskCard = ({ data, user }:any) => {
    
        const id = data._id;
    
        const router = useRouter();
    
        const [isOpen, setIsOpen] = useState<boolean>();

        const date = new Date(data.dato);

        const fiskeArt = data.art;

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            art: data.art,
            lokation: data.lokation,
            agn: data.agn,
            dato: date
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

    const formatDato = format(new Date(data.dato), 'dd-MM-yyyy')

    const imgUrl = data.imgUrl;

    return (
        <div className="p-3 border rounded w-full lg:w-[400px] mt-3 flex lg:flex-row mb-8">
            <div className="flex items-center justify-center mr-5">
                <FishTypeCard art={data.art}/>
            </div>
            <div className="flex justify-between w-full">
                <div className="w-full">
                    <p className="text-sm"><span className="text-gray-500">Type: </span>{data.art}</p>
                    <p className="text-sm"><span className="text-gray-500">Lokation: </span>{data.lokation}</p>
                    <p className="text-sm"><span className="text-gray-500">Fanget med: </span>{data.agn}</p>
                    <p className="text-sm"><span className="text-gray-500">Dato: </span>{formatDato}</p>

                    <div className="flex justify-end w-full">
                        {data.imgUrl ? (<FiskeBillede img={imgUrl} trigger={<p className="text-xl p-1"><FaImage /></p>} />) : <p className="text-gray-700 text-base lg:text-sm mt-1.5 font-bold">Intet billede</p>}
                    </div>
                    
                </div>
                
            </div>

        </div>
    );
};
