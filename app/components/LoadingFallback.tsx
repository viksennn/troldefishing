import { Skeleton } from "@/components/ui/skeleton"


export const FiskerProfileLoading = async () => {
    
    return (
        <div className="flex flex-col lg:flex-row gap-5">
            <Skeleton className="flex py-6 px-4 mt-2 rounded w-full lg:w-[500px] h-[250px]" />
            <Skeleton className="flex py-6 px-4 mt-2 rounded w-full lg:w-[500px] h-[250px]" />
        </div>
    )
}