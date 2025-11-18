import { useState, useEffect } from 'react';
import Image from 'next/image';

const MainHeader = () => {
    const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full py-5 px-5 flex justify-between items-center z-50 transition-all duration-300 ${
      scrolled ? 'bg-gray-800/80 backdrop-blur-md' : 'bg-transparent'
    }`}>
      <div className="text-2xl font-bold flex items-center space-x-2">
        <Image src="/CodeSensorLogo.webp" 
        alt="CodeSensor Logo" 
        width={60} 
        height={60} />
        <span>Code<span className="text-CodeSensor-Primary">Sensor</span></span>
      </div>
      
      <nav className={`hidden md:block px-6 py-3 rounded-full mr-16 ${
      scrolled ? 'bg-transparent' : 'bg-gray-800/80 backdrop-blur-sm'}`}>
        <ul className="flex space-x-8">
          <li>
            <a href="#features" className="text-white hover:text-blue-400 transition-colors">
              Fetures
            </a>
          </li>
          <li>
            <a href="#how-it-works" className="text-white hover:text-blue-400 transition-colors">
              How It Works
            </a>
          </li>
          <li>
            <a href="#pricing" className="text-white hover:text-blue-400 transition-colors">
              Pricing
            </a>
          </li>
        </ul>
      </nav>
      
      <button className="w-35 bg-linear-to-r from-[#019A8E] to-CodeSensor-Primary hover:from-CodeSensor-Primary hover:to-[#019A8E] transition duration-300 text-white px-6 py-2 rounded-full font-semibold">
        Start
      </button>
    </header>
  );
}

export default MainHeader