'use client';

import { signIn } from 'next-auth/react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Github, Shield, Zap, Lock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function SignInPage() {
  const handleSignIn = () => {
    signIn('github', { callbackUrl: '/dashboard' });
  };

  const features = [
    {
      icon: Shield,
      title: 'Secure Authentication',
      description: 'OAuth 2.0 with GitHub for maximum security',
    },
    {
      icon: Zap,
      title: 'Instant Access',
      description: 'Start analyzing your code in seconds',
    },
    {
      icon: Lock,
      title: 'Privacy First',
      description: 'Your code stays private and secure',
    },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-950 via-black to-slate-950 overflow-hidden flex items-center justify-center">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-white/[0.02]" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-CodeSensor-Primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-CodeSensor-Secondary/20 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Branding */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Logo */}
            <Link href="/" className="flex items-center justify-center gap-3 group w-fit">
              <div className="relative w-16 h-16 flex justify-center items-center">
                <div className="absolute inset-0 bg-gradient-to-br from-CodeSensor-Secondary to-CodeSensor-Primary rounded-xl opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-300" />
                <Image 
                  src="/CodeSensorLogo.webp" 
                  alt="CodeSensor Logo" 
                  width={64} 
                  height={64}
                  className="relative rounded-xl"
                />
              </div>
              <span className="text-3xl font-bold text-white">
                Code
                <span className="bg-gradient-to-r from-CodeSensor-Secondary to-CodeSensor-Primary bg-clip-text text-transparent">
                  Sensor
                </span>
              </span>
            </Link>

            {/* Title */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                <span className="text-white">Welcome to </span>
                <span className="block bg-gradient-to-r from-CodeSensor-Secondary to-CodeSensor-Primary bg-clip-text text-transparent">
                  CodeSensor
                </span>
              </h1>
              <p className="text-xl text-gray-400 leading-relaxed">
                AI-powered code analysis for your GitHub repositories. 
                Detect vulnerabilities, improve quality, and ship better code.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-CodeSensor-Secondary/20 to-CodeSensor-Primary/20 border border-CodeSensor-Primary/30 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-CodeSensor-Primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Sign In Card */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-3xl border border-gray-800/50">
              <div className="absolute inset-0 bg-gradient-to-br from-CodeSensor-Secondary/10 via-CodeSensor-Primary/10 to-transparent" />
              
              <div className="relative backdrop-blur-xl bg-gradient-to-br from-gray-900/80 to-black/80 p-8 md:p-12">
                {/* Card Header */}
                <div className="text-center mb-8">
                  <div className="inline-block px-4 py-2 rounded-full bg-CodeSensor-Primary/10 border border-CodeSensor-Primary/20 mb-4">
                    <span className="text-sm font-medium text-CodeSensor-Primary">
                      Sign in to continue
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    Get Started
                  </h2>
                  <p className="text-gray-400">
                    Connect with your GitHub account
                  </p>
                </div>

                {/* GitHub Sign In Button */}
                <Button
                  onClick={handleSignIn}
                  size="lg"
                  className="w-full group relative overflow-hidden bg-white hover:bg-gray-100 text-black px-8 py-6 text-lg font-semibold transition-all duration-300"
                >
                  <Github className="w-6 h-6 mr-3" />
                  <span>Continue with GitHub</span>
                </Button>

                {/* Divider */}
                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-800"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-gray-900/80 text-gray-500">
                      Why GitHub?
                    </span>
                  </div>
                </div>

                {/* Benefits */}
                <div className="space-y-3">
                  {[
                    'Access to all your repositories',
                    'Secure OAuth 2.0 authentication',
                    'No password required',
                    'Revoke access anytime',
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3 text-sm text-gray-400">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-CodeSensor-Secondary to-CodeSensor-Primary flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="mt-8 pt-6 border-t border-gray-800/50 text-center text-sm text-gray-500">
                  By continuing, you agree to our{' '}
                  <Link href="/terms" className="text-CodeSensor-Primary hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-CodeSensor-Primary hover:underline">
                    Privacy Policy
                  </Link>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-CodeSensor-Primary/20 rounded-full blur-2xl animate-pulse" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-CodeSensor-Secondary/20 rounded-full blur-2xl animate-pulse" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}