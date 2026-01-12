"use client";
import Link from "next/link";
import { Github, Database, Menu, X, LayoutDashboard, Activity } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const navItems = [
  { icon: <LayoutDashboard className="w-5 h-5" />, title: "Dashboard", href: "/dashboard" },
  { icon: <Github className="w-5 h-5" />, title: "Repositories", href: "/dashboard/repos" },
  { icon: <Activity className="w-5 h-5" />, title: "History", href: "/dashboard/history" },
];

export default function DashboardSideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const width = window.innerWidth;
    setIsOpen(width >= 768); 
  }, []);


  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node) &&
        window.innerWidth < 768 
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-30 md:hidden p-3 bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border border-gray-800 rounded-xl hover:border-CodeSensor-Primary/50 transition-all"
      >
        <Menu className="w-5 h-5 text-white" />
      </button>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed md:sticky md:top-0 bg-gradient-to-b from-slate-900/95 to-black/95 backdrop-blur-xl top-0 left-0 z-40 w-72 h-screen transition-transform border-r border-gray-800/50
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
        aria-label="Sidebar"
      >
        <div className="h-full px-4 py-6 overflow-y-auto">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between px-3">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-CodeSensor-Secondary to-CodeSensor-Primary rounded-xl flex items-center justify-center">
                  <Github className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-CodeSensor-Secondary to-CodeSensor-Primary bg-clip-text text-transparent">
                  CodeSensor
                </span>
              </div>
              <button 
                className="md:hidden p-2 hover:bg-gray-800/50 rounded-lg transition-colors" 
                onClick={() => setIsOpen(false)}
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    onClick={() => window.innerWidth < 768 && setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group
                      ${isActive 
                        ? 'bg-gradient-to-r from-CodeSensor-Secondary/20 to-CodeSensor-Primary/20 text-white border border-CodeSensor-Primary/30' 
                        : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                      }`}
                  >
                    <span className={isActive ? 'text-CodeSensor-Primary' : 'group-hover:text-CodeSensor-Primary transition-colors'}>
                      {item.icon}
                    </span>
                    <span className="font-medium">{item.title}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Footer Info */}
            <div className="absolute bottom-6 left-4 right-4">
              <div className="px-4 py-3 rounded-xl bg-gradient-to-br from-gray-900/50 to-black/50 border border-gray-800/50">
                <p className="text-xs text-gray-500">
                  Analyze and monitor your repositories
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
