import { FiskeDataComp } from "@/app/components/FiskeDataComp";
import { ProfileSetting } from "@/app/components/ProfileSetting";
import { FiskeOpretKnap } from "@/app/components/ui/FiskOpretKnap";
import { FishingModel } from "@/app/data/mongoFishingModel";
import { PAGE_URL } from "@/app/url";
import { toast } from "@/components/ui/use-toast";
import { IFisher } from "@/types/IFisher";
import Link from "next/link";
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
                <p className="font-bold text-xl">Hvad dælan... ikke nogen fisker her?</p>
            </div>
        )
    } else {
        return (
            <div className="flex flex-col relative justify-between h-screen">
                <div className="m-6">
                    <div className="flex justify-between">
                        <Link href="/fiskerne">
                            <IoMdArrowRoundBack size={35} className="text-white bg-black rounded-full p-1 mt-2 mb-10 transition-all hover:scale-[1.1]"/>
                        </Link>
                        <div className="flex gap-8 items-center">
                            <ProfileSetting data={data} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-5">
                        <p className="text-4xl font-bold">{data.navn}</p>
                        <div className="">
                            {data.fiskeData.length < 1 ? (
                                <div>
                                    <FiskeOpretKnap slug={id} label="Opret din første fisk 😮" />
                                </div>
                            ) : (
                                <div>
                                    <FiskeDataComp data={data}/>
                                    <div className="mt-5">
                                        <FiskeOpretKnap slug={id} label="Opret ny fisk 🐟" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
