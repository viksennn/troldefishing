import { ProfileCard } from "@/app/components/ProfileCard";
import { ProfileCardList } from "@/app/components/ProfileCardList";
import { DashboardHeader } from "@/app/components/dashboardComp/DashboardHeader";
import { FiskerOpretKnap } from "@/app/components/ui/FiskerOpretKnap";
import { getFiskeData } from "@/app/data/dataFetch";
import { IFisher } from "@/types/IFisher";
import { useState } from "react";

export default function Home() {
  return (
    <div className="flex h-[90vh]">
      <div className="w-full lg:w-1/3 flex items-start justify-start pt-5">
        <div className="w-full h-full px-10 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl text-center font-bold pb-4 lg:text-left">Fiskerne</h1>
            <ProfileCardList />
          </div>
          <div>
            <div className="flex items-center justify-center mb-5">
              <FiskerOpretKnap />
            </div>
          </div>
        </div>
      </div>
      <div className="w-2/3 hidden lg:flex">
        <img draggable={false} src="/background-fisker.jpg" className="w-full object-cover h-[92vh]"/>
      </div>
    </div>
  );
}
