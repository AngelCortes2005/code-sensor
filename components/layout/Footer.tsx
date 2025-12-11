"use client";

import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative border-t border-gray-800 bg-black/40 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Top section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
          {/* Product */}
          <div>
            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-[#019A8E] to-CodeSensor-Primary bg-clip-text text-transparent">
              Product
            </h3>
            <ul className="space-y-3">
              {['Features', 'How It Works', 'Pricing', 'Reports'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-400 hover:text-CodeSensor-Primary transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-[#019A8E] to-CodeSensor-Primary bg-clip-text text-transparent">
              Resources
            </h3>
            <ul className="space-y-3">
              {['Documentation', 'GitHub', 'Roadmap', 'API'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-400 hover:text-CodeSensor-Primary transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-[#019A8E] to-CodeSensor-Primary bg-clip-text text-transparent">
              Company
            </h3>
            <ul className="space-y-3">
              {['About', 'Blog', 'Careers', 'Contact'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-400 hover:text-CodeSensor-Primary transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-[#019A8E] to-CodeSensor-Primary bg-clip-text text-transparent">
              Legal
            </h3>
            <ul className="space-y-3">
              {['Privacy', 'Terms', 'Cookies', 'License'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-400 hover:text-CodeSensor-Primary transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent mb-8" />

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image src="/CodeSensorLogo.webp" alt="CodeSensor Logo" width={32} height={32} />
            <span className="text-xl font-bold bg-gradient-to-r from-[#019A8E] to-CodeSensor-Primary bg-clip-text text-transparent">
              CodeSensor
            </span>
          </div>

          {/* Copyright */}
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} CodeSensor. All rights reserved.
          </p>

          {/* Social links */}
          <div className="flex items-center gap-4">
            {[
              { icon: Github, href: '#' },
              { icon: Twitter, href: '#' },
              { icon: Linkedin, href: '#' },
            ].map((social, index) => (
              <Link
                key={index}
                href={social.href}
                className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center text-gray-400 hover:text-CodeSensor-Primary hover:border-CodeSensor-Primary transition-all duration-300"
              >
                <social.icon className="w-5 h-5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
