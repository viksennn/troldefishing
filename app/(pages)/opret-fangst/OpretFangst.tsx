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
import { FiskCard } from "@/app/components/FiskCard"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

import {AnimatePresence, motion} from "framer-motion"

export const OpretFangst = () => {

    const [fiskeart, setFiskeart] = useState<string>("");
    const [lokation, setLokation] = useState<string>("");
    const [agn, setAgn] = useState<string>("");
    const [file, setFile] = useState<File | undefined>(undefined);
    const [fileUrl, setFileUrl] = useState<string | undefined>(undefined);

    const [date, setDate] = useState<Date>()

    const formattedDate = date ? format(date, "dd/MM/yyyy"): "N/A";

    const maxFileSize = 1024 * 1024 * 5; // 5MB
    
    const fiskeartOnChange = (value: string) => {
        setFiskeart(value);
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
        e.preventDefault();
        
        
    }

    return (

        <form onSubmit={handleSubmit} className="h-screen lg:h-[80vh] w-screen flex flex-col items-center justify-center gap-4 p-2">
            <p className="text-xl font-bold">Opret din nye fangst</p>
            <div className="lg:w-[700px] w-full lg:h-[500px]  border rounded-lg p-8 flex lg:flex-row flex-col gap-6 items-center drop">
                <div className="w-1/3 flex justify-center drop-shadow-md">
                    <FishTypeCard art={fiskeart} />
                </div>
                <div className="w-full lg:w-2/3 flex flex-col gap-2">
                    <div className="flex lg:flex-row flex-col lg:gap-2 items-center justify-between">
                        <p className="text-gray-500">Art: </p>
                        <Select onValueChange={fiskeartOnChange}> 
                            <SelectTrigger className="w-2/3">
                                <SelectValue className="text-gray-500 placeholder:text-gray-500" placeholder="Vælg fisk" />
                            </SelectTrigger>
                            <SelectContent className="">
                                {fiskeArterData.map((fisk) => (
                                    <SelectItem key={fisk} value={fisk} className="hover:cursor-pointer border-b my-1">
                                        <div className="flex items-center gap-8">
                                            <p className="font-bold">{fisk}</p>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex lg:flex-row flex-col lg:gap-2 items-center justify-between">
                        <p className="text-gray-500">Lokation: </p>
                        <Input className="w-2/3" placeholder="Lokation" onChange={(e) => setLokation(e.target.value)} />
                    </div>
                    <div className="flex lg:flex-row flex-col lg:gap-2 items-center justify-between">
                        <p className="text-gray-500">Fanget med: </p>
                        <Input className="w-2/3" placeholder="Lokation" onChange={(e) => setAgn(e.target.value)} />
                    </div>
                    <div className="flex lg:flex-row flex-col lg:gap-2 mt-4 items-center justify-between">
                        <p className="text-gray-500">Dato: </p>
                        <div className="flex flex-col gap-2 w-2/3">
                            <Button className="bg-indigo-500" onClick={() => setDate(new Date())}
                                type="button"
                            >
                                Fanget i dag
                            </Button>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full pl-3 text-left font-normal",
                                            !date && "text-muted-foreground"
                                        )}
                                    >
                                        {date ? (
                                            format(new Date(date), "dd-MM-yyyy")
                                        ) : (
                                            <span className="text-black">Vælge dato</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-80" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        disabled={(date) =>
                                            date > new Date() || date < new Date("1900-01-01")
                                        }
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                    <div className="flex gap-2 mt-4 items-center justify-center lg:justify-between">
                        <p className="text-gray-500"></p>
                        <div className="flex flex-col gap-2 w-2/3">
                            {!fileUrl && (
                                <label className="flex items-center justify-center rounded-lg h-40 bg-gray-200 cursor-pointer">
                                    <div className="flex gap-2 items-center">
                                        <FaFileImage />
                                        <span className="text-indigo-500">Vælg billede</span>
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                </label>
                            )}
                            {fileUrl && (
                                <>                                         
                                    <label className="cursor-pointer absolute h-40 w-[270px] items-center justify-center hover:backdrop-blur-sm transition-all">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="hidden"
                                        />
                                    </label>
                                    <motion.img
                                        src={fileUrl}
                                        alt="Billede"
                                        className="w-full h-40 object-cover rounded-lg"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    />
                                </>
                            )}
                            <div className="h-4">
                                {file && (
                                    <button 
                                            onClick={() => {
                                                setFile(undefined);
                                                setFileUrl(undefined);
                                            }}
                                            className="text-xs text-red-600 w-full"
                                        >
                                            Fjern billede
                                        </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-12 flex w-full flex-col items-center justify-center">
                <Button
                    disabled={!fiskeart || !lokation || !agn || !date}
                    type="submit"
                >
                    Opret Fangst
                </Button>
            </div>
        </form>
    )
}