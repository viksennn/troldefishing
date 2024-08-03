"use client";
import React, { useEffect, useState } from 'react';
import { SenesteFangstItem } from "./SenesteFangstItem";

interface FiskeData {
    art: string;
    lokation: string;
    agn: string;
    dato: string;
    imgUrl?: string;
    imgKey?: string;
    _id: string;
}

interface CatchWithFisher {
    catch: FiskeData;
    fisherman: string;
    id: string;
}

interface SenesteFangsterProps {
    initialData: CatchWithFisher[];
    allData: CatchWithFisher[];
    sessionUserId: string;
}

const SenesteFangster: React.FC<SenesteFangsterProps> = ({ initialData, allData, sessionUserId }) => {
    const [data, setData] = useState<CatchWithFisher[]>(initialData);
    const [loadedCount, setLoadedCount] = useState(5);

    const loadMore = () => {
        const newCount = loadedCount + 5;
        setData(allData.slice(0, newCount));
        setLoadedCount(newCount);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100) {
                loadMore();
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [loadedCount, allData]);

    return (
        <div>
            {data.map((item: CatchWithFisher) => (
                <div key={item.catch._id}>
                    <SenesteFangstItem data={item} sessionUserId={sessionUserId}/>
                </div>
            ))}
        </div>
    );
};

export default SenesteFangster;
