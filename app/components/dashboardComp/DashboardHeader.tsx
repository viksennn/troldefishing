import Link from "next/link"
import { GiLuckyFisherman } from "react-icons/gi";


export const DashboardHeader = () => {

    return (
        <div 
        className="flex justify-between px-10 py-4 items-center shadow-sm mb-2"
        >
            <div>
                <Link href="/dashboard" className="font-bold">TroldeFishing</Link>
            </div>
        </div>
    )
}