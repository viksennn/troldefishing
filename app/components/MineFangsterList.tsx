import { IFisher } from "@/types/IFisher";
import { PAGE_URL } from "../url";
import { FiskeDataComp } from "./FiskeDataComp";
import { useSession } from "next-auth/react";

export const MineFangsterList = async ({user}: any) => {

    const getFishermanData = async (id: string) => {
        
        const url = `${PAGE_URL}/api/fisk/${id}`;
        const res = await fetch(url, { cache: "no-store" });

        if (!res.ok) {
            return { fisk: null };
        }
        const data = await res.json();
        return data;
    }

    const fishermanData = await getFishermanData(user);

    const data: IFisher = fishermanData.fisk;

    return (

        <div>
            <FiskeDataComp user={user} data={data}/>
        </div>

    )
}