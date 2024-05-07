import { DashboardHeader } from "@/app/components/dashboardComp/DashboardHeader";
import Link from "next/link";
import { GiLuckyFisherman } from "react-icons/gi";

export default function Home() {

  const iconSize = 35;

  const links = [
    { name: "Fiskerne", path: "/fiskerne", icon: <GiLuckyFisherman size={iconSize} /> },
  ]

  return (
    <div className="flex">
      <div className="w-1/3 flex items-start justify-center">
        {links.map(link => {
          return (
            <Link key={link.name} href={link.path} className="flex gap-3 items-center justify-center text-xl p-2 m-5 text-white bg-gradient-to-b from-indigo-800 to-indigo-600 rounded w-[150px] hover:translate-y-[-3px] transition-all">
              {link.icon ? (link.icon) : link.name}
              <p>{link.name}</p>
            </Link>
            )
        })}
      </div>
      <div className="w-2/3">
        <img draggable={false} src="/background.jpg" className="w-full object-cover h-[92vh]"/>
      </div>
    </div>
  );
}
