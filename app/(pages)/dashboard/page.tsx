import { DashboardHeader } from "@/app/components/dashboardComp/DashboardHeader";
import Link from "next/link";
import { GiLuckyFisherman } from "react-icons/gi";

export default function Home() {

  const iconSize = 35;

  const links = [
    { name: "Fiskerne", path: "/fiskerne", icon: <GiLuckyFisherman size={iconSize} /> },
  ]

  return (
    <div>
      {links.map(link => {
        return (
          <Link key={link.name} href={link.path} className="flex gap-3 items-center justify-center text-xl p-2 m-5 text-white bg-black rounded w-[150px] hover:translate-y-[-3px] transition-all">
            {link.icon ? (link.icon) : link.name}
            <p>{link.name}</p>
          </Link>
          )
      })}
    </div>
  );
}
