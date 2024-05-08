"use client"

import { IoFish } from 'react-icons/io5';
import { motion } from "framer-motion";

export const LoadingFish = () => {
    
    return (
        <motion.div className='flex w-full h-[80vh] justify-center items-center'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        >
            <div className='pb-[50px] animate-spin'>
                <IoFish size={40}/>
            </div>
        </motion.div>
    );
}