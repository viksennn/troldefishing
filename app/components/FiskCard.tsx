import { IFisher } from "@/types/IFisher"

export const FiskCard = ({data}: any) => {
    return (
        <div className="p-3 border rounded w-[800px]">
            <p>{data.art}</p>
            <p>{data.lokation}</p>
            <p>{data.dato}</p>
        </div>
    )
}