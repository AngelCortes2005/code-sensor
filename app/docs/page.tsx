"use client";

import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Code, Terminal, Zap, Shield, GitBranch } from "lucide-react";
import Link from "next/link";

const docs = [
  {
    icon: Zap,
    title: "Getting Started",
    description: "Quick guide to set up and analyze your first repository",
    content: [
      "1. Sign in with your GitHub account",
      "2. Select a repository from your list",
      "3. Click 'Analyze Repository'",
      "4. Review the AI-generated insights",
      "5. Implement suggested improvements"
    ]
  },
  {
    icon: Code,
    title: "How Analysis Works",
    description: "Understanding our AI-powered code analysis",
    content: [
      "Advanced ML models trained on millions of repositories",
      "Multi-dimensional quality scoring system",
      "Security vulnerability detection",
      "Best practices and pattern recognition",
      "Real-time feedback and recommendations"
    ]
  },
  {
    icon: Shield,
    title: "Security & Privacy",
    description: "Your code security is our top priority",
    content: [
      "OAuth 2.0 authentication with GitHub",
      "No permanent storage of your source code",
      "Encrypted data transmission (TLS 1.3)",
      "Isolated analysis environment",
      "Full compliance with GitHub's API policies"
    ]
  },
  {
    icon: GitBranch,
    title: "Supported Languages",
    description: "We analyze code across multiple languages",
    content: [
      "JavaScript / TypeScript (Full support)",
      "Python (Full support)",
      "Java / Kotlin (Full support)",
      "Go / Rust (Full support)",
      "PHP / Ruby (Full support)",
      "And many more..."
    ]
  },
  {
    icon: Terminal,
    title: "API Integration",
    description: "Integrate CodeSensor into your workflow",
    content: [
      "RESTful API endpoints (Coming Soon)",
      "CI/CD pipeline integration",
      "Webhook notifications",
      "Custom analysis rules",
      "Bulk repository scanning"
    ]
  },
  {
    icon: BookOpen,
    title: "Best Practices",
    description: "Get the most out of CodeSensor",
    content: [
      "Run analysis on each major feature branch",
      "Review security findings immediately",
      "Track quality trends over time",
      "Share reports with your team",
      "Implement fixes iteratively"
    ]
  }
];

export default function DocumentationPage() {
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
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 rounded-full bg-CodeSensor-Primary/10 border border-CodeSensor-Primary/20 mb-6">
            <span className="text-sm font-medium text-CodeSensor-Primary">Documentation</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-CodeSensor-Secondary to-CodeSensor-Primary bg-clip-text text-transparent">
              Get Started
            </span>
          </h1>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Comprehensive guides and documentation to help you analyze your code effectively
          </p>
        </motion.div>

        {/* Documentation cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {docs.map((doc, index) => (
            <motion.div
              key={index}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative backdrop-blur-xl bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-800 rounded-2xl p-8 hover:border-CodeSensor-Primary/50 transition-all duration-300"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-CodeSensor-Secondary/10 to-CodeSensor-Primary/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative">
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-CodeSensor-Secondary to-CodeSensor-Primary p-3 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <doc.icon className="w-full h-full text-black" />
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-bold mb-3 text-white">
                  {doc.title}
                </h3>
                <p className="text-gray-400 mb-6">
                  {doc.description}
                </p>
                
                {/* List */}
                <ul className="space-y-2">
                  {doc.content.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-CodeSensor-Primary mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="backdrop-blur-xl bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-800 rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-4 text-white">
              Ready to Get Started?
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Sign in with GitHub and start analyzing your repositories in seconds
            </p>
            <Link
              href="/signin"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-CodeSensor-Secondary to-CodeSensor-Primary text-black font-semibold hover:scale-105 transition-transform duration-300"
            >
              Start Free Analysis
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
