"use client"

import React, { useState, useEffect } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { IFisher } from "@/types/IFisher";

// En funktion til at generere tooltip-komponenter baseret på achivement-data
const generateTooltip = (achivementData: { label: string, src: string, title:string, variant:string }) => {
    
    if (achivementData.variant === "lille") {
    
    return (
        <TooltipProvider key={achivementData.label}>
            <Tooltip>
                <TooltipTrigger className="mr-2 p-2 bg-gray-100 rounded hover:cursor-help">
                    <img draggable={false} src={achivementData.src} width={50} alt={achivementData.label} />
                </TooltipTrigger>
                <TooltipContent>
                    <div className="flex flex-col gap-1 justify-center items-center">
                        <p className="font-bold">{achivementData.title}</p>
                        <p className="mb-1">{achivementData.label}</p>
                    </div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );

    } else if (achivementData.variant === "stor") {
        return (
            <div className="bg-gray-100 w-[120px] lg:w-[150px] p-2 rounded-md flex flex-col items-center gap-2 border">
                <img draggable={false} src={achivementData.src} className="h-[70px] lg:h-[100px]" alt={achivementData.label} />
                <div className="flex flex-col items-center text-center">
                    <p className="font-bold text-xs lg:text-base">{achivementData.title}</p>
                    <p className="text-xs lg:text-base">{achivementData.label}</p>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <p>ERROR</p>
            </div>
        )
    
    }

};

export const AchivementList = (achdata: { data:any, variant:string }) => {

    const fiskeData = achdata.data.fiskeData;

    const [gapSize, setGapSize] = useState<number>(0);

    const [fangetNoget, setFangetNoget] = useState<boolean>(false);
    const [fangetØrred, setFangetØrred] = useState<boolean>(false);
    const [fangetAborre, setFangetAborre] = useState<boolean>(false);
    const [fangetGedde, setFangetGedde] = useState<boolean>(false);
    const [fanget5Ørreder, setFanget5Ørreder] = useState<boolean>(false);
    const [fanget10Ørreder, setFanget10Ørreder] = useState<boolean>(false);

    useEffect(() => {
        
        // har man overhovedetr fanget noget endnu
        const isFangetNoget = fiskeData.length > 0;

        if (isFangetNoget) {
            setFangetNoget(true);
        }

        // ACH: Fanget en Regnbue Ørred
        const isRainbowFanget = fiskeData.some((fiskeData: any) => fiskeData.art === "Regnbue Ørred");
        if (isRainbowFanget) {
            setFangetØrred(true);
        }

        //ACH: Fanget en Gedde
        const isGeddeFanget = fiskeData.some((fiskeData: any) => fiskeData.art === "Gedde");
        if (isGeddeFanget) {
            setFangetGedde(true);
        }

        //ACH: Fanget en aborre
        const isAborreFanget = fiskeData.some((fiskeData: any) => fiskeData.art === "Aborre");
        if (isAborreFanget) {
            setFangetAborre(true);
        }

        //ACH: Fanget 5 regnbueørreder
        const is5RainbowFanget = fiskeData.filter((fiskeData: any) => fiskeData.art === "Regnbue Ørred").length >= 5;
        if (is5RainbowFanget) {
            setFanget5Ørreder(true);
        }

        //ACH: Fanget 10 regnbueørreder
        const is10RainbowFanget = fiskeData.filter((fiskeData: any) => fiskeData.art === "Regnbue Ørred").length >= 10;
        if (is10RainbowFanget) {
            setFanget10Ørreder(true);
        }

        if (achdata.variant === "lille") {
            setGapSize(2);
        } else if (achdata.variant === "stor") {
            setGapSize(16);
        }


    }, [fiskeData, gapSize]);

    if (fiskeData.length > 0) {
        return (
            <>
                {fangetNoget && (
                    <div className={`flex mt-5 gap-2 lg:gap-${gapSize}`}>
                        {fanget10Ørreder && generateTooltip({
                            label: "Fanget 10 Ørreder", title: "Ørred Master", src: "/ach/rainbow-trout10.png",
                            variant: achdata.variant
                        })}
                        {fanget5Ørreder && generateTooltip({
                            label: "Fanget 5 Ørreder", title: "Ørred Pro", src: "/ach/rainbow-trout5.png",
                            variant: achdata.variant
                        })}
                        {fangetAborre && generateTooltip({
                            label: "Fanget sin første Aborre", title: "", src: "/ach/aborre.png",
                            variant: achdata.variant
                        })
                        }
                        {fangetGedde && generateTooltip({
                            label: "Fanget sin første Gedde", title: "", src: "/ach/pike.png",
                            variant: achdata.variant
                        })}
                        {fangetØrred && generateTooltip({
                            label: "Fanget sin første Ørred", title: "", src: "/ach/rainbow-trout.png",
                            variant: achdata.variant
                        })}
                        {fangetNoget && generateTooltip({
                            label: "Første fangst", title: "Officiel Fisker", src: "/ach/fishing-rod.png",
                            variant: achdata.variant
                        })}
                    </div>
                )}  
            </>
        );
    } else if (fiskeData.length <= 0 && achdata.variant === "stor") {
        return (
            <div>
                <p className="text-gray-600 text-sm">Ingen achivements... endnu...</p>
            </div>
        )
    }
};
