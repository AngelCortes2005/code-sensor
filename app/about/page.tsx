"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Target, Users, Zap, Shield, Heart, Sparkles } from "lucide-react";
import Link from "next/link";

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description: "Democratize code quality analysis by making enterprise-grade AI tools accessible to every developer, regardless of team size or budget."
  },
  {
    icon: Shield,
    title: "Security First",
    description: "We prioritize your code security and privacy above all else. Your source code is never stored permanently, and all analysis is done in isolated, secure environments."
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "Continuously improving our AI models with the latest advancements in machine learning to provide the most accurate and actionable insights."
  },
  {
    icon: Users,
    title: "Community",
    description: "Built by developers, for developers. We listen to our community and iterate based on real feedback from people who use CodeSensor every day."
  },
  {
    icon: Heart,
    title: "Open Source",
    description: "We believe in giving back to the open source community that has given us so much. Many of our tools and libraries are open source."
  },
  {
    icon: Sparkles,
    title: "Excellence",
    description: "We're obsessed with quality. Every feature is carefully designed and thoroughly tested to ensure the best possible experience."
  }
];

const stats = [
  { value: "50K+", label: "Active Developers" },
  { value: "100K+", label: "Repositories Analyzed" },
  { value: "250K+", label: "Issues Detected" },
  { value: "99.9%", label: "Uptime" }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background effects */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-CodeSensor-Primary/10 via-black to-black pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Back button */}
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-CodeSensor-Primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-block px-4 py-2 rounded-full bg-CodeSensor-Primary/10 border border-CodeSensor-Primary/20 mb-6">
            <span className="text-sm font-medium text-CodeSensor-Primary">About Us</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Building the Future of{" "}
            <span className="bg-gradient-to-r from-CodeSensor-Secondary to-CodeSensor-Primary bg-clip-text text-transparent">
              Code Analysis
            </span>
          </h1>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            CodeSensor was born from a simple idea: every developer deserves access to powerful code analysis tools. 
            We're on a mission to make code quality and security accessible to everyone.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-CodeSensor-Secondary to-CodeSensor-Primary bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Values */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              className="group relative backdrop-blur-xl bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-800 rounded-2xl p-8 hover:border-CodeSensor-Primary/50 transition-all duration-300"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-CodeSensor-Secondary/10 to-CodeSensor-Primary/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-CodeSensor-Secondary to-CodeSensor-Primary p-3 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="w-full h-full text-black" />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold mb-3 text-white">
                  {value.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Story Section */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="backdrop-blur-xl bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-800 rounded-2xl p-12 mb-20"
        >
          <h2 className="text-3xl font-bold mb-6 text-white">Our Story</h2>
          <div className="space-y-4 text-gray-400 leading-relaxed">
            <p>
              CodeSensor started as a side project by a group of developers frustrated with the complexity 
              and cost of existing code analysis tools. We believed that powerful AI-driven insights shouldn't 
              be locked behind enterprise paywalls.
            </p>
            <p>
              What began as a simple script to analyze our own projects quickly grew into a sophisticated 
              platform used by thousands of developers worldwide. Today, CodeSensor analyzes over 100,000 
              repositories and has helped detect more than 250,000 potential issues.
            </p>
            <p>
              We're proud to be completely free and committed to keeping our core features accessible to everyone. 
              Our vision is to help every developer write better, more secure code, regardless of their background 
              or resources.
            </p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-4 text-white">
            Join Our Community
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Be part of a growing community of developers who believe in better code
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/signin"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-CodeSensor-Secondary to-CodeSensor-Primary text-black font-semibold hover:scale-105 transition-transform duration-300"
            >
              Get Started Free
            </Link>
            <Link
              href="https://github.com/AngelCortes2005"
              target="_blank"
              className="px-8 py-4 rounded-full border-2 border-gray-700 hover:border-CodeSensor-Primary text-white font-semibold transition-all duration-300"
            >
              View on GitHub
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
