"use client"

import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"

export const LogOutButton = () => {
    return (
        <>
            <Button onClick={() => signOut()} className="text-xs p-2 lg:text-sm">Log ud</Button>
        </>
    )
}
