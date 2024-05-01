import { FiskCard } from "@/app/components/FiskCard";
import { ProfileSetting } from "@/app/components/ProfileSetting";
import { FiskeOpretKnap } from "@/app/components/ui/FiskOpretKnap";
import { IFisher } from "@/types/IFisher";
import Link from "next/link";
import { IoMdArrowRoundBack } from "react-icons/io";

export default async function Page({ params }: { params: { slug: string } }) {

    const getFishermanData = async (slug: string) => {
        const url = `${process.env.PAGE_URL}/api/fisk/${slug}`;
        const res = await fetch(url, { cache: "no-store" });

        if (!res.ok) {
            return { fisk: null };
        }

        const data = await res.json();
        return data;
    }

    const fishermanData = await getFishermanData(params.slug);

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
                        <div>
                            <ProfileSetting data={data} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-5">
                        <p className="text-2xl font-bold">{data.navn}</p>
                        <div className="">
                            {data.fiskeData.length < 1 ? (
                                <div>
                                    <FiskeOpretKnap label="Opret din første fisk 😮" />
                                </div>
                            ) : (
                                <div>
                                    {data.fiskeData.map((fisk) => {
                                        return <FiskCard key={fisk._id} data={fisk} />;
                                    })}
                                    <div className="mt-5">
                                        <FiskeOpretKnap slug={params} label="Opret ny fisk 🐟" />
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
