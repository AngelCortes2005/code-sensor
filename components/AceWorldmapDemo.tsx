"use client";

import { motion } from "framer-motion";
import AceWorldMap from "@/components/AceWorldmap";
import { Globe, Zap, Users, MapPin, TrendingUp, Shield } from "lucide-react";

const stats = [
  { icon: MapPin, value: '150+', label: 'Countries', color: 'from-blue-500 to-cyan-500' },
  { icon: Zap, value: '<100ms', label: 'Latency', color: 'from-[#019A8E] to-CodeSensor-Primary' },
  { icon: Users, value: '10K+', label: 'Users', color: 'from-purple-500 to-pink-500' },
];

const features = [
  {
    icon: Globe,
    title: 'Global Coverage',
    description: 'Analyze repositories from anywhere in the world with our distributed infrastructure.',
  },
  {
    icon: TrendingUp,
    title: 'High Availability',
    description: 'We guarantee 99.9% uptime with servers in multiple regions.',
  },
  {
    icon: Shield,
    title: 'Distributed Security',
    description: 'Your data is protected with end-to-end encryption.',
  },
];

export default function AceWorldMapDemo() {
  return (
    <section id="how-it-works" className="relative py-32 px-4 overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-CodeSensor-Primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#019A8E]/10 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto relative">
        {/* Grid Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Information */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Badge */}
            <div className="inline-block px-4 py-2 rounded-full bg-CodeSensor-Primary/10 border border-CodeSensor-Primary/20">
              <span className="text-sm font-medium text-CodeSensor-Primary">Global Connectivity</span>
            </div>

            {/* Title */}
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="block text-white">Remote</span>
              <span className="block bg-gradient-to-r from-[#019A8E] to-CodeSensor-Primary bg-clip-text text-transparent">
                Connectivity
              </span>
            </h2>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
              Break traditional barriers. Work from anywhere, in the comfort 
              of your own space. Perfect for digital nomads and remote developers.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="group relative"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 rounded-xl blur-xl transition-opacity duration-300`} />
                  <div className="relative backdrop-blur-xl bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-800 p-4 rounded-xl group-hover:border-CodeSensor-Primary/50 transition-all duration-300">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-2`}>
                      <stat.icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-gray-400">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Features List */}
            <div className="space-y-4 pt-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#019A8E]/20 to-CodeSensor-Primary/20 border border-CodeSensor-Primary/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-5 h-5 text-CodeSensor-Primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - World Map */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#019A8E]/20 to-CodeSensor-Primary/20 rounded-3xl blur-2xl" />
              
              {/* Map Container */}
              <div className="relative rounded-3xl overflow-hidden border border-gray-800/50 bg-black/40 backdrop-blur-sm p-6">
                <AceWorldMap
                  dots={[
                    {
                      start: { lat: 64.2008, lng: -149.4937 }, // Alaska
                      end: { lat: 34.0522, lng: -118.2437 }, // Los Angeles
                    },
                    {
                      start: { lat: 64.2008, lng: -149.4937 }, // Alaska
                      end: { lat: -15.7975, lng: -47.8919 }, // Brazil
                    },
                    {
                      start: { lat: -15.7975, lng: -47.8919 }, // Brazil
                      end: { lat: 38.7223, lng: -9.1393 }, // Lisbon
                    },
                    {
                      start: { lat: 51.5074, lng: -0.1278 }, // London
                      end: { lat: 28.6139, lng: 77.209 }, // New Delhi
                    },
                    {
                      start: { lat: 28.6139, lng: 77.209 }, // New Delhi
                      end: { lat: 43.1332, lng: 131.9113 }, // Vladivostok
                    },
                    {
                      start: { lat: 28.6139, lng: 77.209 }, // New Delhi
                      end: { lat: -1.2921, lng: 36.8219 }, // Nairobi
                    },
                  ]}
                  lineColor="#00FE74"
                  dotColor="#00FE74"
                />
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-CodeSensor-Primary/20 rounded-full blur-2xl animate-pulse" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#019A8E]/20 rounded-full blur-2xl animate-pulse" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}