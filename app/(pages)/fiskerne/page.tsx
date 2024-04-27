import { ProfileCard } from "@/app/components/ProfileCard";
import { DashboardHeader } from "@/app/components/dashboardComp/DashboardHeader";
import { FiskerOpretKnap } from "@/app/components/ui/FiskerOpretKnap";
import { IFisher } from "@/types/IFisher";

export default async function Home() {

const getFiskeData = async (): Promise<IFisher[]> => {
    const url = `${process.env.PAGE_URL}/api/fisk`;
    const res = await fetch(url, { cache: "no-store" });
    const data = await res.json();
    return data;
}


  const fiskeData = await getFiskeData();


  return (
    <div className="flex justify-center">
      <div className="w-1/4 mt-5">
        <div className="flex justify-center">
          <h1 className="text-xl font-bold">Fiskerne</h1>
        </div>
      {fiskeData.map((data: IFisher) => (
        <div key={data.navn}>
          <ProfileCard data={data} />
        </div>
      ))}
      <div className="flex items-center justify-center mt-5">
        <FiskerOpretKnap />
      </div>
      </div>
    </div>
  );
}
