import Link from "next/link"
import { FC } from "react";
import { FaArrowRight, FaEye, FaFish } from "react-icons/fa";
import { AchivementList } from "./achivements/AchivementList";
import FiskMedals from "./fiskeantal/FiskMedals";
import { Avatar } from "@/components/Avatar";

export const ProfileCard = ({data}:any) => {

    const antalFisk = data.fiskeData.length;

    const profileUrl = `fiskerne/${data._id}`;

    return (
        <div className="flex flex-col py-6 px-4 mt-2 rounded border gap-3 w-full lg:w-[500px] h-[375px]">
            <div className="flex flex-col">
                <div className="flex gap-2 items-center mb-2">
                    <Avatar profilImgUrl={data.profilImgUrl} size={12}/>
                    <p className="text-xl lg:text-xl">{data.navn}</p>
                </div>
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
            </div>
            <div className="pt-5 text-center lg:text-left">
                <Link className="text-white p-3 rounded text-sm bg-black" href={profileUrl}>Se fangster</Link>
            </div>
        </div>
    )
}