"use client";

import { motion } from "framer-motion";
import { ArrowLeft, FileText, Shield, AlertTriangle, Users, Ban, RefreshCw } from "lucide-react";
import Link from "next/link";

const sections = [
  {
    icon: Users,
    title: "Acceptance of Terms",
    content: [
      "By accessing or using CodeSensor, you agree to be bound by these Terms of Service",
      "If you disagree with any part of these terms, you may not use our service",
      "We reserve the right to modify these terms at any time",
      "Continued use after changes constitutes acceptance of new terms",
      "You must be at least 13 years old to use CodeSensor"
    ]
  },
  {
    icon: Shield,
    title: "User Accounts",
    content: [
      "You must provide accurate and complete information during registration",
      "You are responsible for maintaining the security of your account",
      "You must immediately notify us of any unauthorized account access",
      "One person or entity may not maintain multiple free accounts",
      "Accounts are non-transferable",
      "We reserve the right to suspend or terminate accounts that violate these terms"
    ]
  },
  {
    icon: FileText,
    title: "Acceptable Use",
    content: [
      "Use the service only for lawful purposes and code analysis",
      "Do not attempt to access other users' private data",
      "Do not use the service to analyze malicious code or malware",
      "Do not attempt to reverse engineer or hack our systems",
      "Do not abuse our API or attempt to overwhelm our servers",
      "Respect rate limits and usage quotas"
    ]
  },
  {
    icon: Ban,
    title: "Prohibited Activities",
    content: [
      "Uploading or analyzing illegal, harmful, or offensive content",
      "Attempting to circumvent security measures or access controls",
      "Using automated tools to scrape or download large amounts of data",
      "Reselling or redistributing our service without permission",
      "Impersonating other users or entities",
      "Interfering with other users' access to the service"
    ]
  },
  {
    icon: RefreshCw,
    title: "Service Availability",
    content: [
      "We strive for 99.9% uptime but cannot guarantee uninterrupted service",
      "We may perform maintenance or updates with or without notice",
      "We are not liable for any loss resulting from service downtime",
      "Features may be added, modified, or removed at our discretion",
      "Free tier usage is subject to fair use policies and quotas",
      "We reserve the right to throttle or limit usage if necessary"
    ]
  },
  {
    icon: AlertTriangle,
    title: "Intellectual Property",
    content: [
      "You retain all rights to the code you analyze with CodeSensor",
      "CodeSensor's software, algorithms, and UI are our intellectual property",
      "Analysis results and reports generated are licensed to you for personal use",
      "You may not copy, modify, or redistribute our software or algorithms",
      "Our brand, logo, and trademarks are protected and may not be used without permission",
      "We respect DMCA and will respond to valid takedown notices"
    ]
  },
  {
    icon: Shield,
    title: "Liability & Disclaimers",
    content: [
      "CodeSensor is provided 'as is' without warranties of any kind",
      "We are not liable for any damages resulting from use of our service",
      "Analysis results are suggestions, not guarantees of code quality or security",
      "You are solely responsible for code you deploy based on our recommendations",
      "We do not warrant that the service will be error-free or secure",
      "Maximum liability is limited to amount paid for service (if any)"
    ]
  },
  {
    icon: FileText,
    title: "Termination",
    content: [
      "You may terminate your account at any time through account settings",
      "We may suspend or terminate accounts that violate these terms",
      "We may terminate the service entirely with 30 days notice",
      "Upon termination, your data will be deleted per our data retention policy",
      "Some provisions of these terms survive termination",
      "No refunds will be provided for any reason"
    ]
  }
];

export default function TermsPage() {
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
            Terms of{" "}
            <span className="bg-gradient-to-r from-CodeSensor-Secondary to-CodeSensor-Primary bg-clip-text text-transparent">
              Service
            </span>
          </h1>
          
          <p className="text-gray-400 mb-4">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          
          <p className="text-lg text-gray-400 leading-relaxed">
            Please read these Terms of Service carefully before using CodeSensor. 
            By using our service, you agree to be bound by these terms.
          </p>
        </motion.div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
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

        {/* Governing Law */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-8 backdrop-blur-xl bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-800 rounded-2xl p-8"
        >
          <h2 className="text-2xl font-bold mb-4 text-white">
            Governing Law
          </h2>
          <p className="text-gray-400 leading-relaxed">
            These Terms shall be governed by and construed in accordance with applicable laws. 
            Any disputes arising from these terms or your use of CodeSensor shall be resolved through 
            binding arbitration, except where prohibited by law.
          </p>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-8 backdrop-blur-xl bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-800 rounded-2xl p-8"
        >
          <h2 className="text-2xl font-bold mb-4 text-white">
            Questions About These Terms?
          </h2>
          <p className="text-gray-400 mb-6">
            If you have any questions about these Terms of Service, please contact us.
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
