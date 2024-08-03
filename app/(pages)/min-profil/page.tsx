import { AchivementList } from "@/app/components/achivements/AchivementList";
import { FiskeDataComp } from "@/app/components/FiskeDataComp";
import { ProfileSetting } from "@/app/components/ProfileSetting";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import Link from 'next/link';

import { PAGE_URL } from "@/app/url";

import { Aquarium } from "./akvarium"
import FiskMedals from "@/app/components/fiskeantal/FiskMedals";

export default async function Home() {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id as string;

    const getFishermanData = async (id:any) => {
        const url = `${PAGE_URL}/api/fisk/${id}`;
        const res = await fetch(url, { cache: "no-store" });

        if (!res.ok) {
            return { fisk: null };
        }
        const data = await res.json();
        return data;
    }

    const fishermanData = await getFishermanData(userId);
    const data = fishermanData.fisk;

    const antalFisk = data.fiskeData.length;

    return (
        <div className="mt-5">
            <div className="flex justify-between mx-10">
                <div className="flex justify-between w-full gap-10">
                    <div>
                        <p className="text-4xl font-bold tracking-tight">Min Profil</p>
                        <div className="flex lg:gap-8 gap-4 items-center mt-4">
                            {data.profilImgUrl && <img src={data.profilImgUrl} alt="profil billede" className="lg:h-40 lg:w-40 h-24 w-24 rounded-full object-cover" />}
                            <p className="text-indigo-600 text-2xl lg:text-3xl">{data.navn}</p>
                        </div>
                    </div>
                    <ProfileSetting data={data} />
                </div>
            </div>
            <div className="m-10">
                <p className="font-bold text-lg">Achivements</p>
                <AchivementList data={data} variant={"stor"} />
            </div>
            <div className="flex flex-col m-10 justify-center text-lg lg:justify-start gap-5">
                <div className="flex gap-2 items-center">
                    <p className="font-bold text-lg">Fangster</p>
                    <FiskMedals count={antalFisk} />
                    <p className="text-gray-300">{antalFisk}</p>
                </div>
                <Link href="/opret-fangst" className="py-1 px-2 bg-black text-white rounded-md w-40 text-center">Opret Fangst</Link>
            </div>

{/*         
            <div className="m-10">
                <p className="font-bold text-lg">Akvarium</p>
                <Aquarium />
            </div> 
*/}
            <div className="m-5">
                <FiskeDataComp variant="profil" data={data} />
            </div>
        </div>
    );
}
