import { IFisher } from "@/types/IFisher";

export const getFiskeData = async (): Promise<IFisher[]> => {
    const url = `${process.env.PAGE_URL}/api/fisk`;
    const res = await fetch(url, { cache: "no-store" });
    const data = await res.json();
    return data;
}