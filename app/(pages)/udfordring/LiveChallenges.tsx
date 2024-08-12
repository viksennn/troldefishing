import { ChallengeCard } from "./ChallengeCard"

export const LiveChallenges = () => {
    return (
        <div>
            <h1>Live kampe</h1>
            <div className="flex gap-6">
                <ChallengeCard />
            </div>
        </div>
    )
}