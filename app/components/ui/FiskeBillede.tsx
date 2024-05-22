import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export const FiskeBillede = ({img}: any) => {
    return (
        <Dialog>
            <DialogTrigger className="p-1 rounded bg-black text-white text-sm mt-1">Vis billede</DialogTrigger>
            <DialogContent className="bg w-full lg:min-w-[800px] lg:max-w-[800px] p-0">
                <img src={img} alt="fiskebillede" className="w-full rounded" />
            </DialogContent>
        </Dialog>
    )
}