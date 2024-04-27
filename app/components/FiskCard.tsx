import { IFisher } from "@/types/IFisher"

export const FiskCard = ({data}: any) => {
    return (
        <div className="p-3 border rounded w-[800px]">
            <p><span className="text-gray-500">Type: </span>{data.art}</p>
            <p><span className="text-gray-500">Lokation: </span>{data.lokation}</p>
            <p><span className="text-gray-500">Dato: </span>{data.dato}</p>
        </div>
    )
}