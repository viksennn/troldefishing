import { IFisher } from "@/types/IFisher";
import { getFiskeData } from "../data/dataFetch";
import { ProfileCard } from "./ProfileCard";

export const ProfileCardList = async () => {
    
    const fiskeData = await getFiskeData();
    
    fiskeData.sort((a: IFisher, b: IFisher) => {
        return b.fiskeData.length - a.fiskeData.length;
    });

    return (
        <div className="w-full">
            {fiskeData.map((data: IFisher, index: number) => (
                <div key={index.toString()}>
                    <ProfileCard data={data} />
                </div>
            ))}
        </div>
    );
}
