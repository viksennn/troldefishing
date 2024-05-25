import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export const FiskeBillede = ({img}: any) => {
    return (
            <Dialog>
                <DialogTrigger className="p-2 rounded bg-black text-white text-sm mt-1">Vis billede</DialogTrigger>
                <DialogContent className="bg w-auto lg:min-h-[80vh] lg:max-h-[80vh] p-1 flex items-center justify-center">
                    <img src={img} alt="fiskebillede" className="w-full rounded" />
                </DialogContent>
            </Dialog>
    )
}