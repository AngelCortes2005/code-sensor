import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const HeroSection = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">

      <div className="text-center z-10 max-w-4xl mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mb-6"
        >
          Analyze Your Code With{' '}
          <span className="bg-linear-to-r from-[#019A8E] to-CodeSensor-Primary bg-clip-text text-transparent">
            Artificial Intelligence
          </span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
        >
          Code Sensor uses advanced AI to review your repositories and 
          provide detailed feedback on the quality, security, and 
          best practices of your code.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button className="bg-[#1A1A1A] text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors">
            Try for Free
          </button>
          <button className="border border-gray-600 hover:border-gray-400 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors">
            View Demo
          </button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <div className="animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </motion.div>
    </section>
  );
}

export default HeroSection