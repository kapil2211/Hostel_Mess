'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
  return (
    <div className="relative h-screen w-screen">
      {/* Background Image */}
      <Image
        src="/images/landingpage.jpeg"
        alt="Landing Background"
        fill
        priority
        className="object-cover -z-10"
      />

      {/* Overlay with content */}
      <div className="relative z-10 flex h-full w-full items-center bg-black/50">
        <div className="px-10 max-w-2xl text-white">
          <h3 className="text-3xl sm:text-4xl font-serif">
            Welcome to <span className="font-bold text-orange-400">IIT BHU</span>
          </h3>
          <h1 className="mt-4 text-4xl sm:text-5xl font-serif font-semibold leading-tight">
            Hostel-Mess Management App
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-200">
            Your Mess, Your Way –<br />
            Empowering Hostel Life with Smarter Meal Access,<br />
            Daily Convenience, and Total Transparency.
          </p>

          <div className="mt-6 flex flex-row gap-4">
            
              <Link href="/contact">
                <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 transition text-white font-medium rounded-xl shadow-md">
                  Contact Us
                </button>
              </Link>

              <Link href="/login">
                <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 transition text-white font-medium rounded-xl shadow-md">
                  Explore
                </button>
              </Link>
            

          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Hero;
