"use client"

import { FishTypeCard } from "@/app/components/achivements/FishTypeCard"
import { FiskeBillede } from "@/app/components/ui/FiskeBillede"
import Link from "next/link"
import { useState } from "react"
import { FaFish } from "react-icons/fa6"



export const SenesteFangstItem = ({data, sessionUserId}: {
  data:any,
  sessionUserId: string
}) => {

  const dataUser = data.id as string;

    return (
      <div className='lg:m-5 m-0 flex flex-row items-center border lg:p-5 p-5 rounded h-auto w-full justify-between'>
        <div>
          <div className='flex flex-col gap-3'>
            {sessionUserId === dataUser && (
              <Link href={`/min-profil`} className="text-xl font-bold hover:underline" >{data.fisherman} <span className="text-gray-800 font-normal">(dig)</span></Link>  
            )}
            {sessionUserId !== dataUser && (
              <Link href={`/fiskerne/${data.id}`} className='text-xl font-bold hover:underline'>
                {data.fisherman}
              </Link>
            )}
            <FishTypeCard art={data.catch.art} className={"h-14 lg:h-32"}/>
            <p>En {data.catch.art} ved {data.catch.lokation}. <br/> Fanget på {data.catch.agn}.</p>
            <p className='text-sm'>Dato: {new Date(data.catch.dato).toLocaleDateString('da-DK', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
          </div>
        </div>
        {data.catch.imgUrl && (
                <div>
                    <FiskeBillede img={data.catch.imgUrl} trigger={data.catch.imgUrl && <img src={data.catch.imgUrl} alt={data.catch.art} className='rounded lg:max-w-[300px] lg:w-[300px] max-w-[150px]' />}/>
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