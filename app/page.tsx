import Image from "next/image";
import MaintainPage from "./components/other/MaintainPage";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen w-full flex flex-col gap-8 justify-center items-center">
      <div className="flex flex-col gap-5 items-center">
        <p className="font-bold text-5xl">Forside</p>
        <p>Ikke noget at se her. Endnu.</p>
      </div>
      <Link className="p-3 rounded bg-black text-white hover:translate-y-[-3px] shadow-xl transition-all" href="/dashboard">Gå til Dashboard</Link>
    </div>
  );
}
