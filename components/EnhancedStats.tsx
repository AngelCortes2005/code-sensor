"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, Shield, Zap, Code, GitBranch } from "lucide-react";
import { useEffect, useState } from "react";

const stats = [
  {
    icon: Users,
    value: 50000,
    label: "Active Developers",
    suffix: "+",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Code,
    value: 100000,
    label: "Repositories Analyzed",
    suffix: "+",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Shield,
    value: 250000,
    label: "Vulnerabilities Detected",
    suffix: "+",
    color: "from-red-500 to-orange-500",
  },
  {
    icon: Zap,
    value: 2.5,
    label: "Avg. Analysis Time",
    suffix: "min",
    color: "from-yellow-500 to-amber-500",
  },
  {
    icon: GitBranch,
    value: 99.9,
    label: "Uptime",
    suffix: "%",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: TrendingUp,
    value: 95,
    label: "Customer Satisfaction",
    suffix: "%",
    color: "from-indigo-500 to-blue-500",
  },
];

function Counter({ value, duration = 2000, decimals = 0 }: { value: number; duration?: number; decimals?: number }) {
  const [count, setCount] = useState(0);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    
    let start = 0;
    const end = value;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, duration, isInView]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      onViewportEnter={() => setIsInView(true)}
    >
      {count.toFixed(decimals).toLocaleString()}
    </motion.div>
  );
}

export default function EnhancedStats() {
  return (
    <section className="relative py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Trusted by{" "}
            <span className="bg-gradient-to-r from-CodeSensor-Secondary to-CodeSensor-Primary bg-clip-text text-transparent">
              Thousands
            </span>
          </h2>
          <p className="text-lg text-gray-400">
            The numbers speak for themselves
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ y: 40, opacity: 0, scale: 0.9 }}
              whileInView={{ y: 0, opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative"
            >
              {/* Glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
              
              {/* Card */}
              <div className="relative overflow-hidden rounded-2xl backdrop-blur-xl bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-800 p-6 md:p-8 hover:border-gray-700 transition-all duration-300 group-hover:scale-105">
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br ${stat.color} p-3 mb-4 md:mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="w-full h-full text-white" />
                  </div>
                  
                  {/* Value */}
                  <div className="space-y-1 md:space-y-2">
                    <div className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent flex items-baseline gap-1">
                      <Counter 
                        value={stat.value} 
                        decimals={stat.suffix === "min" || stat.suffix === "%" ? 1 : 0}
                      />
                      <span className="text-2xl md:text-3xl">{stat.suffix}</span>
                    </div>
                    <p className="text-sm md:text-base text-gray-400 font-medium">
                      {stat.label}
                    </p>
                  </div>
                </div>

                {/* Shine effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
