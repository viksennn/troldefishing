"use server"

import { IFisher } from "@/types/IFisher";
import { getFiskeData } from "../data/dataFetch";
import { ProfileCard } from "./ProfileCard";

export const ProfileCardList = async () => {
    const fiskeData = await getFiskeData();

    return (
        <div>
            {fiskeData.map((data: IFisher) => (
                <div key={data.navn}>
                <ProfileCard data={data} />
                </div>
            ))}
        </div>
    )
}