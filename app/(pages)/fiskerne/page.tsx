import { FiskerProfileLoading } from "@/app/components/LoadingFallback";
import { ProfileCardList } from "@/app/components/ProfileCardList";
import { FiskerOpretKnap } from "@/app/components/ui/FiskerOpretKnap";
import { Suspense, useState } from "react";

export default function Home() {
  return (
      <div className="w-full flex items-start justify-start pt-5">
        <div className="w-full h-[90vh] px-10 flex flex-col justify-between">
          <div className="">
            <h1 className="text-2xl text-center font-bold pb-4 lg:text-left">Fiskerne</h1>
            <Suspense fallback={<FiskerProfileLoading />}>
              <ProfileCardList />
            </Suspense>
          </div>
          <div>
            <div className="flex items-center justify-center m-5">
              <FiskerOpretKnap />
            </div>
          </div>
        </div>
    </div>
  );
}
