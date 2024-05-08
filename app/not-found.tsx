"use client"

import { useRouter } from "next/navigation";
import Lottie404 from "./components/other/Lottie404";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";

export default function NotFound() {

    return (
        <div className="flex flex-col justify-center items-center gap-4">
            <div>
                <Lottie404 />
            </div>
            <div className="flex flex-col items-center">
                <p className="text-xl pb-5">Der er ingen fisk at finde her...</p>
                <p className="pb-5 font-bold text-xl">404<span className="font-light"> | {window.location.href}</span></p>
                <Link className="p-2 rounded bg-black text-white" href="/"><FaArrowLeft /></Link>
            </div>
        </div>
    )
}