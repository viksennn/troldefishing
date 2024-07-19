"use client"

import { fiskeArterData } from "@/app/data/fiskefangst"
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent, SelectGroup, SelectLabel } from "@/components/ui/select"
import { useState } from "react"
import { FishTypeCard } from "../../components/achivements/FishTypeCard"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"

import { format, addDays } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react"
import { Label } from "@/components/ui/label"
import { FaFileImage } from "react-icons/fa6"
import { toast } from "@/components/ui/use-toast"

export const OpretFangst = () => {

    const [fiskeart, setFiskeart] = useState<string>("");
    const [lokation, setLokation] = useState<string>("");
    const [agn, setAgn] = useState<string>("");
    const [file, setFile] = useState<File | undefined>(undefined);
    const [fileUrl, setFileUrl] = useState<string | undefined>(undefined);

    const [date, setDate] = useState<Date>()

    const maxFileSize = 1024 * 1024 * 5; // 5MB
    
    const fiskeartOnChange = (value: string) => {
        setFiskeart(value);
        console.log(value);
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        setFile(file)

        if (file && file.size > maxFileSize) {
            toast({
                variant: "destructive",
                title: "Fejl ved upload af billede",
                description: "Filen er for stor. Maks 5MB!",
            })
            setFile(undefined);
            setFileUrl(undefined);

            return null;
        }

        if (fileUrl) {
            URL.revokeObjectURL(fileUrl)
        }
        
        if (file) {
            const url = URL.createObjectURL(file)
            setFileUrl(url)
        } else {
            setFileUrl(undefined)
        }
        
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        return null;   
    }

    return (
        <form className="w-full mt-12 flex items-center">
            <div className="flex flex-col w-1/2 m-5">
                <div className="w-1/2">
                    <div className="mb-4 w-full">
                        <p className="text-sm mb-2">Hvad er det for en fisk?</p>
                        <Select onValueChange={fiskeartOnChange}> 
                            <SelectTrigger>
                                <SelectValue placeholder="Vælg fisk" />
                            </SelectTrigger>
                            <SelectContent className="overflow-y-auto">
                                {fiskeArterData.map((fisk) => (
                                    <SelectItem key={fisk} value={fisk} className="hover:cursor-pointer border-b my-1">
                                        <div className="flex items-center gap-8">
                                            <FishTypeCard art={fisk} className={"h-16"}/>
                                            <p className="font-bold">{fisk}</p>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="mb-4 w-full">
                        <p className="text-sm mb-2">Hvor har du fanget den?</p>
                        <Input type="text" placeholder="Lokation"/>
                    </div>
                    <div className="mb-4 w-full">
                        <p className="text-sm mb-2">Hvad fangede du den med?</p>
                        <Input type="text" placeholder="Agn" />
                    </div>
                </div>
                <div className="w-1/2">
                    <div className="flex items-center flex-col mb-4">
                        <p className="text-sm mb-2">Vælg dato</p>
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="rounded-md border mx-4"
                        />
                    </div>
                </div>
            </div>
            <div className="w-1/2 flex items-center justify-center flex-col">
                    {!fileUrl && !file && (
                    <>
                        <p className="text-sm mb-2">Vælg billede</p>
                        <div className="flex">
                            <Label htmlFor="picture" className=" bg-black p-6 rounded-md hover:cursor-pointer"><FaFileImage size={35} className="text-white"/></Label>
                            <Input id="picture" type="file" onChange={handleImageChange} className="hidden" accept="image/jpeg,image/jpg,image/png,image/webp,image/gif,video/mp4,video/webm" />
                        </div>
                    </>
                    )}
                    {fileUrl && file && (
                    <div className="flex flex-col items-center">
                        <img src={fileUrl} alt={file.name} className="w-[500px] object-cover rounded-lg" />
                        <Button onClick={() => {
                            setFile(undefined)
                            setFileUrl(undefined)
                        }} variant="destructive" className="mt-2">Fjern billede</Button>
                    </div>
                    )}
            </div>
        </form>
    )

}