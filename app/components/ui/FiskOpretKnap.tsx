"use client"

import { PAGE_URL } from "@/app/url";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { FormEventHandler, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { format } from "date-fns";
import  { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { fiskeAgnData, fiskeArterData, fiskeLokationerData } from "@/app/data/fiskefangst";
import { UploadButton } from "../uploadthing/uploadthing";

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
    imgUrl: z.string().optional(),
    imgKey: z.string().optional()
  })

export const FiskeOpretKnap = ({label, slug}: any) => {

    const router = useRouter();
    const [imgUrl, setImgUrl] = useState<string | null>(null);
    const [imgKey, setImgKey] = useState<string | null>(null);

    const [uploadComplete, setUploadComplete] = useState<boolean>(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
      })
     
    async function onSubmit(data: z.infer<typeof FormSchema>) {

        data.imgUrl = imgUrl ?? undefined; 
        data.imgKey = imgKey ?? undefined;

        await fetch(`${PAGE_URL}/api/fisk/${slug}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            })

        console.log(data)

        router.refresh();
        setIsOpen(false);

        form.reset();
        setImgUrl(null);
        setImgKey(null);
        setUploadComplete(false);

        toast({
            title: `Fangst er blevet tilføjet 🎣`
        })
    }

    const [isOpen, setIsOpen] = useState<boolean>();

    return (
        <div>
            <Dialog onOpenChange={setIsOpen} open={isOpen}>
                <DialogTrigger className="py-2 px-3 rounded bg-black text-white hover:translate-x-1 transition-all lg:text-sm text-base">{label}</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Opret fisk</DialogTitle>
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
                                                    <SelectValue placeholder="Vælg fisk" />
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
                                                    <SelectValue placeholder="Vælg lokation" />
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
                                                    <SelectValue placeholder="Vælg agn" />
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
                                                            <span className="text-black">Vælge dato</span>
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
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                                <div className="flex flex-col items-start">
                                    <UploadButton
                                    className="ut-button:bg-black"
                                      content={{
                                        button({ ready }) {
                                          if (ready) return <div>Upload billede</div>;
                                     
                                          return "Gør klar...";
                                        },
                                        allowedContent({ ready, fileTypes, isUploading }) {
                                          if (!ready) return "Checker søen ud...";
                                          if (isUploading) return "Fisken svømmer til databasen...";
                                          return `Please ikke for stor en fil...`;
                                        },
                                      }}
                                    endpoint="imageUploader"
                                    onClientUploadComplete={(res) => {
                                         if (res && res[0] && res[0].url) {
                                            setImgUrl(res[0].url);
                                            setImgKey(res[0].key);
                                            setUploadComplete(true);
                                        }
                                        }}
                                        onUploadError={(error: Error) => {
                                            alert(`ERROR! ${error.message}`);
                                            }}
                                        />
                                        {uploadComplete && <p className="mt-2 text-sm text-green-500 font-bold">Billedet er blevet uploadet</p>}
                                 </div>
                            <Button type="submit">Færdig</Button>
                        </form>
                    </Form>

                </DialogContent>
            </Dialog>
        </div>
    )
}
