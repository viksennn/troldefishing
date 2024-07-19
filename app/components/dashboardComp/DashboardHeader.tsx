import Link from "next/link"
import { LogOutButton } from "../ui/LogOutButton"
import { GiCampfire, GiLuckyFisherman } from "react-icons/gi"
import { VejrComp } from "../other/VejrComp";
import { IoHome } from "react-icons/io5";

export const DashboardHeader = () => {

    const iconSize = 35;

    const links = [
        { name: "Fiskerne", path: "/fiskerne", icon: <GiLuckyFisherman size={iconSize} /> },
        {name: "Min Profil", path: "/min-profil", icon: <GiCampfire size={iconSize} />},
      ]

    return (
        <div 
        className="fixed lg:sticky w-full flex justify-between px-10 py-4 items-center shadow-sm z-50  bg-white"
        >
            <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-10 lg:gap-12">
                    <Link href="/dashboard" className="font-bold hidden lg:block">TroldeFishing</Link>
                    <Link href="/dashboard" className="font-bold block lg:hidden"><IoHome size={20}/></Link>
                    <div className="flex justify-between items-center gap-6 lg:flex-row flex-row-reverse">
                        <VejrComp />
                        <div className="flex gap-2">
                            {links.map(link => (
                                <Link key={link.name} href={link.path} className="flex gap-2 hover:bg-indigo-500 bg-indigo-400 text-white py-1 px-2 rounded items-center">
                                    {link.icon}
                                    <p className="hidden lg:block">{link.name}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
                <div>
                    <LogOutButton />
                </div>
            </div>
        </div>
    )
}