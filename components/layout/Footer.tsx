"use client";

import Link from "next/link";
import { Github, Mail, Linkedin, type LucideIcon } from "lucide-react";
import Image from "next/image";

// Footer link sections - Easy to edit
const FOOTER_SECTIONS = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "Testimonials", href: "#testimonials" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "GitHub", href: "https://github.com/AngelCortes2005" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "https://cortes-portfolio.vercel.app/en" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Cookies", href: "/cookies" },
      { label: "License", href: "/license" },
    ],
  },
];

// Social media links - Easy to add/remove
const SOCIAL_LINKS: { icon: LucideIcon; href: string; label: string }[] = [
  { icon: Github, href: "https://github.com/AngelCortes2005", label: "GitHub" },
  { icon: Mail, href: "mailto:cortts.dev@gmail.com", label: "Email" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/angelcortesm/", label: "LinkedIn" },
];

// Company info - Easy to update
const COMPANY_INFO = {
  name: "CodeSensor",
  logo: "/CodeSensorLogo.webp",
  description: "AI-powered code analysis for modern developers",
};

export default function Footer() {
  return (
    <footer className="relative border-t border-gray-800 bg-black/40 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Top section - Link columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-CodeSensor-Secondary to-CodeSensor-Primary bg-clip-text text-transparent">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-CodeSensor-Primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent mb-8" />

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image
              src={COMPANY_INFO.logo}
              alt={`${COMPANY_INFO.name} Logo`}
              width={32}
              height={32}
            />
            <span className="text-xl font-bold bg-gradient-to-r from-CodeSensor-Secondary to-CodeSensor-Primary bg-clip-text text-transparent">
              {COMPANY_INFO.name}
            </span>
          </div>

          {/* Copyright */}
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved.
          </p>

          {/* Social links */}
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                target="_blank"
                className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center text-gray-400 hover:text-CodeSensor-Primary hover:border-CodeSensor-Primary transition-all duration-300"
                aria-label={social.label}
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
