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
            <div className="flex w-full">
                <div className="flex items-center justify-between lg:justify-start w-full lg:gap-12">
                    <div className="flex justify-center items-center gap-8">
                        <Link href="/dashboard" className="font-bold hidden lg:block">TroldeFishing</Link>
                        <Link href="/dashboard" className="font-bold block lg:hidden"><IoHome size={20}/></Link>
                        <VejrComp />
                    </div>
                    <div className="flex justify-between items-center ">
                        <div className="flex gap-2 lg:gap-6 lg:m-0 ml-5">
                            {links.map(link => (
                                <Link key={link.name} href={link.path} className="flex gap-2 hover:bg-indigo-500 bg-indigo-400 text-white py-1 px-2 rounded items-center">
                                    {link.icon}
                                    <p className="hidden lg:block">{link.name}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}