"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FormEventHandler, useState } from "react"

export const LoginForm = () => {

    const [navn, setNavn] = useState("")
    const [password, setPassword] = useState("")

    const [error, setError] = useState("")

    const router = useRouter();

    const handleLogin:FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        try {
            if(!navn || !password) {
                setError("Udfyld venligst alle felter")
                return;
            }
    
            setError("");

            const res: any = await signIn("credentials", {
                navn,
                password,
                redirect: false
            });

            if(res.error) {
                setError("Forkert brugernavn eller adgangskode")
                return;
            }

            router.push("/dashboard")

        } catch (error) {

        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen w-full gap-2">
            <Link href={"/"} className="text-gray-400 text-sm">Tilbage til forsiden</Link>
            <div className="w-full flex flex-col justify-center items-center drop-shadow-xl">
                <div className="w-2/3 lg:w-[500px] bg-indigo-100 border-t-4 border-indigo-300 rounded-xl gap-3 flex flex-col">
                    <p className="text-center pt-5 text-xl font-bold tracking-wide">Login, din vilde fisker!</p>
                    <div className="flex items-center justify-center">
                        {error && (
                        <div className="flex items-center justify-center">
                            <p className="text-red-500 text-sm">{error}</p>
                        </div>)}
                    </div>

                    <form className=" flex flex-col items-center" onSubmit={handleLogin}>
                        <div className="w-2/3 flex gap-5 flex-col items-center">
                            <Input onChange={(e) => setNavn(e.target.value)} placeholder="Brugernavn" type="text" />
                            <Input onChange={(e) => setPassword(e.target.value)} placeholder="Adgangskode" type="password" />
                            <Button type="submit" className="w-1/3">Login</Button>
                        </div>
                    </form>
                    <div className="flex flex-col w-full items-center gap-2 mb-5">
                        <p className="text-sm">
                            Har du ikke en bruger?
                        </p>
                        <Link href="/registrer" className="text-sm py-1 px-2 underline-offset-4 underline">Registrer her!</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}