import Image from "next/image";
import MaintainPage from "./components/other/MaintainPage";
import Link from "next/link";
import Logo from "@/public/troldefishingimg.png";
import { AuroraBackground } from "./components/ui/aurora-background";

export default function Home() {

  return (
      <div className="flex items-center justify-center h-screen w-full">
          <div className="flex flex-col gap-3 items-center">
            <p className="font-bold text-6xl tracking-tight">TroldeFishing<span className="font-normal text-gray-500">.app</span></p>
                
            <div className="flex flex-col gap-3 m-2">
                  <p>W Fiske App for the boys!</p>
              <Link className="py-2 px-4 rounded-sm border bg-indigo-400 text-white" href="/login">Login</Link>
              <Link className="py-2 px-4 rounded-sm border" href="/registrer">Registrer</Link>
            </div>
          </div>
      </div>
  );
}
