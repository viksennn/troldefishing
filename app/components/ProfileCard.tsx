import Link from "next/link"
import { FC } from "react";

export const ProfileCard = ({data}:any) => {

    return (
        <div className="flex flex-col p-4 m-4 rounded border gap-3 w-[350px]">
            <div>
                <p className="font-bold">{data.navn} -</p>
            </div>
            <Link className="text-gray-600 text-sm" href="/">Se mere</Link>
        </div>
    )
}