"use client"
import React, { useEffect, useState } from 'react';
import { PAGE_URL } from '../url';
import { FiskeBillede } from './ui/FiskeBillede';
import { FishIcon } from 'lucide-react';
import { FaFish } from 'react-icons/fa6';
import Link from 'next/link';

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
  id: string,
}

const SenesteFangst: React.FC = () => {
  const [latestCatch, setLatestCatch] = useState<CatchWithFisher | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${PAGE_URL}/api/fisk`;
        const res = await fetch(url, { cache: "no-store" }); // Tilpas URL'en til din API-endpoint
        const data: Person[] = await res.json();

        const dataLength = data.length;

        if (data.length > 0) {
          // Samler alle fiskeData med fiskerens navn i én liste
          const allCatches: CatchWithFisher[] = data.flatMap(person => 
            person.fiskeData.map(fiskeData => ({
              catch: fiskeData,
              fisherman: person.navn,
              id: person._id
            }))
          );

          // Sorterer efter dato
          allCatches.sort((a, b) => new Date(a.catch.dato).getTime() - new Date(b.catch.dato).getTime());

          // Sætter den seneste fangst
          setLatestCatch(allCatches[allCatches.length - 1]);
        }
      } catch (error) {
        console.error('Fejl ved hentning af data:', error);
      }
    };

    fetchData();
  }, []);

  if (!latestCatch) return (
    <div className='flex flex-col justify-center items-center w-[500px] h-[350px]'>
        <FaFish className='animate-spin' size={25}/>
    </div>
  );

  return (
    <div className='flex lg:flex-row flex-col gap-10 items-center border p-5 rounded lg:w-[500px] lg:h-[350px] w-screen justify-between'>
      <div>
        <div className='flex flex-col gap-3'>
            <Link href={`/fiskerne/${latestCatch.id}`} className='text-xl font-bold hover:underline'>{latestCatch.fisherman}</Link>
            <p>En {latestCatch.catch.art} ved {latestCatch.catch.lokation}. <br/> Fanget på {latestCatch.catch.agn}.</p>
            <p className='text-sm'>Dato: {new Date(latestCatch.catch.dato).toLocaleDateString()}</p>
        </div>
      </div>
      <div>
        <FiskeBillede img={latestCatch.catch.imgUrl} trigger={latestCatch.catch.imgUrl && <img src={latestCatch.catch.imgUrl} alt={latestCatch.catch.art} style={{ maxWidth: '200px' }} className=' rounded' />}/>
      </div>
    </div>
  );
};

export default SenesteFangst;
