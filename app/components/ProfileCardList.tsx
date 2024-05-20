import { IFisher } from "@/types/IFisher";
import { getFiskeData } from "../data/dataFetch";
import { ProfileCard } from "./ProfileCard";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export const ProfileCardList = async () => {

    const session = await getServerSession(authOptions);

    const userSessionID = session?.user?.id as string;
    
    const fiskeData = await getFiskeData();

    const filteredFiskeData = fiskeData.filter((data: IFisher) => data._id !== userSessionID)
    
    filteredFiskeData.sort((a: IFisher, b: IFisher) => {
        return b.fiskeData.length - a.fiskeData.length;
    });

    return (
        <div className="flex flex-col lg:flex-row gap-5 flex-wrap">
            {filteredFiskeData.map((data: IFisher, index: number) => (
                <div key={index.toString()}>
                    <ProfileCard data={data} />
                </div>
            ))}
        </div>
    );
}
