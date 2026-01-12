"use client";

import { motion } from "framer-motion";
import { Github, Brain, FileSearch, CheckCircle, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Github,
    number: "01",
    title: "Connect Your Repository",
    description: "Sign in with GitHub and select the repositories you want to analyze. No complex setup required.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Brain,
    number: "02",
    title: "AI Analysis",
    description: "Our advanced AI scans your code for quality issues, security vulnerabilities, and structural improvements.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: FileSearch,
    number: "03",
    title: "Detailed Reports",
    description: "Get comprehensive insights with actionable recommendations and priority-based fixes.",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: CheckCircle,
    number: "04",
    title: "Improve & Ship",
    description: "Implement suggested improvements and ship better, more secure code with confidence.",
    color: "from-green-500 to-emerald-500",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-32 px-4 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-CodeSensor-Primary/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-block px-4 py-2 rounded-full bg-CodeSensor-Primary/10 border border-CodeSensor-Primary/20 mb-6">
            <span className="text-sm font-medium text-CodeSensor-Primary">How It Works</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            Start Analyzing in{" "}
            <span className="bg-gradient-to-r from-CodeSensor-Secondary to-CodeSensor-Primary bg-clip-text text-transparent">
              Minutes
            </span>
          </h2>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
            Simple, fast, and powerful. Get started with just a few clicks.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection line - Desktop */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className="relative group"
              >
                {/* Card */}
                <div className="relative h-full backdrop-blur-xl bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-800 p-8 rounded-3xl hover:border-CodeSensor-Primary/50 transition-all duration-500">
                  {/* Glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${step.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                  
                  {/* Number badge */}
                  <div className="absolute -top-6 left-8">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                      <span className="text-white font-bold text-lg">{step.number}</span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative mt-8">
                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} p-4 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <step.icon className="w-full h-full text-white" />
                    </div>
                    
                    {/* Text */}
                    <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-CodeSensor-Secondary group-hover:to-CodeSensor-Primary group-hover:bg-clip-text transition-all duration-300">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  
                  {/* Arrow - Desktop only */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                      <ArrowRight className="w-8 h-8 text-CodeSensor-Primary animate-pulse" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
