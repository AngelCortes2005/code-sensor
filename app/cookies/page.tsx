"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Cookie, Shield, Settings, AlertCircle, Eye, ToggleLeft } from "lucide-react";
import Link from "next/link";

const cookieTypes = [
  {
    icon: Shield,
    title: "Essential Cookies",
    required: true,
    description: "Required for the website to function properly",
    cookies: [
      {
        name: "session_token",
        purpose: "Maintains your login session",
        duration: "7 days",
        type: "HTTP Only"
      },
      {
        name: "csrf_token",
        purpose: "Prevents cross-site request forgery attacks",
        duration: "Session",
        type: "Secure"
      }
    ]
  },
  {
    icon: Eye,
    title: "Analytics Cookies",
    required: false,
    description: "Help us understand how visitors use our website",
    cookies: [
      {
        name: "_ga",
        purpose: "Distinguishes unique users (Google Analytics)",
        duration: "2 years",
        type: "Third-party"
      },
      {
        name: "_gid",
        purpose: "Distinguishes users (Google Analytics)",
        duration: "24 hours",
        type: "Third-party"
      }
    ]
  },
  {
    icon: Settings,
    title: "Preference Cookies",
    required: false,
    description: "Remember your settings and preferences",
    cookies: [
      {
        name: "theme",
        purpose: "Stores your theme preference (dark/light)",
        duration: "1 year",
        type: "First-party"
      },
      {
        name: "language",
        purpose: "Stores your language preference",
        duration: "1 year",
        type: "First-party"
      }
    ]
  }
];

export default function CookiesPage() {
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
            Cookie{" "}
            <span className="bg-gradient-to-r from-CodeSensor-Secondary to-CodeSensor-Primary bg-clip-text text-transparent">
              Policy
            </span>
          </h1>
          
          <p className="text-gray-400 mb-4">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          
          <p className="text-lg text-gray-400 leading-relaxed">
            This Cookie Policy explains how CodeSensor uses cookies and similar technologies 
            to recognize you when you visit our website.
          </p>
        </motion.div>

        {/* What are cookies */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="backdrop-blur-xl bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-800 rounded-2xl p-8 mb-8"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-CodeSensor-Secondary to-CodeSensor-Primary p-3 shrink-0">
              <Cookie className="w-full h-full text-black" />
            </div>
            <h2 className="text-2xl font-bold text-white pt-2">
              What Are Cookies?
            </h2>
          </div>
          
          <div className="ml-16 space-y-4 text-gray-400">
            <p>
              Cookies are small text files that are placed on your computer or mobile device when you visit a website. 
              They are widely used to make websites work more efficiently and provide information to website owners.
            </p>
            <p>
              We use cookies to enhance your experience, keep you signed in, and understand how you use our service. 
              Some cookies are essential for the site to function, while others are optional.
            </p>
          </div>
        </motion.div>

        {/* Cookie Types */}
        <div className="space-y-8 mb-12">
          {cookieTypes.map((type, index) => (
            <motion.div
              key={index}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
              className="backdrop-blur-xl bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-800 rounded-2xl p-8"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-CodeSensor-Secondary to-CodeSensor-Primary p-3 shrink-0">
                    <type.icon className="w-full h-full text-black" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                      {type.title}
                    </h2>
                    <p className="text-gray-400">{type.description}</p>
                  </div>
                </div>
                {type.required ? (
                  <span className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium shrink-0">
                    Required
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium shrink-0">
                    Optional
                  </span>
                )}
              </div>
              
              <div className="ml-16 space-y-4">
                {type.cookies.map((cookie, i) => (
                  <div key={i} className="border-l-2 border-CodeSensor-Primary/30 pl-4">
                    <div className="flex items-start justify-between mb-2">
                      <span className="font-mono text-CodeSensor-Primary">{cookie.name}</span>
                      <span className="text-sm text-gray-500">{cookie.duration}</span>
                    </div>
                    <p className="text-gray-400 text-sm mb-1">{cookie.purpose}</p>
                    <span className="text-xs text-gray-500">{cookie.type}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Managing Cookies */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="backdrop-blur-xl bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-800 rounded-2xl p-8 mb-8"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-CodeSensor-Secondary to-CodeSensor-Primary p-3 shrink-0">
              <ToggleLeft className="w-full h-full text-black" />
            </div>
            <h2 className="text-2xl font-bold text-white pt-2">
              Managing Your Cookie Preferences
            </h2>
          </div>
          
          <div className="ml-16 space-y-4 text-gray-400">
            <p>
              You can control and manage cookies in various ways. Please note that removing or blocking cookies 
              can impact your user experience and parts of our website may no longer be fully accessible.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-CodeSensor-Primary mt-2 shrink-0" />
                <span>Most browsers allow you to refuse or accept cookies</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-CodeSensor-Primary mt-2 shrink-0" />
                <span>You can delete cookies that have already been set</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-CodeSensor-Primary mt-2 shrink-0" />
                <span>Browser settings let you manage cookies on a site-by-site basis</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-CodeSensor-Primary mt-2 shrink-0" />
                <span>You can set your browser to notify you when a cookie is being set</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Third-Party Cookies */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="backdrop-blur-xl bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-800 rounded-2xl p-8 mb-8"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-CodeSensor-Secondary to-CodeSensor-Primary p-3 shrink-0">
              <AlertCircle className="w-full h-full text-black" />
            </div>
            <h2 className="text-2xl font-bold text-white pt-2">
              Third-Party Cookies
            </h2>
          </div>
          
          <div className="ml-16 space-y-4 text-gray-400">
            <p>
              We use minimal third-party services that may set cookies:
            </p>
            <ul className="space-y-3">
              <li className="border-l-2 border-CodeSensor-Primary/30 pl-4">
                <span className="font-semibold text-white">Google Analytics</span>
                <p className="text-sm mt-1">
                  Helps us understand how visitors use our site. You can opt-out at{" "}
                  <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" className="text-CodeSensor-Primary hover:underline">
                    tools.google.com/dlpage/gaoptout
                  </a>
                </p>
              </li>
              <li className="border-l-2 border-CodeSensor-Primary/30 pl-4">
                <span className="font-semibold text-white">GitHub</span>
                <p className="text-sm mt-1">
                  Required for authentication. See GitHub's cookie policy at{" "}
                  <a href="https://docs.github.com/en/site-policy/privacy-policies" target="_blank" className="text-CodeSensor-Primary hover:underline">
                    GitHub Privacy
                  </a>
                </p>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="backdrop-blur-xl bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-800 rounded-2xl p-8"
        >
          <h2 className="text-2xl font-bold mb-4 text-white">
            Questions About Cookies?
          </h2>
          <p className="text-gray-400 mb-6">
            If you have questions about our use of cookies or this Cookie Policy, please contact us.
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
