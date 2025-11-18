'use client';
import { useState, useEffect } from "react";
import Image from "next/image";
import MeteorsBackground from "../components/MeteorsBackground";
import ContentSections from "@/components/ContentSections";
import HeroSection from "@/components/HeroSection";
import MainHeader from "@/components/layout/MainHeader";
import PlanetAnimation from "@/components/PlanetAnimation";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const blurIntensity = Math.min(scrollY / 50, 4); 

  return (
    <div className="relative">
      <div 
        className="fixed inset-0 transition-all duration-300"
        style={{
          backdropFilter: `blur(${blurIntensity}px)`,
          WebkitBackdropFilter: `blur(${blurIntensity}px)`,
        }}
      />
      
      <div className="relative">
        <MeteorsBackground />
        <PlanetAnimation />
        <MainHeader />
        <HeroSection />
        <ContentSections />
      </div>
    </div>
  );
}