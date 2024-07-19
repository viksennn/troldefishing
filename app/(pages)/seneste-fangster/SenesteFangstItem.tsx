"use client"

import { FishTypeCard } from "@/app/components/achivements/FishTypeCard"
import { FiskeBillede } from "@/app/components/ui/FiskeBillede"
import Link from "next/link"
import { FaFish } from "react-icons/fa6"


export const SenesteFangstItem = ({data}: any) => {


    return (
        <div className='m-5 flex flex-row items-center border p-5 rounded h-auto w-full justify-between'>
        <div>
          <div className='flex flex-col gap-3'>
            <Link href={`/fiskerne/${data._id}`} className='text-xl font-bold hover:underline'>
              {data.fisherman}
            </Link>
            <FishTypeCard art={data.catch.art} />
            <p>En {data.catch.art} ved {data.catch.lokation}. <br/> Fanget på {data.catch.agn}.</p>
            <p className='text-sm'>Dato: {new Date(data.catch.dato).toLocaleDateString('da-DK', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
          </div>
        </div>
        {data.catch.imgUrl && (
                <div>
                    <FiskeBillede img={data.catch.imgUrl} trigger={data.catch.imgUrl && <img src={data.catch.imgUrl} alt={data.catch.art} className='rounded max-w-[300px] w-[300px]' />}/>
                </div>
            )}
        {!data.catch.imgUrl && (
            <div className='flex items-center justify-center w-[300px] h-[300px] bg-gray-200 rounded'>
                <FaFish size={50} />
            </div>
        )}
      </div>
    )

}