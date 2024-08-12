import Link from "next/link";
import { ChallengeCard } from "./ChallengeCard";
import { LiveChallenges } from "./LiveChallenges";
import { OpretChallenge } from "./OpretChallenge";



export default function Home() {
    return (
        <div className="w-full">
            
            <div className="w-full flex items-center justify-center">
                <Link href="/udfordring/opret" className="px-4 py-2 border rounded-lg flex items-center gap-6 m-4 hover:bg-indigo-100 transition-colors">
                    <img src="/fishchal.png" className="h-14" alt="Opret Kamp" />
                    <p className="text-xl tracking-tight">Opret Kamp!</p>
                </Link>
            </div>
            
            <div className="w-full py-2 border">
                <LiveChallenges />
            </div>

            <div>
                <h1>Seneste udfordringer</h1>
            </div>

            <div>
                <h1>Dine udfordringer</h1>
            </div>
        </div>
    )
}

