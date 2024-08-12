"use client"

import { useState } from "react"

export const OpretChallenge = () => {

    const [challengeChosen, setChallengeChosen] = useState<string>("none")

    return (
        <div className="w-full">
            <p className="w-full flex justify-center my-6 text-2xl">Vælge Udfordringstype</p>
            <div className="grid grid-cols-3 gap-12 px-12 py-6">
                <button onClick={() => setChallengeChosen("challenge1")} 
                className="border-2 border-indigo-500 p-4 rounded-lg hover:bg-indigo-200 transition-colors">
                   Fang flest fisk
                </button>
                <button disabled={true} onClick={() => setChallengeChosen("challenge2")} 
                className="cursor-not-allowed border-2 border-indigo-500 p-4 rounded-lg hover:bg-indigo-200 transition-colors">
                    Challenge kommer snart...
                </button>
                <button disabled={true} onClick={() => setChallengeChosen("challenge3")} 
                className="cursor-not-allowed border-2 border-indigo-500 p-4 rounded-lg hover:bg-indigo-200 transition-colors">
                    Challenge kommer snart...
                </button>
            </div>
            <div>
                {challengeChosen === "challenge1" && <ChallengeOne />}
            </div>
            <div>
                <p>{challengeChosen}</p>
            </div>
        </div>
    )
}

const ChallengeOne = () => {
    return (
        <div>
            <form>
                <label htmlFor="fish">Antal fisk</label>
                <input type="number" name="fish" id="fish" />
                <button type="submit">Opret udfordring</button>
            </form>
        </div>
    )
}