"use client"

import React, { useState, useEffect } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { IFisher } from "@/types/IFisher";

// En funktion til at generere tooltip-komponenter baseret på achivement-data
const generateTooltip = (achivementData: { label: string, src: string, title:string }) => {
    return (
        <TooltipProvider key={achivementData.label}>
            <Tooltip>
                <TooltipTrigger className="py-2 pr-4">
                    <img draggable={false} src={achivementData.src} width={40} alt={achivementData.label} />
                </TooltipTrigger>
                <TooltipContent>
                    <div className="flex flex-col gap-1 justify-center items-center">
                        <p className="font-bold">{achivementData.title}</p>
                        <p>{achivementData.label}</p>
                    </div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export const AchivementList = ({ data }: any) => {

    const fiskeData = data.fiskeData;

    const [fangetNoget, setFangetNoget] = useState<boolean>(false);
    const [fangetØrred, setFangetØrred] = useState<boolean>(false);
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


    }, [fiskeData]);

    return (
        <>
            {fangetNoget && (
                <div className="mt-5">
                    <p>Achivements:</p>
                <div>
                    
                    {fanget10Ørreder && generateTooltip({ label: "Fanget 10 Ørreder", title: "Ørred Master", src: "/ach/rainbow-trout10.png" })}
                    {fanget5Ørreder && generateTooltip({ label: "Fanget 5 Ørreder", title: "Ørred Pro", src: "/ach/rainbow-trout5.png" })}
                    {fangetGedde && generateTooltip({ label: "Fanget en Gedde", title: "", src: "/ach/pike.png" })}
                    {fangetØrred && generateTooltip({ label: "Fanget en Ørred", title: "", src: "/ach/rainbow-trout.png" })}
                    {fangetNoget && generateTooltip({ label: "Første fangst", title: "Officiel Fisker", src: "/ach/fishing-rod.png" })}
                </div>
                </div>
            )}  
        </>
    );
};
