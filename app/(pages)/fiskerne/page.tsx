import { ProfileCard } from "@/app/components/ProfileCard";
import { DashboardHeader } from "@/app/components/dashboardComp/DashboardHeader";
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
    <div>
      <div>
        <p>Profile</p>
      </div>
      <div className="p-5 flex">
      {fiskeData.map((data: IFisher) => (
        <div key={data.navn}>
          <ProfileCard data={data} />
        </div>
      ))}
      </div>
    </div>
  );
}
