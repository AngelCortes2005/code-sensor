"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Scale, FileText, Users, Code } from "lucide-react";
import Link from "next/link";

export default function LicensePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background effects */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-CodeSensor-Primary/10 via-black to-black pointer-events-none" />
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
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
          className="mb-16"
        >
          <div className="inline-block px-4 py-2 rounded-full bg-CodeSensor-Primary/10 border border-CodeSensor-Primary/20 mb-6">
            <span className="text-sm font-medium text-CodeSensor-Primary">Legal</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            License &{" "}
            <span className="bg-gradient-to-r from-CodeSensor-Secondary to-CodeSensor-Primary bg-clip-text text-transparent">
              Usage Rights
            </span>
          </h1>
          
          <p className="text-gray-400 mb-4">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          
          <p className="text-lg text-gray-400 leading-relaxed">
            This page describes the licenses and usage rights for CodeSensor's platform, 
            services, and any open-source components.
          </p>
        </motion.div>

        {/* Service License */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="backdrop-blur-xl bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-800 rounded-2xl p-8 mb-8"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-CodeSensor-Secondary to-CodeSensor-Primary p-3 shrink-0">
              <Scale className="w-full h-full text-black" />
            </div>
            <h2 className="text-2xl font-bold text-white pt-2">
              CodeSensor Platform License
            </h2>
          </div>
          
          <div className="ml-16 space-y-4 text-gray-400">
            <p className="font-semibold text-white">Proprietary Software License</p>
            <p>
              The CodeSensor platform, including its web application, AI models, algorithms, and infrastructure, 
              is proprietary software owned by CodeSensor. All rights reserved.
            </p>
            
            <p className="font-semibold text-white mt-6">What You Can Do:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-CodeSensor-Primary mt-2 shrink-0" />
                <span>Use the service for personal or commercial code analysis</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-CodeSensor-Primary mt-2 shrink-0" />
                <span>Share analysis results within your organization</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-CodeSensor-Primary mt-2 shrink-0" />
                <span>Export and download your analysis reports</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-CodeSensor-Primary mt-2 shrink-0" />
                <span>Integrate with our API (when available)</span>
              </li>
            </ul>

            <p className="font-semibold text-white mt-6">What You Cannot Do:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                <span>Copy, modify, or distribute our software or algorithms</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                <span>Reverse engineer or attempt to extract our source code</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                <span>Resell or sublicense access to CodeSensor</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                <span>Use our branding or trademarks without permission</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Your Code License */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="backdrop-blur-xl bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-800 rounded-2xl p-8 mb-8"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-CodeSensor-Secondary to-CodeSensor-Primary p-3 shrink-0">
              <Code className="w-full h-full text-black" />
            </div>
            <h2 className="text-2xl font-bold text-white pt-2">
              Your Code Ownership
            </h2>
          </div>
          
          <div className="ml-16 space-y-4 text-gray-400">
            <p className="font-semibold text-white">You Retain All Rights</p>
            <p>
              You retain all intellectual property rights to any code you analyze using CodeSensor. 
              We do not claim any ownership over your code.
            </p>
            
            <p className="font-semibold text-white mt-6">Limited License to CodeSensor:</p>
            <p>
              By using our service, you grant CodeSensor a limited, non-exclusive license to:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-CodeSensor-Primary mt-2 shrink-0" />
                <span>Temporarily process your code for analysis purposes</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-CodeSensor-Primary mt-2 shrink-0" />
                <span>Generate and store analysis results</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-CodeSensor-Primary mt-2 shrink-0" />
                <span>Use anonymized, aggregated data to improve our AI models</span>
              </li>
            </ul>

            <p className="mt-4 text-sm bg-CodeSensor-Primary/5 border border-CodeSensor-Primary/20 rounded-lg p-4">
              <strong className="text-CodeSensor-Primary">Note:</strong> Your source code is processed in-memory 
              and never permanently stored on our servers. Only analysis results are retained.
            </p>
          </div>
        </motion.div>

        {/* Open Source */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="backdrop-blur-xl bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-800 rounded-2xl p-8 mb-8"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-CodeSensor-Secondary to-CodeSensor-Primary p-3 shrink-0">
              <FileText className="w-full h-full text-black" />
            </div>
            <h2 className="text-2xl font-bold text-white pt-2">
              Open Source Components
            </h2>
          </div>
          
          <div className="ml-16 space-y-4 text-gray-400">
            <p>
              CodeSensor uses various open-source libraries and frameworks. We're grateful to the open-source 
              community and comply with all applicable licenses.
            </p>
            
            <p className="font-semibold text-white mt-6">Major Open Source Dependencies:</p>
            <ul className="space-y-3">
              <li className="border-l-2 border-CodeSensor-Primary/30 pl-4">
                <span className="font-semibold text-white">Next.js</span> - MIT License
                <p className="text-sm mt-1">React framework for production</p>
              </li>
              <li className="border-l-2 border-CodeSensor-Primary/30 pl-4">
                <span className="font-semibold text-white">React</span> - MIT License
                <p className="text-sm mt-1">JavaScript library for building user interfaces</p>
              </li>
              <li className="border-l-2 border-CodeSensor-Primary/30 pl-4">
                <span className="font-semibold text-white">Tailwind CSS</span> - MIT License
                <p className="text-sm mt-1">Utility-first CSS framework</p>
              </li>
              <li className="border-l-2 border-CodeSensor-Primary/30 pl-4">
                <span className="font-semibold text-white">Framer Motion</span> - MIT License
                <p className="text-sm mt-1">Animation library for React</p>
              </li>
            </ul>

            <p className="mt-6 text-sm">
              Full list of dependencies and their licenses can be found in our package.json and related 
              documentation on GitHub.
            </p>
          </div>
        </motion.div>

        {/* API License */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="backdrop-blur-xl bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-800 rounded-2xl p-8 mb-8"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-CodeSensor-Secondary to-CodeSensor-Primary p-3 shrink-0">
              <Users className="w-full h-full text-black" />
            </div>
            <h2 className="text-2xl font-bold text-white pt-2">
              API Usage License (Coming Soon)
            </h2>
          </div>
          
          <div className="ml-16 space-y-4 text-gray-400">
            <p>
              When our API becomes available, additional terms will apply:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-CodeSensor-Primary mt-2 shrink-0" />
                <span>Rate limits and usage quotas will apply</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-CodeSensor-Primary mt-2 shrink-0" />
                <span>API keys must be kept confidential</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-CodeSensor-Primary mt-2 shrink-0" />
                <span>Commercial use may require a paid license</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-CodeSensor-Primary mt-2 shrink-0" />
                <span>Attribution to CodeSensor may be required</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="backdrop-blur-xl bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-800 rounded-2xl p-8"
        >
          <h2 className="text-2xl font-bold mb-4 text-white">
            License Questions or Commercial Use?
          </h2>
          <p className="text-gray-400 mb-6">
            If you have questions about licensing or need a custom license for commercial use, 
            please contact us.
          </p>
          <Link
            href="mailto:cortts.dev@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-CodeSensor-Secondary to-CodeSensor-Primary text-black font-semibold hover:scale-105 transition-transform duration-300"
          >
            Contact Us
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
