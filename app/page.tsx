'use client';
import Image from "next/image";
import MeteorsBackground from "../components/MeteorsBackground";
import ContentSections from "@/components/ContentSections";
import HeroSection from "@/components/HeroSection";
import MainHeader from "@/components/layout/MainHeader";
import PlanetAnimation from "@/components/PlanetAnimation";

export default function Home() {
  return (
    <div className="">
      <MeteorsBackground />
      <PlanetAnimation />
      <MainHeader />
      <HeroSection />
      <ContentSections />
    </div>
  );
}
