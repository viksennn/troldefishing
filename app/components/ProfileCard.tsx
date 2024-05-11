import Link from "next/link"
import { FC } from "react";
import { FaArrowRight, FaFish } from "react-icons/fa";

export const ProfileCard = ({data}:any) => {

    const antalFisk = data.fiskeData.length;
    const fiskArray = Array.from({ length: antalFisk }, (_, index) => (
        <span key={index} className="text-blue-500"><FaFish className="w-6 h-6 lg:w-5 lg:h-5" /></span>
      ));

    const profileUrl = `fiskerne/${data._id}`;

    return (
        <div className="flex p-4 mt-2 rounded border gap-3 w-full justify-between items-center">
            <div className="flex flex-col">
                <p className="font-bold text-xl lg:text-base">{data.navn}</p>
                <div className="flex gap-2">
                    {fiskArray}
                </div>
            </div>
            <div>
                <Link className="text-gray-600 text-sm" href={profileUrl}><FaArrowRight className="p-1 w-10 h-10 lg:w-7 lg:h-7 text-gray-500 hover:text-black transition-colors"/></Link>
            </div>
        </div>
    )
}