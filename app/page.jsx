"use client";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("./components/Navbar"), {
  ssr: false,
});

const Home = () => {
  return (
    <main className="">
      <Navbar />
    </main>
  );
};

export default Home;