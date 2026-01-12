"use client";

import { motion } from "framer-motion";
import { Code2, Shield, TrendingUp, Zap, GitBranch, FileCheck } from "lucide-react";

const KEY_FEATURES = [
  {
    icon: GitBranch,
    title: "GitHub Integration",
    description: "Seamless connection with your GitHub repositories for instant analysis.",
  },
  {
    icon: Code2,
    title: "AI-Powered Analysis",
    description: "Advanced machine learning algorithms evaluate your code quality and structure.",
  },
  {
    icon: TrendingUp,
    title: "Quality Scoring",
    description: "Comprehensive scoring system with detailed breakdowns across multiple criteria.",
  },
  {
    icon: Zap,
    title: "Smart Recommendations",
    description: "Actionable insights to improve maintainability and code health instantly.",
  },
  {
    icon: FileCheck,
    title: "Interactive Reports",
    description: "Beautiful, modern dashboards with visual metrics and improvement paths.",
  },
  {
    icon: Shield,
    title: "Security First",
    description: "Detect vulnerabilities and security issues before they become problems.",
  },
];

export default function FeaturesGrid() {
  return (
    <section id="features" className="relative py-32 px-4">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-CodeSensor-Secondary/5 to-transparent" />
      
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
            <span className="text-sm font-medium text-CodeSensor-Primary">Features</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            Everything you need to{" "}
            <span className="bg-gradient-to-r from-CodeSensor-Secondary to-CodeSensor-Primary bg-clip-text text-transparent">
              ship faster
            </span>
          </h2>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
            Powerful tools designed to help you write better code, faster.
          </p>
        </motion.div>

        {/* Grid de features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {KEY_FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group relative"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-CodeSensor-Secondary/20 to-CodeSensor-Primary/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Card */}
              <div className="relative h-full backdrop-blur-xl bg-gradient-to-br from-gray-900/50 to-black/50 border border-gray-800 p-8 rounded-3xl group-hover:border-CodeSensor-Primary/50 transition-all duration-300">
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-CodeSensor-Secondary to-CodeSensor-Primary p-3 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-full h-full text-black" />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold mb-3 text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>

                {/* Decorative line */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-CodeSensor-Secondary to-CodeSensor-Primary group-hover:w-full transition-all duration-500 rounded-b-3xl" />
              </div>
            </motion.div> 
          ))}
        </div>
      </div>
    </section>
  );
}
