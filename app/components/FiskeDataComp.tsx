import { FiskCard } from "./FiskCard";

export const FiskeDataComp = ({data}:any) => {



    return (
        <div>
            <p className="text-xl font-bold">Fangster</p>
            {data.fiskeData.map((fisk:any) => {
                return <FiskCard key={fisk._id} data={fisk} />;
            })}
        </div>
    )
}