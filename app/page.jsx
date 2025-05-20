"use client";
import dynamic from "next/dynamic";
import Hero from "./components/Hero";

const Navbar = dynamic(() => import("./components/Navbar"), {
  ssr: false,
});

const Footer = dynamic(() => import("./components/Footer"), {
  ssr: false,
});

const Home = () => {
  return (
    <main className="bg-[#1E1E1E] py-5 px-3">
      <Hero />
      <Footer />
    </main>
  );
};

export default Home;