import Image from "next/image";
import MaintainPage from "./components/other/MaintainPage";
import Link from "next/link";
import Logo from "@/public/troldefishingimg.png";

export default function Home() {
  return (
    <div className="h-screen w-full flex flex-col gap-8 justify-center items-center">
      <div className="flex gap-5 items-center">
        <div className="flex flex-col gap-2 z-1 relative lg:left-[250px]">
          <p className="font-bold text-5xl">TroldeFishing<span className="font-normal text-gray-500">.app</span></p>
          
          <div className="flex flex-col gap-3 m-2">
            <p>W Fiske App for the boys!</p>
            <Link className="z-10 relative p-3 w-[200px] rounded bg-black text-white hover:translate-y-[-5px] shadow-xl transition-all flex gap-3 items-center" href="/dashboard">
              <span className="text-2xl">🐟</span><span>Gå til Dashboard</span>
            </Link>
          </div>



        </div>
        <div className="z-0">
          <Image src={Logo} alt="Troldefishing" width={500} height={500} className="lg:block hidden" draggable={false}/>
        </div>
      </div>
    </div>
  );
}
