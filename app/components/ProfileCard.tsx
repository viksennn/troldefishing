import Link from "next/link"
import { FC } from "react";
import { FaArrowRight, FaFish } from "react-icons/fa";

export const ProfileCard = ({data}:any) => {

    const antalFisk = data.fiskeData.length;
    const fiskArray = Array.from({ length: antalFisk }, (_, index) => (
        <span key={index} className="text-blue-500"><FaFish /></span>
      ));

    const profileUrl = `fiskerne/${data._id}`;

    return (
        <div className="flex p-4 mt-2 rounded border gap-3 w-full justify-between items-center">
            <div className="flex flex-col">
                <p className="font-bold">{data.navn}</p>
                <div className="flex gap-2">
                    {fiskArray}
                </div>
            </div>
            <div>
                <Link className="text-gray-600 text-sm" href={profileUrl}><FaArrowRight size={25} className="p-1 text-gray-500 hover:text-black transition-colors"/></Link>
            </div>
        </div>
    )
}