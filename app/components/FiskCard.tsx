"use client"

export const FiskCard = ({ data, onDelete }: any) => {

    const handleDeleteClick = async () => {
        await onDelete(data._id);
    }

    return (
        <div className="p-3 border rounded w-[800px] mt-2 relative">
            <p><span className="text-gray-500">Type: </span>{data.art}</p>
            <p><span className="text-gray-500">Lokation: </span>{data.lokation}</p>
            <p><span className="text-gray-500">Fanget med: </span>{data.agn}</p>
            <p><span className="text-gray-500">Dato: </span>{data.dato}</p>
            <button onClick={(handleDeleteClick)}>Slet</button>
        </div>
    );
};
