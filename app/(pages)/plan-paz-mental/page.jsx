"use client";
import dynamic from "next/dynamic";
import Navbar from "../../components/Navbar";

const PlanPazMentalHero = dynamic(() => import("../../components/plan-paz-mental/Hero"), {
  ssr: false,
});

const PalabrasCarrusel = dynamic(() => import("../../components/plan-paz-mental/PalabrasCarrusel"), {
  ssr: false,
});

const LogosCarousel = dynamic(() => import("../../components/plan-paz-mental/LogosCarousel"), {
  ssr: false,
});

const Features = dynamic(() => import("../../components/plan-paz-mental/Features"), {
  ssr: false,
});


const Pricing = dynamic(() => import("../../components/plan-paz-mental/Pricing"), {
  ssr: false,
});


const FinalCTA = dynamic(() => import("../../components/plan-paz-mental/FinalCTA"), {
  ssr: false,
});

const Footer = dynamic(() => import("../../components/Footer"), {
  ssr: false,
});

const PlanPazMental = () => {
  return (
    <main className="bg-[#101010] py-5 px-2 overflow-x-hidden">
      <div className="bg-[#B2FF00] rounded-xl mx-auto max-w-[110rem] relative">
        <Navbar
          textColor="text-black"
          menuColor="bg-black"
          buttonBgColor="bg-black"
          buttonTextColor="text-[#B2FF00]"
          buttonTextColorHover="hover:text-white"
          buttonHoverColor="hover:bg-[#000000]"
          logoVariant="dark"
          linkHoverColor="hover:text-[#000000] transition-all duration-300"
        />
      </div>
      <div className="space-y-6 mt-6">
        <PalabrasCarrusel />
        <PlanPazMentalHero />
        <LogosCarousel />
        <Features />
        <Pricing />
        <FinalCTA />
      </div>
      <Footer />
    </main>
  );
};

export default PlanPazMental;