"use client"

import React, { useState, useEffect } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { IFisher } from "@/types/IFisher";
import { FaCross, FaSort, FaSortDown, FaSortUp } from "react-icons/fa6";
import { FaSortAlphaUp, FaSortAlphaUpAlt, FaSortAmountUp, FaSortAmountUpAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

// En funktion til at generere tooltip-komponenter baseret på achivement-data
const generateTooltip = (achivementData: { label: string, src: string, title: string, variant: string, border: string }) => {

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
            <div className={`bg-gray-100 w-[120px] lg:w-[150px] p-2 rounded-md flex flex-col items-center gap-2
            
            ${achivementData.border === "pro" ? "border-2 border-animate duration-7000 ease-in-out" : "border"}
            
            `}>
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

export const AchivementList = (achdata: { data: any, variant: string }) => {
    const fiskeData = achdata.data.fiskeData;

    const [gapSize, setGapSize] = useState<number>(0);
    const [fangetHornfisk, setFangetHornfisk] = useState<boolean>(false);
    const [fangetMakrel, setFangetMakrel] = useState<boolean>(false);
    const [fangetSkalle, setFangetSkalle] = useState<boolean>(false);
    const [fangetNoget, setFangetNoget] = useState<boolean>(false);
    const [fangetØrred, setFangetØrred] = useState<boolean>(false);
    const [fangetAborre, setFangetAborre] = useState<boolean>(false);
    const [fangetGedde, setFangetGedde] = useState<boolean>(false);
    const [fanget5Ørreder, setFanget5Ørreder] = useState<boolean>(false);
    const [fanget10Ørreder, setFanget10Ørreder] = useState<boolean>(false);
    const [vildSø, setVildSø] = useState<boolean>(false);

    useEffect(() => {
        const isFangetNoget = fiskeData.length > 0;
        if (isFangetNoget) {
            setFangetNoget(true);
        }

        const isRainbowFanget = fiskeData.some((fiskeData: any) => fiskeData.art === "Regnbue Ørred");
        if (isRainbowFanget) {
            setFangetØrred(true);
        }

        const isGeddeFanget = fiskeData.some((fiskeData: any) => fiskeData.art === "Gedde");
        if (isGeddeFanget) {
            setFangetGedde(true);
        }

        const isMakrelFanget = fiskeData.some((fiskeData: any) => fiskeData.art === "Makrel");
        if (isMakrelFanget) {
            setFangetMakrel(true);
        }

        //ACH: Fanget en aborre
        const isAborreFanget = fiskeData.some((fiskeData: any) => fiskeData.art === "Aborre");
        if (isAborreFanget) {
            setFangetAborre(true);
        }

        //ACH: Fanget en Hornfisk
        const isHornfiskFanget = fiskeData.some((fiskeData: any) => fiskeData.art === "Hornfisk");
        if (isHornfiskFanget) {
            setFangetHornfisk(true);
        }

        //ACH: Fanget en Skalle
        const isSkalleFanget = fiskeData.some((fiskeData: any) => fiskeData.art === "Skalle");
        if (isSkalleFanget) {
            setFangetSkalle(true);
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

        // ACH: Vild sø
        const isVildsø = fiskeData.some((data: any) => data.art === "Gedde") &&
                        fiskeData.some((data: any) => data.art === "Aborre") &&
                        fiskeData.some((data: any) => data.art === "Skalle");

        if (isVildsø) {
            setVildSø(true);
        }


        if (achdata.variant === "lille") {
            setGapSize(2);
        } else if (achdata.variant === "stor") {
            setGapSize(16);
        }

    }, [fiskeData, gapSize]);

    const allAchievements = [
        vildSø && generateTooltip({
            label: "Fanget de 3 arter fra en vild sø", title: "Vild Sø", src: "/ach/vildsoe.png",
            variant: achdata.variant,
            border: "pro"
        }),
        fanget10Ørreder && generateTooltip({
            label: "Fanget 10 Regnbue Ørreder", title: "Ørred Master", src: "/ach/rainbow-trout10.png",
            variant: achdata.variant,
            border: ""
        }),
        fanget5Ørreder && generateTooltip({
            label: "Fanget 5 Regnbue Ørreder", title: "Ørred Pro", src: "/ach/rainbow-trout5.png",
            variant: achdata.variant,
            border: "pro"
        }),
        fangetAborre && generateTooltip({
            label: "Fanget sin første Aborre", title: "", src: "/ach/aborre.png",
            variant: achdata.variant,
            border: ""
        }),
        fangetGedde && generateTooltip({
            label: "Fanget sin første Gedde", title: "", src: "/ach/pike.png",
            variant: achdata.variant,
            border: ""
        }),
        fangetØrred && generateTooltip({
            label: "Fanget sin første Ørred", title: "", src: "/ach/rainbow-trout.png",
            variant: achdata.variant,
            border: ""
        }),
        fangetSkalle && generateTooltip({
            label: "Fanget sin første Skalle", title: "", src: "/ach/skalle.png",
            variant: achdata.variant,
            border: ""
        }),
        fangetHornfisk && generateTooltip({
            label: "Fanget sin første Hornfisk", title: "", src: "/ach/hornfisk.png",
            variant: achdata.variant,
            border: ""
        }),
        fangetMakrel && generateTooltip({
            label: "Fanget sin første Makrel", title: "", src: "/ach/makrel.png",
            variant: achdata.variant,
            border: ""
        }),
        fangetNoget && generateTooltip({
            label: "Første fangst", title: "Officiel Fisker", src: "/ach/fishing-rod.png",
            variant: achdata.variant,
            border: ""
        }),
    ].filter(Boolean);

    if (fiskeData.length > 0) {
        return (
            <CollapsibleAchievements achievements={allAchievements} gapSize={gapSize} />
        );
    } else if (fiskeData.length <= 0 && achdata.variant === "stor") {
        return (
            <div>
                <p className="text-gray-600 text-sm">Ingen achivements... endnu...</p>
            </div>
        )
    }
};

const CollapsibleAchievements = ({ achievements, gapSize }: { achievements: React.ReactNode[], gapSize: number }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        const handleResize = () => setIsSmallScreen(mediaQuery.matches);

        handleResize();
        mediaQuery.addEventListener('change', handleResize);

        return () => {
            mediaQuery.removeEventListener('change', handleResize);
        };
    }, []);

    const visibleAchievements = isSmallScreen && !isExpanded ? achievements.slice(0, 3) : achievements;

    return (
        <div className="">
            <div className={`w-full flex flex-wrap mt-5 gap-2 lg:gap-${gapSize}`}>
                {visibleAchievements}
            </div>
            {isSmallScreen && achievements.length > 3 && (
                <button
                    className="mt-2 text-blue-500 flex items-center gap-1 bg-gray-200 py-2 px-5 rounded"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {isExpanded ? <IoClose size={25} /> : <FaSort size={15}/> }
                    {isExpanded ? "Vis færre" : "Vis flere"}
                </button>
            )}
        </div>
    );
};

