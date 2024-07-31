import { FiskeDataComp } from "@/app/components/FiskeDataComp";
import { ProfileSetting } from "@/app/components/ProfileSetting";
import { AchivementList } from "@/app/components/achivements/AchivementList";
import { FiskeOpretKnap } from "@/app/components/ui/FiskOpretKnap";
import { FishingModel } from "@/app/data/mongoFishingModel";
import { PAGE_URL } from "@/app/url";
import { toast } from "@/components/ui/use-toast";
import { IFisher } from "@/types/IFisher";
import Link from "next/link";
import { Suspense } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";

export default async function Page({ params }: { params: { slug: string } }) {

    const getFishermanData = async (slug: string) => {
        
        const url = `${PAGE_URL}/api/fisk/${slug}`;
        const res = await fetch(url, { cache: "no-store" });

        if (!res.ok) {
            return { fisk: null };
        }
        const data = await res.json();
        return data;
    }

    const id = params.slug;

    const fishermanData = await getFishermanData(id);

    const data: IFisher = fishermanData.fisk;

    if (data === null) {
        return (
            <div className="w-full pt-[250px] flex items-center justify-center">
                <p className="font-bold text-xl">Hvad dælan... ikke nogen fisker her??</p>
            </div>
        )
    } else {
        return (
            <div className="flex flex-col relative justify-between">
                <div className="m-6">
                    <div className="flex justify-between">
                        <Link href="/fiskerne">
                            <IoMdArrowRoundBack size={35} className="text-white bg-black rounded-full p-1 mt-2 mb-10 transition-all hover:scale-[1.1]"/>
                        </Link>
                    </div>
                    <div className="flex flex-col gap-5">
                        <div className="flex gap-8 items-center mt-4">
                            {data.profilImgUrl && <img src={data.profilImgUrl} alt="profil billede" className="h-40 w-40 rounded-full object-cover" />}
                            <p className="text-indigo-600 text-3xl">{data.navn}</p>
                        </div>
                        <div className="ml-5 mt-5">
                            <p className="text-xl">Achivements</p>
                            <AchivementList data={data} variant={"stor"} />
                        </div>
                        <div className="ml-5 mt-5">
                            <p className="text-xl">Fangster</p>
                        </div>
                        <FiskeDataComp variant="fisker" user={data._id} data={data}/>
                        </div>
                    </div>
            </div>
        )
    }
}
