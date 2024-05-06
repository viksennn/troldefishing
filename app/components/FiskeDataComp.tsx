"use client"

import { useRouter } from "next/navigation";
import { FiskCard } from "./FiskCard";

export const FiskeDataComp = ({data}:any) => {

    const id = data._id;

    const router = useRouter();

    const handleDelete = async ({fishId}: any) => {
        await fetch(`http://localhost:3001/fisk/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({_id: fishId})});

        router.refresh();
    }


    return (
        <div>
            <p className="text-xl font-bold">Fangster</p>
            {data.fiskeData.map((fisk:any) => {
                return <FiskCard key={fisk._id} data={fisk} />;
            })}
        </div>
    )
}