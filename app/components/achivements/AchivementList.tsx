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
                    <TooltipTrigger className={`mr-2 p-2 bg-gray-100 rounded hover:cursor-help
                        
                        ${achivementData.border === "master" ? "border-2 border-animate-master" :
                        achivementData.border === "king" ? "border-2 border-animate-king" :
                        achivementData.border === "legend" ? "border-2 border-animate-legend" :
                        achivementData.border === "saint" ? "border-2 border-animate-saint" :
                        achivementData.border === "god" ? "border-2 border-animate-god" : "border"
                        }
                        
                        `}>
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
            <div className={`bg-gray-100 w-[100px] lg:w-[150px] p-2 rounded-md flex flex-col items-center gap-2
            
            ${achivementData.border === "master" ? "border-2 border-animate-master" :
                achivementData.border === "king" ? "border-2 border-animate-king" :
                achivementData.border === "legend" ? "border-2 border-animate-legend" :
                achivementData.border === "saint" ? "border-2 border-animate-saint" :
                achivementData.border === "god" ? "border-2 border-animate-god" : "border"
            }
            
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

    const [fanget2Skaller, setFanget2Skaller] = useState<boolean>(false);
    const [fanget5Skaller, setFanget5Skaller] = useState<boolean>(false);
    const [fanget10Skaller, setFanget10Skaller] = useState<boolean>(false);
    const [fanget20Skaller, setFanget20Skaller] = useState<boolean>(false);
    const [fanget30Skaller, setFanget30Skaller] = useState<boolean>(false);
    const [fanget40Skaller, setFanget40Skaller] = useState<boolean>(false);
    const [fanget50Skaller, setFanget50Skaller] = useState<boolean>(false);
    const [fanget75Skaller, setFanget75Skaller] = useState<boolean>(false);

    const [fangetNoget, setFangetNoget] = useState<boolean>(false);


    const [fangetGedde, setFangetGedde] = useState<boolean>(false);
    const [fanget2Gedder, setFanget2Gedder] = useState<boolean>(false);
    const [fanget5Gedder, setFanget5Gedder] = useState<boolean>(false);
    const [fanget10Gedder, setFanget10Gedder] = useState<boolean>(false);
    const [fanget20Gedder, setFanget20Gedder] = useState<boolean>(false);
    const [fanget30Gedder, setFanget30Gedder] = useState<boolean>(false);
    const [fanget40Gedder, setFanget40Gedder] = useState<boolean>(false);
    const [fanget50Gedder, setFanget50Gedder] = useState<boolean>(false);
    const [fanget75Gedder, setFanget75Gedder] = useState<boolean>(false);

    
    const [fangetAborre, setFangetAborre] = useState<boolean>(false);
    const [fanget2Aborre, setFanget2Aborre] = useState<boolean>(false);
    const [fanget5Aborre, setFanget5Aborre] = useState<boolean>(false);
    const [fanget10Aborre, setFanget10Aborre] = useState<boolean>(false);
    const [fanget20Aborre, setFanget20Aborre] = useState<boolean>(false);
    const [fanget30Aborre, setFanget30Aborre] = useState<boolean>(false);
    const [fanget40Aborre, setFanget40Aborre] = useState<boolean>(false);
    const [fanget50Aborre, setFanget50Aborre] = useState<boolean>(false);
    const [fanget75Aborre, setFanget75Aborre] = useState<boolean>(false);

    
    const [fangetRegnbueØrred, setFangetRegnbueØrred] = useState<boolean>(false);
    const [fanget2RegnbueØrreder, setFanget2RegnbueØrreder] = useState<boolean>(false);
    const [fanget5RegnbueØrreder, setFanget5RegnbueØrreder] = useState<boolean>(false);
    const [fanget10RegnbueØrreder, setFanget10RegnbueØrreder] = useState<boolean>(false);
    const [fanget20RegnbueØrreder, setFanget20RegnbueØrreder] = useState<boolean>(false);
    const [fanget30RegnbueØrreder, setFanget30RegnbueØrreder] = useState<boolean>(false);
    const [fanget40RegnbueØrreder, setFanget40RegnbueØrreder] = useState<boolean>(false);
    const [fanget50RegnbueØrreder, setFanget50RegnbueØrreder] = useState<boolean>(false);
    const [fanget75RegnbueØrreder, setFanget75RegnbueØrreder] = useState<boolean>(false);



    const [fangetGuldØrred, setFangetGuldØrred] = useState<boolean>(false);

    const [fangetFladfisk, setFangetFladfisk] = useState<boolean>(false);

    const [fangetNogetEksotisk, setFangetNogetEksotisk] = useState<boolean>(false);

    const [fangetBækørred, setFangetBækørred] = useState<boolean>(false);

    const [vildSø, setVildSø] = useState<boolean>(false);
    const [artHunter, setArtHunter] = useState<boolean>(false);



    useEffect(() => {
        const isFangetNoget = fiskeData.length > 0;
        if (isFangetNoget) {
            setFangetNoget(true);
        }

        const isRainbowFanget = fiskeData.some((fiskeData: any) => fiskeData.art === "Regnbue Ørred");
        if (isRainbowFanget) {
            setFangetRegnbueØrred(true);
        }

        const isGeddeFanget = fiskeData.some((fiskeData: any) => fiskeData.art === "Gedde");
        if (isGeddeFanget) {
            setFangetGedde(true);
        }

        //ACH: Fanget 2 Gedder
        const is2GedderFanget = fiskeData.filter((fiskeData: any) => fiskeData.art === "Gedde").length >= 2;
        if (is2GedderFanget) {
            setFanget2Gedder(true);
        }

        //ACH: Fanget 5 Gedder
        const is5GedderFanget = fiskeData.filter((fiskeData: any) => fiskeData.art === "Gedde").length >= 5;
        if (is5GedderFanget) {
            setFanget5Gedder(true);
        }

        //ACH: Fanget 10 Gedder
        const is10GedderFanget = fiskeData.filter((fiskeData: any) => fiskeData.art === "Gedde").length >= 10;
        if (is10GedderFanget) {
            setFanget10Gedder(true);
        }

        //ACH: Fanget 20 Gedder
        const is20GedderFanget = fiskeData.filter((fiskeData: any) => fiskeData.art === "Gedde").length >= 20;
        if (is20GedderFanget) {
            setFanget20Gedder(true);
        }

        //ACH: Fanget 30 Gedder
        const is30GedderFanget = fiskeData.filter((fiskeData: any) => fiskeData.art === "Gedde").length >= 30;
        if (is30GedderFanget) {
            setFanget30Gedder(true);
        }

        //ACH: Fanget 40 Gedder
        const is40GedderFanget = fiskeData.filter((fiskeData: any) => fiskeData.art === "Gedde").length >= 40;
        if (is40GedderFanget) {
            setFanget40Gedder(true);
        }

        //ACH: Fanget 50 Gedder
        const is50GedderFanget = fiskeData.filter((fiskeData: any) => fiskeData.art === "Gedde").length >= 50;
        if (is50GedderFanget) {
            setFanget50Gedder(true);
        }

        //ACH: Fanget 75 Gedder
        const is75GedderFanget = fiskeData.filter((fiskeData: any) => fiskeData.art === "Gedde").length >= 75;
        if (is75GedderFanget) {
            setFanget75Gedder(true);
        }

        const isMakrelFanget = fiskeData.some((fiskeData: any) => fiskeData.art === "Makrel");
        if (isMakrelFanget) {
            setFangetMakrel(true);
        }

        const isFangetGuldØrred = fiskeData.some((fiskeData: any) => fiskeData.art === "Guld Ørred");
        if (isFangetGuldØrred) {
            setFangetGuldØrred(true);
        }

        const isBækørredFanget = fiskeData.some((fiskeData: any) => fiskeData.art === "Bækørred");
        if (isBækørredFanget) {
            setFangetBækørred(true);
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

        //ACH: Fanget 2 skaller
        const is2SkallerFanget = fiskeData.filter((fiskeData: any) => fiskeData.art === "Skalle").length >= 2;
        if (is2SkallerFanget) {
            setFanget2Skaller(true);
        }

        //ACH: Fanget 5 skaller
        const is5SkallerFanget = fiskeData.filter((fiskeData: any) => fiskeData.art === "Skalle").length >= 5;
        if (is5SkallerFanget) {
            setFanget5Skaller(true);
        }

        //ACH: Fanget 10 skaller
        const is10SkallerFanget = fiskeData.filter((fiskeData: any) => fiskeData.art === "Skalle").length >= 10;
        if (is10SkallerFanget) {
            setFanget10Skaller(true);
        }

        //ACH: Fanget 20 skaller
        const is20SkallerFanget = fiskeData.filter((fiskeData: any) => fiskeData.art === "Skalle").length >= 20;
        if (is20SkallerFanget) {
            setFanget20Skaller(true);
        }

        //ACH: Fanget 30 skaller
        const is30SkallerFanget = fiskeData.filter((fiskeData: any) => fiskeData.art === "Skalle").length >= 30;
        if (is30SkallerFanget) {
            setFanget30Skaller(true);
        }

        //ACH: Fanget 40 skaller
        const is40SkallerFanget = fiskeData.filter((fiskeData: any) => fiskeData.art === "Skalle").length >= 40;
        if (is40SkallerFanget) {
            setFanget40Skaller(true);
        }

        //ACH: Fanget 50 skaller
        const is50SkallerFanget = fiskeData.filter((fiskeData: any) => fiskeData.art === "Skalle").length >= 50;
        if (is50SkallerFanget) {
            setFanget50Skaller(true);
        }

        //ACH: Fanget 75 skaller
        const is75SkallerFanget = fiskeData.filter((fiskeData: any) => fiskeData.art === "Skalle").length >= 75;
        if (is75SkallerFanget) {
            setFanget75Skaller(true);
        }

        //ACH: Fanget 2 Aborre
        const is2AborreFanget = fiskeData.filter((fiskeData: any) => fiskeData.art === "Aborre").length >= 2;
        if (is2AborreFanget) {
            setFanget2Aborre(true);
        }

        //ACH: Fanget 5 Aborre
        const is5AborreFanget = fiskeData.filter((fiskeData: any) => fiskeData.art === "Aborre").length >= 5;
        if (is5AborreFanget) {
            setFanget5Aborre(true);
        }

        //ACH: Fanget 10 Aborre
        const is10AborreFanget = fiskeData.filter((fiskeData: any) => fiskeData.art === "Aborre").length >= 10;
        if (is10AborreFanget) {
            setFanget10Aborre(true);
        }

        //ACH: Fanget 20 Aborre
        const is20AborreFanget = fiskeData.filter((fiskeData: any) => fiskeData.art === "Aborre").length >= 20;
        if (is20AborreFanget) {
            setFanget20Aborre(true);
        }

        //ACH: Fanget 30 Aborre
        const is30AborreFanget = fiskeData.filter((fiskeData: any) => fiskeData.art === "Aborre").length >= 30;
        if (is30AborreFanget) {
            setFanget30Aborre(true);
        }

        //ACH: Fanget 40 Aborre
        const is40AborreFanget = fiskeData.filter((fiskeData: any) => fiskeData.art === "Aborre").length >= 40;
        if (is40AborreFanget) {
            setFanget40Aborre(true);
        }

        //ACH: Fanget 50 Aborre
        const is50AborreFanget = fiskeData.filter((fiskeData: any) => fiskeData.art === "Aborre").length >= 50;
        if (is50AborreFanget) {
            setFanget50Aborre(true);
        }

        //ACH: Fanget 75 Aborre
        const is75AborreFanget = fiskeData.filter((fiskeData: any) => fiskeData.art === "Aborre").length >= 75;
        if (is75AborreFanget) {
            setFanget75Aborre(true);
        }

        //ACH: Fanget 2 regnbueørreder
        const is2RainbowFanget = fiskeData.filter((fiskeData: any) => fiskeData.art === "Regnbue Ørred").length >= 2;
        if (is2RainbowFanget) {
            setFanget2RegnbueØrreder(true);
        }

        //ACH: Fanget 5 regnbueørreder
        const is5RainbowFanget = fiskeData.filter((fiskeData: any) => fiskeData.art === "Regnbue Ørred").length >= 5;
        if (is5RainbowFanget) {
            setFanget5RegnbueØrreder(true);
        }

        //ACH: Fanget 10 regnbueørreder
        const is10RainbowFanget = fiskeData.filter((fiskeData: any) => fiskeData.art === "Regnbue Ørred").length >= 10;
        if (is10RainbowFanget) {
            setFanget10RegnbueØrreder(true);
        }

        //ACH: Fanget 20 regnbueørreder
        const is20RainbowFanget = fiskeData.filter((fiskeData: any) => fiskeData.art === "Regnbue Ørred").length >= 20;
        if (is20RainbowFanget) {
            setFanget20RegnbueØrreder(true);
        }

        //ACH: Fanget 30 regnbueørreder
        const is30RainbowFanget = fiskeData.filter((fiskeData: any) => fiskeData.art === "Regnbue Ørred").length >= 30;
        if (is30RainbowFanget) {
            setFanget30RegnbueØrreder(true);
        }

        //ACH: Fanget 40 regnbueørreder
        const is40RainbowFanget = fiskeData.filter((fiskeData: any) => fiskeData.art === "Regnbue Ørred").length >= 40;
        if (is40RainbowFanget) {
            setFanget40RegnbueØrreder(true);
        }

        //ACH: Fanget 50 regnbueørreder
        const is50RainbowFanget = fiskeData.filter((fiskeData: any) => fiskeData.art === "Regnbue Ørred").length >= 50;
        if (is50RainbowFanget) {
            setFanget50RegnbueØrreder(true);
        }

        //ACH: Fanget 75 regnbueørreder
        const is75RainbowFanget = fiskeData.filter((fiskeData: any) => fiskeData.art === "Regnbue Ørred").length >= 75;
        if (is75RainbowFanget) {
            setFanget75RegnbueØrreder(true);
        }

        const isFladfiskFanget = fiskeData.some((fiskeData: any) => fiskeData.art === "Rødspætte" || fiskeData.art === "Skrubbe");
        if (isFladfiskFanget) {
            setFangetFladfisk(true);
        }

        // ACH: Fanget fem FORSKELLIGE arter, så ikke den samme men fem forskellige:




        const isNogetEksotiskFanget = fiskeData.some((fisk: any) => 
            fisk.art !== "Regnbue Ørred" &&
            fisk.art !== "Bækørred" &&
            fisk.art !== "Gedde" &&
            fisk.art !== "Aborre" &&
            fisk.art !== "Skalle" &&
            fisk.art !== "Hornfisk" &&
            fisk.art !== "Makrel" &&
            fisk.art !== "Rødspætte" &&
            fisk.art !== "Skrubbe"
        );
        
        if (isNogetEksotiskFanget) {
            setFangetNogetEksotisk(true);
        }

        // ACH: Vild sø (SKAL ÆNDRES)
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
            border: "master"
        }),
        fanget75RegnbueØrreder && generateTooltip({
            label: "Fanget 75 Regnbue Ørreder", title: "Regnbue Ørred God", src: "/ach/rbørred_god.png",
            variant: achdata.variant,
            border: "god"
        }),
        !fanget75RegnbueØrreder && fanget50RegnbueØrreder && generateTooltip({
            label: "Fanget 50 Regnbue Ørreder", title: "Regnbue Ørred Saint", src: "/ach/rbørred_saint.png",
            variant: achdata.variant,
            border: "saint"
        }),
        !fanget50RegnbueØrreder && fanget40RegnbueØrreder && generateTooltip({
            label: "Fanget 40 Regnbue Ørreder", title: "Regnbue Ørred Legend", src: "/ach/rbørred_legend.png",
            variant: achdata.variant,
            border: "legend"
        }),
        !fanget40RegnbueØrreder && fanget30RegnbueØrreder && generateTooltip({
            label: "Fanget 30 Regnbue Ørreder", title: "Regnbue Ørred King", src: "/ach/rbørred_king.png",
            variant: achdata.variant,
            border: "king"
        }),
        !fanget30RegnbueØrreder && fanget20RegnbueØrreder && generateTooltip({
            label: "Fanget 20 Regnbue Ørreder", title: "Regnbue Ørred Master", src: "/ach/rbørred_master.png",
            variant: achdata.variant,
            border: "master"
        }),
        !fanget20RegnbueØrreder && fanget10RegnbueØrreder && generateTooltip({
            label: "Fanget 10 Regnbue Ørreder", title: "Regnbue Ørred Pro", src: "/ach/rbørred_pro.png",
            variant: achdata.variant,
            border: ""
        }),
        !fanget10RegnbueØrreder && fanget5RegnbueØrreder && generateTooltip({
            label: "Fanget 5 Regnbue Ørreder", title: "Regnbue Ørred Semi-pro", src: "/ach/rbørred_semi.png",
            variant: achdata.variant,
            border: ""
        }),
        !fanget5RegnbueØrreder && fanget2RegnbueØrreder && generateTooltip({
            label: "Fanget 2 Regnbue Ørreder", title: "Regnbue Ørred Amateur", src: "/ach/rbørred_ama.png",
            variant: achdata.variant,
            border: ""
        }),
        !fanget2RegnbueØrreder && fangetRegnbueØrred && generateTooltip({
            label: "Fanget sin første Regnbue Ørred", title: "", src: "/ach/rainbow-trout.png",
            variant: achdata.variant,
            border: ""
        }),
        fangetNogetEksotisk && generateTooltip({
            label: "Fanget en eksotisk fisk", title: "Eksotisk Fisker", src: "/ach/eksotisk.png",
            variant: achdata.variant,
            border: ""
        }),
        fangetBækørred && generateTooltip({
            label: "Fanget sin første Bækørred", title: "", src: "/ach/browntrout.png",
            variant: achdata.variant,
            border: ""
        }),
        fangetGuldØrred && generateTooltip({
            label: "Fanget sin første Guld Ørred", title: "", src: "/ach/golden-trout.png",
            variant: achdata.variant,
            border: ""
        }),
        fangetFladfisk && generateTooltip({
            label: "Fanget sin første Fladfisk", title: "", src: "/ach/fladfisk.png",
            variant: achdata.variant,
            border: ""
        }),
        fanget75Aborre && generateTooltip({
            label: "Fanget 75 Aborre", title: "Aborre God", src: "/ach/aborre_god.png",
            variant: achdata.variant,
            border: "god"
        }),
        !fanget75Aborre && fanget50Aborre && generateTooltip({
            label: "Fanget 50 Aborre", title: "Aborre Saint", src: "/ach/aborre_saint.png",
            variant: achdata.variant,
            border: "saint"
        }),
        !fanget50Aborre && fanget40Aborre && generateTooltip({
            label: "Fanget 40 Aborre", title: "Aborre Legend", src: "/ach/aborre_legend.png",
            variant: achdata.variant,
            border: "legend"
        }),
        !fanget40Aborre && fanget30Aborre && generateTooltip({
            label: "Fanget 30 Aborre", title: "Aborre King", src: "/ach/aborre_king.png",
            variant: achdata.variant,
            border: "king"
        }),
        !fanget30Aborre && fanget20Aborre && generateTooltip({
            label: "Fanget 20 Aborre", title: "Aborre Master", src: "/ach/aborre_master.png",
            variant: achdata.variant,
            border: "master"
        }),
        !fanget20Aborre && fanget10Aborre && generateTooltip({
            label: "Fanget 10 Aborre", title: "Aborre Pro", src: "/ach/aborre_pro.png",
            variant: achdata.variant,
            border: ""
        }),
        !fanget10Aborre && fanget5Aborre && generateTooltip({
            label: "Fanget 5 Aborre", title: "Aborre Semi-pro", src: "/ach/aborre_semi.png",
            variant: achdata.variant,
            border: ""
        }),
        !fanget5Aborre && fanget2Aborre && generateTooltip({
            label: "Fanget 2 Aborre", title: "Aborre Amateur", src: "/ach/aborre_ama.png",
            variant: achdata.variant,
            border: ""
        }),
        !fanget2Aborre && fangetAborre && generateTooltip({
            label: "Fanget sin første Aborre", title: "", src: "/ach/aborre.png",
            variant: achdata.variant,
            border: ""
        }),
        fanget75Gedder && generateTooltip({
            label: "Fanget 75 Gedder", title: "Gedde God", src: "/ach/pike_god.png",
            variant: achdata.variant,
            border: "god"
        }),
        !fanget75Gedder && fanget50Gedder && generateTooltip({
            label: "Fanget 50 Gedder", title: "Gedde Saint", src: "/ach/pike_saint.png",
            variant: achdata.variant,
            border: "saint"
        }),
        !fanget50Gedder && fanget40Gedder && generateTooltip({
            label: "Fanget 40 Gedder", title: "Gedde Legend", src: "/ach/pike_legend.png",
            variant: achdata.variant,
            border: "legend"
        }),
        !fanget40Gedder && fanget30Gedder && generateTooltip({
            label: "Fanget 30 Gedder", title: "Gedde King", src: "/ach/pike_king.png",
            variant: achdata.variant,
            border: "king"
        }),
        !fanget30Gedder && fanget20Gedder && generateTooltip({
            label: "Fanget 20 Gedder", title: "Gedde Master", src: "/ach/pike_master.png",
            variant: achdata.variant,
            border: "master"
        }),
        !fanget20Gedder && fanget10Gedder && generateTooltip({
            label: "Fanget 10 Gedder", title: "Gedde Pro", src: "/ach/pike_pro.png",
            variant: achdata.variant,
            border: ""
        }),
        !fanget10Gedder && fanget5Gedder && generateTooltip({
            label: "Fanget 5 Gedder", title: "Gedde Semi-pro", src: "/ach/pike_semi.png",
            variant: achdata.variant,
            border: ""
        }),
        !fanget5Gedder && fanget2Gedder && generateTooltip({
            label: "Fanget 2 Gedder", title: "Gedde Amateur", src: "/ach/pike_ama.png",
            variant: achdata.variant,
            border: ""
        }),
        !fanget2Gedder && fangetGedde && generateTooltip({
            label: "Fanget sin første Gedde", title: "", src: "/ach/pike.png",
            variant: achdata.variant,
            border: ""
        }),
        fanget75Skaller && generateTooltip({
            label: "Fanget 75 Skaller", title: "Skalle God", src: "/ach/skalle_god.png",
            variant: achdata.variant,
            border: "god"
        }),
        !fanget75Skaller && fanget50Skaller && generateTooltip({
            label: "Fanget 50 Skaller", title: "Skalle Saint", src: "/ach/skalle_saint.png",
            variant: achdata.variant,
            border: "saint"
        }),
        !fanget50Skaller && fanget40Skaller && generateTooltip({
            label: "Fanget 40 Skaller", title: "Skalle Legend", src: "/ach/skalle_legend.png",
            variant: achdata.variant,
            border: "legend"
        }),
        !fanget40Skaller && fanget30Skaller && generateTooltip({
            label: "Fanget 30 Skaller", title: "Skalle King", src: "/ach/skalle_king.png",
            variant: achdata.variant,
            border: "king"
        }),
        !fanget30Skaller && fanget20Skaller && generateTooltip({
            label: "Fanget 20 Skaller", title: "Skalle Master", src: "/ach/skalle_master.png",
            variant: achdata.variant,
            border: "master"
        }),
        !fanget20Skaller && fanget10Skaller && generateTooltip({
            label: "Fanget 10 Skaller", title: "Skalle Pro", src: "/ach/skalle_pro.png",
            variant: achdata.variant,
            border: ""
        }),
        !fanget10Skaller && fanget5Skaller && generateTooltip({
            label: "Fanget 5 Skaller", title: "Skalle Semi-pro", src: "/ach/skalle_semi.png",
            variant: achdata.variant,
            border: ""
        }),
        !fanget5Skaller && fanget2Skaller && generateTooltip({
            label: "Fanget 2 Skaller", title: "Skalle Amateur", src: "/ach/skalle_ama.png",
            variant: achdata.variant,
            border: ""
        }),
        !fanget2Skaller && fangetSkalle && generateTooltip({
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
            <CollapsibleAchievements achievements={allAchievements} gapSize={gapSize} achdata={achdata} />
        );
    } else if (fiskeData.length <= 0 && achdata.variant === "stor") {
        return (
            <div>
                <p className="text-gray-600 text-sm">Ingen achivements... endnu...</p>
            </div>
        )
    }
};

const CollapsibleAchievements = ({ achievements, gapSize, achdata }: { achievements: React.ReactNode[], gapSize: number, achdata: any }) => {
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
        {isSmallScreen && achievements.length > 3 &&  achdata.variant === "stor" && (
                <button
                    className="mt-2 text-blue-500 flex items-center gap-1 bg-gray-200 py-2 px-5 rounded"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {isExpanded ? <IoClose size={25} /> : <FaSort size={15}/> }
                    {isExpanded ? "Vis færre" : "Vis flere"}
                </button>
        )}
        {isSmallScreen && achievements.length > 3 &&  achdata.variant === "lille" && ( 
            <div className="w-full text-center">
                <button
                    className="mt-2 text-blue-500 flex items-center gap-1 bg-gray-200 py-1 px-2 text-sm rounded"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                {isExpanded ? <IoClose size={25} /> : <FaSort size={15}/> }
                {isExpanded ? "Vis færre" : "Vis flere"}
            </button>
            </div>
        )}
        </div>
    );
};
