// components/FiskMedals.js
import React from 'react';
import MedalIcon from './MedalIcon';

const getMedals = (count:any ) => {
    const medals = [];
    
    // Calculate number of each medal based on count
    const diamondCount = Math.floor(count / 30);
    const goldCount = Math.floor((count % 30) / 20);
    const silverCount = Math.floor((count % 20) / 10);
    const bronzeCount = Math.floor((count % 10) / 5);
    const copperCount = count % 5;

    // Add diamond medals
    for (let i = 0; i < diamondCount; i++) {
        medals.push(<MedalIcon key={`diamond-${i}`} color="text-blue-400" />);
    }

    // Add gold medals
    for (let i = 0; i < goldCount; i++) {
        medals.push(<MedalIcon key={`gold-${i}`} color="text-amber-400" />);
    }
    
    // Add silver medals
    for (let i = 0; i < silverCount; i++) {
        medals.push(<MedalIcon key={`silver-${i}`} color="text-gray-600" />);
    }
    
    // Add bronze medals
    for (let i = 0; i < bronzeCount; i++) {
        medals.push(<MedalIcon key={`bronze-${i}`} color="text-amber-700" />);
    }

    // Add copper medals
    for (let i = 0; i < copperCount; i++) {
        medals.push(<MedalIcon key={`copper-${i}`} color="text-orange-800" />);
    }
    
    return medals;
}


const FiskMedals = ({ count }:any) => {
    const medals = getMedals(count);
    
    return (
        <div className="flex space-x-2">
            {medals}
        </div>
    );
}

export default FiskMedals;
