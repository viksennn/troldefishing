import Link from "next/link"
import { GiLuckyFisherman } from "react-icons/gi";


export const DashboardHeader = () => {

    const iconSize = 35;

    const links = [
        { name: "Profil", path: "/profil", icon: <GiLuckyFisherman size={iconSize} /> },
    ]

    return (
        <div 
        className="flex justify-between px-10 py-4 items-center shadow-sm mb-2"
        >
            <div>
                <Link href="/dashboard" className="font-bold">TroldeFishing</Link>
            </div>
            <div className="flex gap-8 items-center">
                {links.map(link => {
                    return (
                        <Link key={link.name} href={link.path}>
                            {link.icon ? (link.icon) : link.name}
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}