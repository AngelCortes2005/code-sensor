'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Home, Search, ArrowLeft, Code2, Bug, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const codeSnippets = [
    "Error: Page not found",
    "404: Resource missing",
    "null.reference.exception",
    "undefined is not a function",
    "Cannot read property 'page'",
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-950 via-black to-slate-950 overflow-hidden flex items-center justify-center">
      {/* Animated background */}
      <div className="absolute inset-0 bg-grid-white/[0.02]" />
      
      {/* Gradient orbs */}
      <div 
        className="absolute w-96 h-96 bg-CodeSensor-Primary/20 rounded-full blur-3xl transition-all duration-300 ease-out"
        style={{
          left: `${mousePosition.x - 192}px`,
          top: `${mousePosition.y - 192}px`,
        }}
      />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-CodeSensor-Secondary/20 rounded-full blur-3xl" />

      {/* Floating code snippets */}
      {codeSnippets.map((snippet, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 100 }}
          animate={{ 
            opacity: [0.1, 0.3, 0.1],
            y: [100, -100],
            x: [0, Math.random() * 100 - 50]
          }}
          transition={{
            duration: 10 + index * 2,
            repeat: Infinity,
            delay: index * 0.5,
          }}
          className="absolute text-xs md:text-sm text-gray-700 font-mono"
          style={{
            left: `${10 + index * 15}%`,
            top: `${20 + index * 10}%`,
          }}
        >
          {snippet}
        </motion.div>
      ))}

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        {/* 404 Illustration */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="relative inline-block">
            {/* Glitch effect */}
            <motion.div
              animate={{
                x: [0, -5, 5, -5, 5, 0],
                opacity: [1, 0.8, 1, 0.8, 1],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatDelay: 3,
              }}
              className="text-[150px] md:text-[250px] font-bold leading-none"
            >
              <span className="bg-gradient-to-r from-CodeSensor-Secondary via-CodeSensor-Primary to-CodeSensor-Secondary bg-clip-text text-transparent">
                404
              </span>
            </motion.div>

            {/* Decorative elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-8 -right-8 w-16 h-16 border-2 border-dashed border-CodeSensor-Primary/30 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-8 -left-8 w-20 h-20 border-2 border-dashed border-CodeSensor-Secondary/30 rounded-full"
            />
          </div>
        </motion.div>

        {/* Error Icons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          {[Bug, Terminal, Code2].map((Icon, index) => (
            <motion.div
              key={index}
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.3,
              }}
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-800 flex items-center justify-center"
            >
              <Icon className="w-6 h-6 text-CodeSensor-Primary" />
            </motion.div>
          ))}
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="space-y-4 mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            Page Not Found
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            Oops! It seems like this page took a coffee break and never came back. 
            The code might be broken, or the page doesn't exist.
          </p>
        </motion.div>

        {/* Error Box */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="backdrop-blur-xl bg-gradient-to-br from-gray-900/50 to-black/50 border border-gray-800 rounded-2xl p-6 text-left">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-red-500 mt-2" />
              <div className="flex-1 font-mono text-sm">
                <div className="text-gray-500 mb-2">
                  <span className="text-red-400">Error</span>: Page not found
                </div>
                <div className="text-gray-400">
                  at <span className="text-CodeSensor-Primary">getStaticPaths</span> (app/not-found.tsx:1:1)
                </div>
                <div className="text-gray-400">
                  at <span className="text-CodeSensor-Primary">renderToHTML</span> (server.js:42:10)
                </div>
                <div className="text-gray-500 mt-2">
                  → The requested page could not be found
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            asChild
            size="lg"
            className="group relative overflow-hidden bg-gradient-to-r from-CodeSensor-Secondary to-CodeSensor-Primary hover:shadow-[0_0_40px_rgba(0,254,116,0.3)] px-8 py-6 text-lg font-semibold transition-all duration-300"
          >
            <Link href="/">
              <Home className="mr-2 w-5 h-5" />
              <span className="relative z-10 text-black">Back to Home</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Link>
          </Button>
        </motion.div>

        {/* Popular Links */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-16 pt-8 border-t border-gray-800/50"
        >
          <p className="text-sm text-gray-500 mb-4">Or try one of these popular pages:</p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { name: 'Features', href: '/#features' },
              { name: 'How It Works', href: '/#how-it-works' },
              { name: 'Security', href: '/#security' },
              { name: 'Dashboard', href: '/dashboard' },
            ].map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="px-4 py-2 rounded-full bg-gray-900/60 border border-gray-800 text-sm text-gray-400 hover:text-white hover:border-CodeSensor-Primary transition-all duration-300"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Animated lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <motion.line
          x1="0"
          y1="0"
          x2="100%"
          y2="100%"
          stroke="url(#gradient1)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.line
          x1="100%"
          y1="0"
          x2="0"
          y2="100%"
          stroke="url(#gradient2)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 1, repeat: Infinity }}
        />
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#019A8E" stopOpacity="0" />
            <stop offset="50%" stopColor="#00FE74" stopOpacity="1" />
            <stop offset="100%" stopColor="#019A8E" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="gradient2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00FE74" stopOpacity="0" />
            <stop offset="50%" stopColor="#019A8E" stopOpacity="1" />
            <stop offset="100%" stopColor="#00FE74" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}