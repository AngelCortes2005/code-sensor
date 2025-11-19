"use client";
import Link from "next/link";
import { Github, Database, Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";



const navItems = [
  { icon: <Github />, title: "Repositories", href: "/dashboard/repos" },
  { icon: <Database />, title: "History", href: "/dashboard/history" },
];

export default function DashboardSideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

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
      <button
        onClick={() => setIsOpen(true)}
        className="text-heading bg-transparent p-2 inline-flex md:hidden"
      >
        <Menu />
      </button>


      <div
        ref={sidebarRef}
        className={`fixed bg-[#1a1a1a] top-0 left-0 z-40 w-64 h-full transition-transform
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        bg-neutral-primary-soft border-e rounded-r-3xl`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <li className="flex items-center justify-between">
              <span className="ms-3 text-xl text-transparent bg-clip-text bg-linear-to-r from-[#019A8E] to-CodeSensor-Primary shadow font-bold">Dashboard</span>
              <X className="md:hidden cursor-pointer" onClick={() => setIsOpen(false)} />
            </li>

            {navItems.map((item) => (
              <li key={item.title}>
                <Link
                  href={item.href}
                  className="flex items-center px-2 py-1.5 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand"
                >
                  {item.icon}
                  <span className="flex-1 ms-3 whitespace-nowrap">{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
