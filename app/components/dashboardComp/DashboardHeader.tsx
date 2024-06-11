import Link from "next/link"
import { LogOutButton } from "../ui/LogOutButton"

export const DashboardHeader = () => {

    return (
        <div 
        className="flex justify-between px-10 py-4 items-center shadow-sm z-50 sticky bg-white"
        >
            <div className="flex justify-between items-center w-full">
                <Link href="/dashboard" className="font-bold">TroldeFishing</Link>
                <LogOutButton />
            </div>
        </div>
    )
}