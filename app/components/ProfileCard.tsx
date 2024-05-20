import Link from "next/link"
import { FC } from "react";
import { FaArrowRight, FaEye, FaFish } from "react-icons/fa";
import { AchivementList } from "./achivements/AchivementList";

export const ProfileCard = ({data}:any) => {

    const antalFisk = data.fiskeData.length;
    const fiskArray = Array.from({ length: antalFisk }, (_, index) => (
        <span key={index} className="text-blue-500"><FaFish className="w-6 h-6 lg:w-5 lg:h-5" /></span>
      ));

    const profileUrl = `fiskerne/${data._id}`;

    return (
        <div className="flex flex-col py-6 px-4 mt-2 rounded border gap-3 w-full lg:w-[500px]">
            <div className="flex flex-col">
                <p className="font-bold text-xl lg:text-lg">{data.navn}</p>
                <div>
                    <p>Fisk fanget:</p>
                    <div className="flex gap-2 items-center">
                        {fiskArray}
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