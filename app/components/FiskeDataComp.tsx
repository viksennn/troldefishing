"use client"

import { useRouter } from "next/navigation";
import { FiskCardProfile } from "./FiskCardProfile";
import { Suspense, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { FiskCard } from "./FiskCard";

export const FiskeDataComp = ({data, variant}:any) => {

    if (variant === "profil") {
    
        return (
            <div>
                <div className="flex lg:gap-5 flex-wrap px-5 flex-row-reverse justify-end">
                    {data.fiskeData.map((fisk:any) => {
                        return (
                            <FiskCardProfile user={data._id} key={fisk._id} data={fisk} />
                        )
                    })}
                </div>
            </div>
        )
    } else if (variant === "fisker") {
        return (
            <div>
            <div className="flex gap-2 lg:gap-5 flex-wrap px-5 flex-row-reverse justify-end">
                {data.fiskeData.map((fisk:any) => {
                    return (
                        <FiskCard user={data._id} key={fisk._id} data={fisk} />
                    )
                })}
            </div>
        </div>
        )
    } else {
        return (
            <div>
                <p>Der er sket en fejl</p>
            </div>
        )
    }
}