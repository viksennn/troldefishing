import { FiskCard } from "@/app/components/FiskCard";
import { IFisher } from "@/types/IFisher";

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

    console.log(data);

    if (data === null) {
        return (
            <div className="w-full pt-[250px] flex items-center justify-center">
                <p className="font-bold text-xl">Hvad dælan... ikke nogen fisker her?</p>
            </div>
        )
    } else {
        return (
            <div>
                <div className="flex flex-col m-5 gap-5">
                    <p className="text-2xl font-bold">{data.navn}</p>
                    <div className="">
                        {data.fiskeData.map((fisk) => {
                            return <FiskCard key={fisk.fishId} data={fisk} />
                        })}
                    </div>
                </div>
            </div>
        )
    }
}
