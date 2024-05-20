"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FormEventHandler, useState } from "react"
import { AiOutlineLoading } from "react-icons/ai";

export const RegisterForm = () => {

    const [navn, setNavn] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState<boolean>(false);

    const router = useRouter();

    const handleRegister:FormEventHandler<HTMLFormElement> = async (e) => {

        e.preventDefault();

        if(password !== confirmPassword) {
            setError("Adgangskoderne er ikke ens")
            return;
        }

        const resUserExists = await fetch("/api/userExists", {
            method: "POST",
            body: JSON.stringify({navn}),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const { user } = await resUserExists.json();

        if (user) {
            setError("Brugernavnet er allerede taget")
            return;
        }

        const res = await fetch("/api/registrer", {
            method: "POST",
            body: JSON.stringify({ navn, password }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (res.ok) {

            setSuccess(true);

            setTimeout(() => {
                router.push("/login");
            }, 3000);
        }

        setError("");

    }

    return (
        <div className="flex flex-col items-center justify-center h-screen w-full gap-2">
            <Link href={"/"} className="text-gray-400 text-sm">Tilbage til forsiden</Link>
            <div className="w-full flex flex-col justify-center items-center drop-shadow-xl">
                <div className="w-2/3 lg:w-[600px] bg-indigo-100 border-t-4 border-indigo-300 rounded-xl flex flex-col gap-2">
                    <p className="text-center pt-5 text-xl">Registrer dig som fisker!</p>
                    <div className="flex items-center justify-center">
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        {success && <div className="flex flex-col gap-2 items-center"><p className="text-green-600">Du oprettes som fisker!</p></div>}
                    </div>
                    <form className="pt-5 flex flex-col items-center" onSubmit={handleRegister}>
                        <div className="w-2/3 flex gap-5 flex-col items-center">
                            <Input onChange={(e) => setNavn(e.target.value)} placeholder="Brugernavn" type="text" />
                            <Input onChange={(e) => setPassword(e.target.value)} placeholder="Adgangskode" type="password" />
                            <Input onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Bekræft adgangskode" type="password" />
                            <Button type="submit" className="w-1/3">Registrer</Button>
                            {success && <AiOutlineLoading size={20} className="animate-spin" />}
                        </div>
                    </form>
                    <div className="flex flex-col w-full items-center gap-2 mb-5">
                        <p className="text-sm">
                            Er du allerede en fisker?
                        </p>
                        <Link href="/login" className="text-sm py-1 px-2 underline-offset-4 underline">Login her!</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}