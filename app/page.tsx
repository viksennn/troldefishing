import Image from "next/image";
import MaintainPage from "./components/other/MaintainPage";
import Link from "next/link";
import Logo from "@/public/troldefishingimg.png";
import { AuroraBackground } from "./components/ui/aurora-background";

export default function Home() {
  return (
      <AuroraBackground>
          <div className="flex flex-col gap-3 items-center">
            <p className="font-bold text-6xl tracking-tight">TroldeFishing<span className="font-normal text-gray-500">.app</span></p>
                
            <div className="flex flex-col gap-3 m-2">
                  <p>W Fiske App for the boys!</p>
              <Link className="z-10 p-3 w-[200px] rounded bg-black text-white hover:translate-y-[-5px] shadow-xl transition-all flex gap-3 items-center" href="/dashboard">
                <span className="text-2xl">🐟</span><span>Gå til Dashboard</span>
              </Link>
            </div>
          </div>
      </AuroraBackground>
  );
}
