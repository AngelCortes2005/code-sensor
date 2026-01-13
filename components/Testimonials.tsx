"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Senior Developer",
    company: "Tech Corp",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces",
    content: "CodeSensor caught vulnerabilities we completely missed. The AI analysis is incredibly accurate and has saved us countless hours.",
    rating: 5,
  },
  {
    name: "Marcus Rodriguez",
    role: "CTO",
    company: "StartupXYZ",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces",
    content: "Best code analysis tool I've used. The detailed reports and actionable insights make it easy to improve our codebase quality.",
    rating: 5,
  },
  {
    name: "Emily Watson",
    role: "Lead Engineer",
    company: "DevFlow",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces",
    content: "The security analysis alone is worth it. We've significantly reduced vulnerabilities since implementing CodeSensor.",
    rating: 5,
  },
  {
    name: "James Kim",
    role: "Full Stack Dev",
    company: "CloudNine",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces",
    content: "Game changer for our team. The AI recommendations are spot-on and help us maintain high code quality standards.",
    rating: 5,
  },
  {
    name: "Linda Johnson",
    role: "Product Lead",
    company: "InnovateLab",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop&crop=faces",
    content: "Fast, accurate, and incredibly easy to use. CodeSensor has become an essential part of our development workflow.",
    rating: 5,
  },
  {
    name: "David Park",
    role: "Security Engineer",
    company: "SecureCode",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=faces",
    content: "The vulnerability detection is exceptional. It's like having a security expert review every line of code.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-32 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-gray-900/50 to-black/70" />
      
      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-medium text-yellow-500">Trusted by Developers</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            What Developers{" "}
            <span className="bg-gradient-to-r from-CodeSensor-Secondary to-CodeSensor-Primary bg-clip-text text-transparent">
              Are Saying
            </span>
          </h2>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
            Join thousands of developers who trust CodeSensor for their code analysis needs.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-CodeSensor-Secondary/20 to-CodeSensor-Primary/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Card */}
              <div className="relative h-full backdrop-blur-xl bg-gradient-to-br from-gray-900/90 to-black/90 border border-gray-800 p-8 rounded-3xl group-hover:border-CodeSensor-Primary/50 transition-all duration-300">
                {/* Quote icon */}
                <Quote className="w-10 h-10 text-CodeSensor-Primary/30 mb-4" />
                
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                
                {/* Content */}
                <p className="text-gray-300 leading-relaxed mb-6">
                  "{testimonial.content}"
                </p>
                
                {/* Author */}
                <div className="flex items-center gap-4 pt-4 border-t border-gray-800/50">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-CodeSensor-Secondary to-CodeSensor-Primary p-0.5">
                    <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center overflow-hidden">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="rounded-full"
                        unoptimized
                      />
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
