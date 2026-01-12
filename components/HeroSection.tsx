"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ArrowRight, Sparkles, Code2, Shield } from 'lucide-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleGetStarted = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (status === 'authenticated') {
      router.push('/dashboard');
    } else {
      router.push('/signin');
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="text-center z-10 max-w-6xl mx-auto px-4 py-20">
        {/* Badge superior */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#019A8E]/10 to-CodeSensor-Primary/10 border border-[#019A8E]/20 backdrop-blur-sm mb-8"
        >
          <Sparkles className="w-4 h-4 text-CodeSensor-Primary" />
          <span className="text-sm font-medium text-gray-300">Powered by Advanced AI</span>
        </motion.div>

        {/* Título principal */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-6xl md:text-8xl font-bold mb-6 leading-tight"
        >
          <span className="block text-white">Analyze Your</span>
          <span className="block bg-gradient-to-r from-[#019A8E] via-CodeSensor-Primary to-[#00FE74] bg-clip-text text-transparent">
            Code Intelligence
          </span>
        </motion.h1>
         
        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto font-light leading-relaxed"
        >
          Advanced AI-powered analysis for your repositories. 
          Get instant feedback on quality, security, and best practices.
        </motion.p>
        
        {/* Botones */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href="/dashboard"
            onClick={handleGetStarted}
            className="group relative px-8 py-4 bg-gradient-to-r from-[#019A8E] to-CodeSensor-Primary rounded-full font-semibold text-lg text-black overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,254,116,0.4)] hover:scale-105"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Free Analysis
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </Link>

          <Link
            href="#features"
            className="group px-8 py-4 border-2 border-gray-700 hover:border-CodeSensor-Primary rounded-full font-semibold text-lg text-white transition-all duration-300 hover:bg-CodeSensor-Primary/5"
          >
            Explore Features
          </Link>
        </motion.div>

        {/* Stats minimalistas */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-3 gap-8 mt-20 max-w-3xl mx-auto"
        >
          {[
            { icon: Code2, value: '10K+', label: 'Repositories' },
            { icon: Shield, value: '50K+', label: 'Issues Found' },
            { icon: Sparkles, value: '99%', label: 'Accuracy' },
          ].map((stat, index) => (
            <div key={index} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#019A8E]/5 to-CodeSensor-Primary/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              <div className="relative p-6 rounded-2xl border border-gray-800 bg-black/40 backdrop-blur-sm group-hover:border-CodeSensor-Primary/50 transition-all duration-300">
                <stat.icon className="w-8 h-8 text-CodeSensor-Primary mb-3 mx-auto" />
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs text-gray-500 uppercase tracking-widest">Scroll</span>
          <div className="w-6 h-10 border-2 border-gray-700 rounded-full p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-3 bg-CodeSensor-Primary rounded-full mx-auto"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default HeroSection;