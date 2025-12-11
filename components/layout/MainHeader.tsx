"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, ArrowRight, X } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle
} from "@/components/ui/sheet";

const MainHeader = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Security', href: '#security' },
  ];

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={`fixed w-full py-4 px-6 flex justify-between items-center z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-black/80 backdrop-blur-xl border-gray-800/50 shadow-lg shadow-black/20' 
        : 'bg-transparent'
    }`}>
      {/* Logo */}
      <Link href="/" className="flex items-center space-x-3 group">
        <div className="relative w-12 h-12 md:w-14 md:h-14 justify-center items-center flex">
          <div className="absolute inset-0 bg-gradient-to-br from-[#019A8E] to-CodeSensor-Primary rounded-xl opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-300" />
          <Image 
            src="/CodeSensorLogo.webp" 
            alt="CodeSensor Logo" 
            width={56} 
            height={56}
            className="relative rounded-xl"
          />
        </div>
        <span className="text-xl md:text-2xl font-bold text-white">
          Code
          <span className="bg-gradient-to-r from-[#019A8E] to-CodeSensor-Primary bg-clip-text text-transparent">
            Sensor
          </span>
        </span>
      </Link>
      
      {/* Desktop Navigation */}
      <nav className={`hidden md:flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 mr-15 ${
        scrolled ? 'bg-transparent' : 'bg-gray-900/60 backdrop-blur-md border-gray-800/50'
      }`}>
        <ul className="flex items-center gap-8">
          {navigationItems.map((item) => (
            <li key={item.name}>
              <a 
                href={item.href} 
                className="relative text-gray-300 hover:text-white transition-colors duration-300 group py-2"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#019A8E] to-CodeSensor-Primary group-hover:w-full transition-all duration-300" />
              </a>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* CTA Button Desktop */}
      <Link 
        href="/dashboard"
        className="hidden md:block relative group overflow-hidden px-6 py-2.5 rounded-full font-semibold transition-all duration-300"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#019A8E] to-CodeSensor-Primary" />
        <div className="absolute inset-0 bg-gradient-to-r from-CodeSensor-Primary to-[#019A8E] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className="relative z-10 text-black">Get Started</span>
      </Link>

      {/* Mobile Menu Sheet */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetTitle className='hidden'>Menu</SheetTitle>
        <SheetTrigger asChild className="md:hidden">
          <button className="p-2 rounded-lg bg-gray-900/60 border border-gray-800/50 text-white hover:bg-gray-800/60 transition-colors">
            <Menu size={24} />
          </button>
        </SheetTrigger>
        <SheetContent 
          side="right" 
          className="w-[300px] sm:w-[400px] bg-black/95 backdrop-blur-xl border-l border-gray-800/50"
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-800/50">
              <div className="flex items-center justify-center gap-2">
                <div className="relative">
                  <Image 
                    src="/CodeSensorLogo.webp" 
                    alt="Logo" 
                    width={35} 
                    height={35}
                    className="rounded-lg"
                  />
                </div>
                <span className="text-lg font-bold text-white">
                  CodeSensor
                </span>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-6 py-8">
              <ul className="space-y-1">
                {navigationItems.map((item, index) => (
                  <li key={item.name}>
                    <a 
                      href={item.href}
                      onClick={handleNavClick}
                      className="flex items-center justify-between px-4 py-4 rounded-xl text-gray-300 hover:text-white hover:bg-gray-800/30 transition-all duration-300 group"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <span className="text-lg font-medium">{item.name}</span>
                      <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-CodeSensor-Primary" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Footer CTA */}
            <div className="p-6 border-t border-gray-800/50 bg-gradient-to-t from-black/50 to-transparent">
              <Link 
                href="/dashboard"
                onClick={handleNavClick}
                className="flex items-center justify-center gap-2 w-full relative group overflow-hidden px-6 py-4 rounded-full font-semibold transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#019A8E] to-CodeSensor-Primary" />
                <div className="absolute inset-0 bg-gradient-to-r from-CodeSensor-Primary to-[#019A8E] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 text-black font-bold">Get Started Free</span>
                <ArrowRight className="relative z-10 w-5 h-5 text-black group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <p className="text-center text-xs text-gray-500 mt-4">
                No credit card required • Free forever
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}

export default MainHeader;