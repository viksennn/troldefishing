import { IFisher } from "@/types/IFisher";
import { PAGE_URL } from "../url";

export const getFiskeData = async (): Promise<IFisher[]> => {
    const url = `${PAGE_URL}/api/fisk`;
    const res = await fetch(url, { cache: "no-store" });
    const data = await res.json();
    return data;
}