"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Shield, Lock, Eye, Database, FileCheck, AlertCircle } from "lucide-react";
import Link from "next/link";

const sections = [
  {
    icon: Database,
    title: "Data Collection",
    content: [
      "We only collect data necessary to provide our service",
      "GitHub OAuth credentials (encrypted and never stored)",
      "Repository metadata (name, URL, language)",
      "Analysis results and quality scores",
      "Basic usage analytics to improve our service",
      "We NEVER store your source code permanently"
    ]
  },
  {
    icon: Lock,
    title: "Data Security",
    content: [
      "All data transmission encrypted with TLS 1.3",
      "OAuth 2.0 authentication with GitHub",
      "Isolated analysis environments for each request",
      "Regular security audits and penetration testing",
      "Compliance with industry security standards",
      "Source code analyzed in-memory and immediately discarded"
    ]
  },
  {
    icon: Eye,
    title: "Data Usage",
    content: [
      "Analysis results stored to show your history",
      "Aggregate, anonymous data used to improve AI models",
      "Usage metrics to optimize performance",
      "No selling or sharing of personal data to third parties",
      "No tracking across other websites or services",
      "You can request deletion of all your data anytime"
    ]
  },
  {
    icon: FileCheck,
    title: "Your Rights",
    content: [
      "Access your data at any time through your dashboard",
      "Export all your analysis history in JSON format",
      "Delete your account and all associated data",
      "Opt-out of analytics and usage tracking",
      "Request correction of inaccurate information",
      "Contact us with privacy concerns anytime"
    ]
  },
  {
    icon: Shield,
    title: "Third-Party Services",
    content: [
      "GitHub API for repository access (GitHub's privacy policy applies)",
      "Groq AI for code analysis (data not stored by Groq)",
      "Supabase for database services (SOC 2 Type II certified)",
      "Vercel for hosting (GDPR compliant)",
      "No advertising or tracking networks",
      "All third parties are carefully vetted for security"
    ]
  },
  {
    icon: AlertCircle,
    title: "Cookies & Tracking",
    content: [
      "Essential cookies for authentication only",
      "No advertising or marketing cookies",
      "Session cookies to maintain your login state",
      "Optional analytics cookies (can be disabled)",
      "No cross-site tracking or fingerprinting",
      "You can clear cookies anytime in your browser"
    ]
  }
];

export default function PrivacyPage() {
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
            Privacy{" "}
            <span className="bg-gradient-to-r from-CodeSensor-Secondary to-CodeSensor-Primary bg-clip-text text-transparent">
              Policy
            </span>
          </h1>
          
          <p className="text-gray-400 mb-4">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          
          <p className="text-lg text-gray-400 leading-relaxed">
            At CodeSensor, your privacy and security are our top priorities. This policy explains how we collect, 
            use, and protect your information.
          </p>
        </motion.div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="backdrop-blur-xl bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-800 rounded-2xl p-8"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-CodeSensor-Secondary to-CodeSensor-Primary p-3 shrink-0">
                  <section.icon className="w-full h-full text-black" />
                </div>
                <h2 className="text-2xl font-bold text-white pt-2">
                  {section.title}
                </h2>
              </div>
              
              <ul className="space-y-3 ml-16">
                {section.content.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-CodeSensor-Primary mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Contact Section */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-16 backdrop-blur-xl bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-800 rounded-2xl p-8"
        >
          <h2 className="text-2xl font-bold mb-4 text-white">
            Questions About Privacy?
          </h2>
          <p className="text-gray-400 mb-6">
            If you have any questions or concerns about how we handle your data, 
            please don't hesitate to reach out.
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
