import { MainFeed } from "@/app/components/Feed/MainFeed";
import SenesteFangst from "@/app/components/SenesteFangst";
import { connectMongo } from "@/app/data/mongodb";
import { MediaModel } from "@/app/data/mongoFishingModel";
import Link from "next/link";



export default function Home() {

  return (
    <div className="p-2 flex flex-col lg:flex-row gap-8 m-0 lg:m-8">
      <div className="lg:1/3">
        <div className='w-full mb-4 flex items-center gap-2 justify-between pr-5'>
          <p className='text-lg font-bold bg-indigo-500 w-fit py-0.5 px-1 rounded text-white drop-shadow-md'>Seneste Fangst</p>
          <Link href='/seneste-fangster' className='text-indigo-700 text-sm'>Se alle seneste fangster</Link>
        </div>
        <SenesteFangst />
      </div>
      <div className="w-full lg:w-1/3">
        <div className='w-full mb-4'>
            <p className='text-lg font-bold bg-indigo-500 w-fit py-0.5 px-1 rounded text-white drop-shadow-md'>Fiske feed</p>
        </div>
        <MainFeed />
      </div>
      <div className="w-full lg:w-1/3">
        <div className='w-full mb-4'>
            <p className='text-lg font-bold bg-indigo-500 w-fit py-0.5 px-1 rounded text-white drop-shadow-md'>Catch of the Week</p>
        </div>
        <div className="border lg:h-[500px] rounded-lg flex-col flex items-center justify-center">
          <p className="text-sm">Kommer snart...</p>
        </div>
      </div>
    </div>
  );
}
