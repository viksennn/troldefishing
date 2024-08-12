export const ChallengeCard = () => {

    return (
        <div className="flex flex-col gap-2 border p-2 rounded-md justify-center items-center w-[350px] h-[250px]">
            <div className="flex items-center justify-center p-2">
                <p className="text-lg">Skalle Duel</p>
            </div>
            <div className="flex gap-16 items-center justify-center">
                <div className="flex flex-col items-center">
                    <div className="h-24 w-24 rounded-full bg-gray-300 mb-2" /> 
                    <p className="font-bold text-green-500 text-sm">Winner</p>
                    <p>Viktor</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <div className="h-24 w-24 rounded-full bg-gray-300 mb-2" /> 
                    <p className="font-bold text-red-400 text-sm">Loser</p>
                    <p>Patrick</p>
                </div>
            </div>
        </div>
    )
}