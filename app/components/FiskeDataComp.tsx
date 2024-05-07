"use client"

import { useRouter } from "next/navigation";
import { FiskCard } from "./FiskCard";

export const FiskeDataComp = ({data}:any) => {


    const userId: String = data._id;

    return (
        <div>
            <p className="text-xl font-bold">Fangster</p>
            {data.fiskeData.map((fisk:any) => {
                return <FiskCard user={userId} key={fisk._id} data={fisk} />;
            })}
        </div>
    )
}