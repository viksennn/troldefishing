import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

export default async function UserHello() {

    const session = await getServerSession(authOptions);

    return (
        <>
            <p className="text-2xl">Howdy, {session?.user.navn}!</p>
        </>
    )
}