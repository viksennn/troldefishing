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



    
    return (
        <div className="p-3 border rounded w-full lg:w-[400px] mt-3 flex lg:flex-row mb-8">
            <div className="flex items-center justify-center mr-5">
                <FishTypeCard data={data}/>
            </div>
            <div className="flex justify-between w-full">
                <div className="">
                    <p className="text-xl lg:text-base"><span className="text-gray-500">Type: </span>{data.art}</p>
                    <p className="text-xl lg:text-base"><span className="text-gray-500">Lokation: </span>{data.lokation}</p>
                    <p className="text-xl lg:text-base"><span className="text-gray-500">Fanget med: </span>{data.agn}</p>
                    <p className="text-xl lg:text-base"><span className="text-gray-500">Dato: </span>{formatDato}</p>
                </div>
                <div className="flex lg:flex-col lg:justify-end justify-center items-center mt-8 gap-10 lg:mt-2 lg:gap-2">
                <Dialog onOpenChange={setIsOpen} open={isOpen}>
                        <DialogTrigger><FaPen className="w-6 h-6 lg:w-4 lg:h-4" /></DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Redigere fangst</DialogTitle>
                        </DialogHeader>
                        
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                                    <FormField
                                    control={form.control}
                                    name="art"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Fiske Art</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder={"test"} />
                                            </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {fiskeArterData.map((fisk) => (
                                                    <SelectItem key={fisk} value={fisk}>
                                                        {fisk}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                    
                                    />
                                    <FormField
                                    control={form.control}
                                    name="lokation"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Lokation</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="" />
                                            </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {fiskeLokationerData.map((loka) => (
                                                    <SelectItem key={loka} value={loka}>
                                                        {loka}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                    
                                    />
                                    <FormField
                                    control={form.control}
                                    name="agn"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Agn</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="" />
                                            </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {fiskeAgnData.map((agn) => (
                                                    <SelectItem key={agn} value={agn}>
                                                        {agn}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                    
                                    />
                                    <FormField
                                            control={form.control}
                                            name="dato"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col">
                                                <FormLabel>Dato for fangst</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-full pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                        >
                                                        {field.value ? (
                                                            format(new Date(field.value), "dd-MM-yyyy")
                                                        ) : (
                                                            <span className="text-black">DATO</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-80" />
                                                        </Button>
                                                    </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                        disabled={(date) =>
                                                        date > new Date() || date < new Date("1900-01-01")
                                                        }
                                                        initialFocus
                                                    />
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage />
                                                </FormItem>
                                            )}
                                            />
                                    <Button type="submit">Færdig</Button>
                                </form>
                            </Form>

                    </DialogContent>
                </Dialog>
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
    );
};
