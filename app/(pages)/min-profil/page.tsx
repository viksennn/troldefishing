import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { FiskeDataComp } from "@/app/components/FiskeDataComp";
import { ProfileSetting } from "@/app/components/ProfileSetting";
import { AchivementList } from "@/app/components/achivements/AchivementList";
import { FiskeOpretKnap } from "@/app/components/ui/FiskOpretKnap";
import { PAGE_URL } from "@/app/url";
import { IFisher } from "@/types/IFisher";
import { getServerSession } from "next-auth";

export default async function Home() {

    const session =  await getServerSession(authOptions);

    const userId = session?.user?.id as string;

    console.log(userId);


    const getFishermanData = async (id: string) => {
        
        const url = `${PAGE_URL}/api/fisk/${id}`;
        const res = await fetch(url, { cache: "no-store" });


        if (!res.ok) {
            return { fisk: null };
        }
        const data = await res.json();
        return data;
    }

    const fishermanData = await getFishermanData(userId);

    const data: IFisher = fishermanData.fisk;


    return (
        <div className="mt-5">
            <div className="flex justify-between mx-10">
                <div className="flex justify-between w-full gap-10 mr-5">
                    <div>
                        <p className="text-4xl font-bold tracking-tight">Min Profil</p>
                        <p className="text-indigo-600 text-xl">{data.navn}</p>
                    </div>
                    <ProfileSetting data={data} />
                </div>
            </div>
            <div className="m-10">
                <p className="font-bold text-lg">Achivements</p>
                <AchivementList data={data} variant={"stor"}/>
            </div>
            <div className="flex items-center m-10 justify-center text-lg lg:justify-start gap-5">
                <p className="font-bold text-lg">Fangster</p>
                <FiskeOpretKnap slug={userId} label={"Opret fisk"}/>
            </div>
            <div className="m-5">
                <FiskeDataComp variant="profil" data={data} />
            </div>
        </div>
    )
}
