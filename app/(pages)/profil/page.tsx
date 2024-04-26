import { ProfileCard } from "@/app/components/ProfileCard";
import { DashboardHeader } from "@/app/components/dashboardComp/DashboardHeader";
import { IFisher } from "@/types/IFisher";

export default async function Home() {

  const getFiskeData = async (): Promise<IFisher[]> => {
    const url = `https://troldefishing.vercel.app/api/fisk`
    const res = await fetch(url, { cache: "no-store" });
    const data = await res.json();
    return data;
  }

  const fiskeData = await getFiskeData();

  return (
    <div>
      <div>
        <p>Profile</p>
      </div>
      <div className="p-5">
        {fiskeData.map((data:IFisher) => <ProfileCard key={data.navn} data={data} />)}
      </div>
    </div>
  );
}
