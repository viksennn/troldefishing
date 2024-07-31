// components/MedalIcon.js
import { FaFish } from 'react-icons/fa';

const MedalIcon = ({ color }:any) => (
    <FaFish className={`w-6 h-6 lg:w-5 lg:h-5 ${color}`} />
);

export default MedalIcon;
