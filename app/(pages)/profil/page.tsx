import { ProfileCard } from "@/app/components/ProfileCard";
import { DashboardHeader } from "@/app/components/dashboardComp/DashboardHeader";

export default function Home() {

  const demoData = [
    {navn: "Viktor", antalFisk: 0},
    {navn: "Peder", antalFisk: 1}
  ]

  return (
    <div>
        <div>
          <p>Profile</p>
        </div>
        <div className="p-5">
          {demoData.map((data) => {
            return <ProfileCard key={data.navn} data={data} />
          })}
        </div>
    </div>
  );
}
