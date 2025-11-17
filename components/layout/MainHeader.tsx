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
      scrolled ? 'bg-gray-900/80 backdrop-blur-md' : 'bg-transparent'
    }`}>
      <div className="text-2xl font-bold flex items-center space-x-2">
        <Image src="/CodeSensorLogo.webp" 
        alt="CodeSensor Logo" 
        width={60} 
        height={60} />
        <span>Code<span className="text-[#00FE74]">Sensor</span></span>
      </div>
      
      <nav className="hidden md:block">
        <ul className="flex space-x-8">
          <li>
            <a href="#features" className="text-white hover:text-blue-400 transition-colors">
              Características
            </a>
          </li>
          <li>
            <a href="#how-it-works" className="text-white hover:text-blue-400 transition-colors">
              Cómo funciona
            </a>
          </li>
          <li>
            <a href="#pricing" className="text-white hover:text-blue-400 transition-colors">
              Precios
            </a>
          </li>
        </ul>
      </nav>
      
      <button className="bg-linear-to-r from-blue-400 to-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all">
        Comenzar
      </button>
    </header>
  );
}

export default MainHeader