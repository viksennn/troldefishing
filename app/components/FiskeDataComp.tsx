"use client"

import { useRouter } from "next/navigation";
import { FiskCard } from "./FiskCard";

export const FiskeDataComp = ({data}:any) => {


    const userId: String = data._id;

    return (
        <div>
            <div className="w-full border border-indigo-100" />
            <p className="text-2xl lg:text-xl lg:text-left text-center font-bold my-8 lg:my-2">Fangster</p>
            <div className="flex gap-5 flex-wrap-reverse">
                {data.fiskeData.map((fisk:any) => {
                    return <FiskCard user={userId} key={fisk._id} data={fisk} />;
                })}
            </div>
        </div>
    )
}