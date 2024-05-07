import Link from "next/link"

export const DashboardHeader = () => {

    return (
        <div 
        className="flex justify-between px-10 py-4 items-center shadow-sm"
        >
            <div>
                <Link href="/dashboard" className="font-bold">TroldeFishing</Link>
            </div>
        </div>
    )
}