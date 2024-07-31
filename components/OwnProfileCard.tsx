import { AchivementList } from "@/app/components/achivements/AchivementList";
import FiskMedals from "@/app/components/fiskeantal/FiskMedals";
import Link from "next/link"
import { FC } from "react";
import { FaArrowRight, FaEye, FaFish } from "react-icons/fa";

export const OwnProfileCard = ({data}:any) => {

    const antalFisk = data.fiskeData.length;

    const profileUrl = `fiskerne/${data._id}`;

    return (
        <div className="flex flex-col py-6 px-4 mt-2 rounded border-2 border-indigo-100 gap-3 w-full lg:w-[500px] h-[375px]">
            <div className="flex flex-col">
                <p className="font-bold text-xl lg:text-xl">{data.navn} <span className="font-normal">(dig)</span></p>
                <div>
                    <p className="text-sm">Fisk fanget:</p>
                    <div className="flex gap-2 items-center">
                        <FiskMedals count={antalFisk} />
                        <p className="text-gray-300">{antalFisk}</p>
                    </div>
                </div>
                <div>
                    <AchivementList data={data} variant={"lille"}/>
                </div>
                <div className="pt-5 text-center lg:text-left">
                    <Link href="/min-profil" className="text-white p-3 rounded text-sm bg-black">Min profil</Link>
                </div>
            </div>
        </div>
    )
}