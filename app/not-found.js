"use client";
import { MdOutlineNearbyError } from "react-icons/md";
import { useEffect, useState } from 'react';
import dynamic from "next/dynamic";

const Footer = dynamic(() => import("./components/Footer"), {
  ssr: false,
});

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; 
  }

  return (
    <div className="bg-white">
      <div className="flex flex-col items-center justify-center h-screen bg-[#ffffff] text-center">
        <MdOutlineNearbyError className="w-56 h-56 text-[#FFA90B]" />

        <h2
          id="cta-heading"
          className="text-3xl sm:text-4xl md:text-5xl text-center max-w-2xl mb-4 sm:mb-6 font-bold lg:leading-snug text-[#2B4A55]"
          data-aos="fade-up"
          data-aos-delay="150"
        >
          {t('404.text')}
        </h2>

        <a
          href="/"
          className="uppercase font-bold px-8 py-2 text-3xl bg-[#FFA90B] rounded-full text-white hover:text-white hover:bg-[#2B4A55] hover:border-transparent transition-colors duration-500"
        >
           {t('nav.home')}
        </a>
      </div>
      <Footer />
    </div>
  );
}