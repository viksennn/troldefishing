import { PAGE_URL } from "@/app/url";
import SenesteFangster from "./SenesteFangster";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

interface FiskeData {
    art: string;
    lokation: string;
    agn: string;
    dato: string;
    imgUrl?: string;
    imgKey?: string;
    _id: string;
}

interface Person {
    _id: string;
    navn: string;
    password: string;
    fiskeData: FiskeData[];
    __v: number;
}

interface CatchWithFisher {
    catch: FiskeData;
    fisherman: string;
    id: string;
}

async function fetchData() {
    try {
        const url = `${PAGE_URL}/api/fisk`;
        const res = await fetch(url, { cache: "no-store" });
        const data: Person[] = await res.json();

        if (data.length > 0) {
            const allCatches: CatchWithFisher[] = data.flatMap(person => 
                person.fiskeData.map(fiskeData => ({
                    catch: fiskeData,
                    fisherman: person.navn,
                    id: person._id
                }))
            );

            // Sorterer efter dato
            allCatches.sort((a, b) => new Date(b.catch.dato).getTime() - new Date(a.catch.dato).getTime());

            return allCatches;
        }
    } catch (error) {
        console.error('Fejl ved hentning af data:', error);
    }
    return [];
}

export default async function Home() {


    const session = await getServerSession(authOptions);
    const sessionUserId = session?.user?.id as string;

    const data = await fetchData();

    return (
        <div className="flex w-full justify-center">
            <div className="lg:w-2/5 w-10/12 mt-5">
                <p className="text-center font-bold text-xl">Seneste fangster</p>
                <SenesteFangster initialData={data.slice(0, 5)} allData={data} sessionUserId={sessionUserId}/>
            </div>
        </div>
    );
}
