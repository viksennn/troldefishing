import { DashboardHeader } from "@/app/components/dashboardComp/DashboardHeader";
import { VejrComp } from "@/app/components/other/VejrComp";
import Link from "next/link";
import { FaMedal } from "react-icons/fa";
import { FaGears } from "react-icons/fa6";
import { GiLuckyFisherman } from "react-icons/gi";

export default function Home() {

  const iconSize = 35;

  const links = [
    { name: "Fiskerne", path: "/fiskerne", icon: <GiLuckyFisherman size={iconSize} /> },
  ]

  return (
    <div className="flex">
      <div className="w-full lg:w-1/3 flex flex-col items-center mt-16 gap-16 ">
        <div>
          <VejrComp />
        </div>
        <div className="flex flex-col items-center">
          <p className="text-lg">Navigation</p>
          <div className="w-full border-b border"/>
          <div>
            {links.map(link => {
              return (
                <Link key={link.name} href={link.path} className="flex gap-3 items-center justify-center text-xl p-2 m-5 text-white bg-gradient-to-b from-indigo-800 to-indigo-600 rounded w-[150px] hover:translate-y-[-3px] transition-all">
                  {link.icon ? (link.icon) : link.name}
                  <p>{link.name}</p>
                </Link>
                )
            })}
          </div>
        </div>
      </div>
      <div className="w-2/3 hidden lg:flex">
        <img draggable={false} src="/background.jpg" className="w-full object-cover h-[92vh]"/>
      </div>
    </div>
  );
}
