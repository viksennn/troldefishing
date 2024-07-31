"use client"
import React, { useEffect, useState } from 'react';
import { PAGE_URL } from '../url';
import { FiskeBillede } from './ui/FiskeBillede';
import { FaFish } from 'react-icons/fa6';
import Link from 'next/link';
import { FishTypeCard } from './achivements/FishTypeCard';

interface FiskeData {
  art: string;
  lokation: string;
  agn: string;
  dato: string;
  imgUrl?: string;
  imgKey?: string;
  _id: string;
}

interface Person {
  _id: string;
  navn: string;
  password: string;
  fiskeData: FiskeData[];
  __v: number;
}

interface CatchWithFisher {
  catch: FiskeData;
  fisherman: string;
  id: string;
}

const SenesteFangst: React.FC = () => {
  const [latestCatches, setLatestCatches] = useState<CatchWithFisher[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${PAGE_URL}/api/fisk`;
        const res = await fetch(url, { cache: "no-store" });
        const data: Person[] = await res.json();

        if (data.length > 0) {
          const allCatches: CatchWithFisher[] = data.flatMap(person => 
            person.fiskeData.map(fiskeData => ({
              catch: fiskeData,
              fisherman: person.navn,
              id: person._id
            }))
          );

          // Sorterer efter dato
          allCatches.sort((a, b) => new Date(b.catch.dato).getTime() - new Date(a.catch.dato).getTime());

          // Sætter de tre seneste fangster
          setLatestCatches(allCatches.slice(0, 3));
        }
      } catch (error) {
        console.error('Fejl ved hentning af data:', error);
      }
    };

    fetchData();
  }, []);

  if (latestCatches.length === 0) {
    return (
      <div className='flex flex-col justify-center items-center w-[500px] h-[350px]'>
        <FaFish className='animate-spin' size={25} />
      </div>
    );
  }

  return (
    <>
      <div className='flex flex-col gap-6 items-center'>
        {latestCatches.map((latestCatch) => (
          <div key={latestCatch.catch._id} className='flex flex-row gap-10 items-center border p-5 rounded lg:w-[500px] lg:h-[200px] w-full justify-between'>
            <div>
              <div className='flex flex-col gap-3'>
                <Link href={`/fiskerne/${latestCatch.id}`} className='text-xl font-bold hover:underline'>
                  {latestCatch.fisherman}
                </Link>
                <FishTypeCard art={latestCatch.catch.art} className="h-8"/>
                <p>En <span className='font-semibold'>{latestCatch.catch.art}</span> ved {latestCatch.catch.lokation}. <br/> Fanget på {latestCatch.catch.agn}.</p>
                <p className='text-sm'>Dato: {new Date(latestCatch.catch.dato).toLocaleDateString('da-DK', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
              </div>
            </div>
            {latestCatch.catch.imgUrl && (
              <div>
                <FiskeBillede img={latestCatch.catch.imgUrl} trigger={latestCatch.catch.imgUrl && <img src={latestCatch.catch.imgUrl} alt={latestCatch.catch.art} className='rounded max-w-[200px] w-[125px]' />}/>
              </div>
            )}
            {!latestCatch.catch.imgUrl && (
              <div className='flex items-center justify-center w-[125px] h-[125px] bg-gray-200 rounded'>
                <FaFish size={50} />
              </div>
            )}
          </div>
        ))}
        <div>
          <p className='text-sm'>Viser de seneste tre fangster</p>
        </div>
      </div>
    </>
  );
};

export default SenesteFangst;
