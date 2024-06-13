import SenesteFangst from "@/app/components/SenesteFangst";
import { VejrComp } from "@/app/components/other/VejrComp";
import UserHello from "@/app/components/ui/UserHello";
import Link from "next/link";
import { GiCampfire, GiLuckyFisherman } from "react-icons/gi";

export default function Home() {

  const iconSize = 35;

  const links = [
    { name: "Fiskerne", path: "/fiskerne", icon: <GiLuckyFisherman size={iconSize} /> },
    {name: "Min Profil", path: "/min-profil", icon: <GiCampfire size={iconSize} />},
  ]

  return (
    <div className="flex lg:flex-row flex-col items-center justify-center lg:h-[80vh] gap-10 lg:gap-0">
      <div className="flex flex-col m-10 gap-10 justify-between h-[300px]">
        <div className="flex flex-col gap-5 items-center">
          <VejrComp />
        </div>
        <div className="flex flex-col gap-5">
          {links.map(link => (
            <Link key={link.name} href={link.path} className="flex h-[55px] gap-2 items-center justify-center bg-indigo-400 text-white py-1 px-2 rounded">
              {link.icon}
              {link.name}
            </Link>
          ))}
        </div>
      </div>
      <div>
        <div>
          <div className="mb-2 text-center">
            <h1 className="text-xl font-bold">Seneste fangst</h1>
          </div>
          <SenesteFangst />
        </div>
      </div>
    </div>
  );
}
