'use client';

import React from 'react';
import Image from 'next/image';

interface CardProps {
  image: string;
  title: string;
}

const Card: React.FC<CardProps> = ({ image, title }) => {
  return (
    <div className="bg-white-400 shadow-2xl  p-2 w-80 h-100 hover:shadow-2xl transition-all duration-300">
      <div className="flex justify-center items-center h-[300px] w-full overflow-hidden">
        <Image src={image} alt={title} width={500} height={500}  className="object-contain w-[500px] h-[500px]" />
      </div>
      <h3 className="mt-5 text-center text-xl font-semibold text-orange-500">{title}</h3>
    </div>
  );
};

export default Card;
