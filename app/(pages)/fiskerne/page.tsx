import { ProfileCard } from "@/app/components/ProfileCard";
import { ProfileCardList } from "@/app/components/ProfileCardList";
import { DashboardHeader } from "@/app/components/dashboardComp/DashboardHeader";
import { FiskerOpretKnap } from "@/app/components/ui/FiskerOpretKnap";
import { getFiskeData } from "@/app/data/dataFetch";
import { IFisher } from "@/types/IFisher";
import { useState } from "react";

export default function Home() {
  return (
    <div className="flex justify-center">
      <div className="w-1/4 mt-5">
        <div className="flex justify-center">
          <h1 className="text-xl font-bold">Fiskerne</h1>
        </div>
        <ProfileCardList />
      <div className="flex items-center justify-center mt-5">
        <FiskerOpretKnap />
      </div>
      </div>
    </div>
  );
}
