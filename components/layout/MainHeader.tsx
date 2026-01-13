"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, ArrowRight, X, User, LogOut, LayoutDashboard, Settings, ChevronDown } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const MainHeader = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = (): void => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Security', href: '#security' },
  ];

  const resourcesDropdown = [
    { section: 'Resources', items: [
      { name: 'Documentation', href: '/docs' },
      { name: 'GitHub', href: 'https://github.com/AngelCortes2005', external: true },
    ]},
    { section: 'Company', items: [
      { name: 'About', href: '/about' },
      { name: 'Contact', href: 'https://cortes-portfolio.vercel.app/en', external: true },
    ]},
    { section: 'Legal', items: [
      { name: 'Privacy', href: '/privacy' },
      { name: 'Terms', href: '/terms' },
      { name: 'Cookies', href: '/cookies' },
      { name: 'License', href: '/license' },
    ]},
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMobileMenuOpen(false);
    
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleGetStarted = () => {
    if (status === 'authenticated') {
      router.push('/dashboard');
    } else {
      router.push('/signin');
    }
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  const getUserInitials = () => {
    if (!session?.user?.name) return 'U';
    return session.user.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const isLandingPage = pathname === '/';

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-black/70 backdrop-blur-2xl border-b border-white/5 shadow-2xl shadow-black/50' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group relative z-10">
            <div className="relative w-11 h-11 md:w-12 md:h-12">
              <div className="absolute inset-0 bg-gradient-to-br from-CodeSensor-Secondary to-CodeSensor-Primary rounded-xl opacity-20 blur-lg group-hover:opacity-40 group-hover:blur-xl transition-all duration-500" />
              <div className="relative w-full h-full bg-gradient-to-br from-CodeSensor-Secondary to-CodeSensor-Primary rounded-xl p-0.5">
                <div className="w-full h-full bg-black rounded-[10px] flex items-center justify-center overflow-hidden">
                  <Image 
                    src="/CodeSensorLogo.webp" 
                    alt="CodeSensor" 
                    width={40} 
                    height={40}
                    className="relative rounded-lg group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
            <div className="hidden sm:block">
              <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-transparent group-hover:from-CodeSensor-Secondary group-hover:via-CodeSensor-Primary group-hover:to-CodeSensor-Primary transition-all duration-500">
                CodeSensor
              </span>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          {isLandingPage && (
            <nav className="hidden md:flex items-center gap-1">
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="relative px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-300 group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-CodeSensor-Secondary to-CodeSensor-Primary group-hover:w-4/5 transition-all duration-300" />
                </a>
              ))}
              
              {/* More Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="relative px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-300 group outline-none flex items-center gap-1">
                  More
                  <ChevronDown className="w-3 h-3" />
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-CodeSensor-Secondary to-CodeSensor-Primary group-hover:w-4/5 transition-all duration-300" />
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="end" 
                  className="w-64 bg-gray-950/95 backdrop-blur-xl border-gray-800 mt-2"
                >
                  {resourcesDropdown.map((section, idx) => (
                    <div key={section.section}>
                      <div className="px-3 py-2">
                        <p className="text-xs font-semibold text-CodeSensor-Primary/70 uppercase tracking-wider">
                          {section.section}
                        </p>
                      </div>
                      {section.items.map((item) => (
                        <DropdownMenuItem key={item.name} asChild>
                          <Link
                            href={item.href}
                            target={item.external ? '_blank' : undefined}
                            className="cursor-pointer hover:bg-white/5 text-gray-300 flex items-center justify-between"
                          >
                            <span>{item.name}</span>
                            {item.external && (
                              <ArrowRight className="w-3 h-3 opacity-50 -rotate-45" />
                            )}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                      {idx < resourcesDropdown.length - 1 && (
                        <DropdownMenuSeparator className="bg-gray-800 my-1" />
                      )}
                    </div>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>
          )}
          
          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {status === 'authenticated' ? (
              <>
                {/* Dashboard Link - Desktop */}
                {isLandingPage && (
                  <Link
                    href="/dashboard"
                    className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Link>
                )}

                {/* User Menu - Desktop */}
                <DropdownMenu>
                  <DropdownMenuTrigger className="hidden md:flex items-center gap-2 px-3 py-2 rounded-full hover:bg-white/5 transition-all duration-300 outline-none">
                    <Avatar className="w-8 h-8 border-2 border-CodeSensor-Primary/50">
                      <AvatarImage src={session.user?.image || undefined} />
                      <AvatarFallback className="bg-gradient-to-br from-CodeSensor-Secondary to-CodeSensor-Primary text-black text-sm font-bold">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-white max-w-[100px] truncate">
                      {session.user?.name?.split(' ')[0] || 'User'}
                    </span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    align="end" 
                    className="w-56 bg-gray-950/95 backdrop-blur-xl border-gray-800 mt-2"
                  >
                    <div className="px-3 py-2 border-b border-gray-800">
                      <p className="text-sm font-medium text-white">{session.user?.name}</p>
                      <p className="text-xs text-gray-400 truncate">{session.user?.email}</p>
                    </div>
                    <DropdownMenuItem 
                      onClick={() => router.push('/dashboard')}
                      className="cursor-pointer hover:bg-white/5 text-gray-300"
                    >
                      <LayoutDashboard className="w-4 h-4 mr-2" />
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-gray-800" />
                    <DropdownMenuItem 
                      onClick={handleSignOut}
                      className="cursor-pointer hover:bg-red-500/10 text-red-400"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <button
                onClick={handleGetStarted}
                className="hidden md:flex items-center gap-2 relative group overflow-hidden px-6 py-2.5 rounded-full font-semibold transition-all duration-300 hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-CodeSensor-Secondary to-CodeSensor-Primary" />
                <div className="absolute inset-0 bg-gradient-to-r from-CodeSensor-Primary to-CodeSensor-Primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 text-black font-medium">Get Started</span>
                <ArrowRight className="relative z-10 w-4 h-4 text-black group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            )}

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTitle className='hidden'>Menu</SheetTitle>
              <SheetTrigger asChild className="md:hidden">
                <button className="p-2.5 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 text-white hover:bg-white/10 transition-all duration-300">
                  <Menu size={20} />
                </button>
              </SheetTrigger>
              <SheetContent 
                side="right" 
                className="w-[320px] bg-black/98 backdrop-blur-2xl border-l border-white/10 p-0"
              >
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="flex items-center justify-between p-6 border-b border-white/10">
                    {status === 'authenticated' ? (
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10 border-2 border-CodeSensor-Primary/50">
                          <AvatarImage src={session.user?.image || undefined} />
                          <AvatarFallback className="bg-gradient-to-br from-CodeSensor-Secondary to-CodeSensor-Primary text-black text-sm font-bold">
                            {getUserInitials()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-semibold text-white">{session.user?.name}</p>
                          <p className="text-xs text-gray-400">{session.user?.email}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-CodeSensor-Secondary to-CodeSensor-Primary rounded-lg" />
                        <span className="text-lg font-bold text-white">CodeSensor</span>
                      </div>
                    )}
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="flex-1 px-4 py-6 overflow-y-auto">
                    {status === 'authenticated' && (
                      <ul className="space-y-2 mb-6">
                        <li>
                          <button
                            onClick={() => {
                              router.push('/dashboard');
                              setMobileMenuOpen(false);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300"
                          >
                            <LayoutDashboard className="w-5 h-5" />
                            <span className="font-medium">Dashboard</span>
                          </button>
                        </li>
                      </ul>
                    )}

                    {isLandingPage && (
                      <>
                        <ul className="space-y-2 mb-6">
                          {navigationItems.map((item, index) => (
                            <li key={item.name}>
                              <a 
                                href={item.href}
                                onClick={(e) => handleNavClick(e, item.href)}
                                className="flex items-center justify-between px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300"
                              >
                                <span className="font-medium">{item.name}</span>
                                <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-CodeSensor-Primary" />
                              </a>
                            </li>
                          ))}
                        </ul>

                        {/* Additional Links */}
                        {resourcesDropdown.map((section) => (
                          <div key={section.section} className="mb-6">
                            <h4 className="px-4 py-2 text-xs font-semibold text-CodeSensor-Primary/70 uppercase tracking-wider">
                              {section.section}
                            </h4>
                            <ul className="space-y-2">
                              {section.items.map((item) => (
                                <li key={item.name}>
                                  <Link
                                    href={item.href}
                                    target={item.external ? '_blank' : undefined}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center justify-between px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300"
                                  >
                                    <span className="font-medium">{item.name}</span>
                                    {item.external && (
                                      <ArrowRight className="w-4 h-4 text-CodeSensor-Primary/50 -rotate-45" />
                                    )}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </>
                    )}
                  </nav>

                  {/* Mobile Footer */}
                  <div className="p-4 border-t border-white/10 bg-gradient-to-t from-black/50 to-transparent">
                    {status === 'authenticated' ? (
                      <button
                        onClick={() => {
                          handleSignOut();
                          setMobileMenuOpen(false);
                        }}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-red-400 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-all duration-300"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            handleGetStarted();
                            setMobileMenuOpen(false);
                          }}
                          className="w-full relative group overflow-hidden px-6 py-3.5 rounded-xl font-bold transition-all duration-300"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-CodeSensor-Secondary to-CodeSensor-Primary" />
                          <div className="absolute inset-0 bg-gradient-to-r from-CodeSensor-Primary to-CodeSensor-Primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <span className="relative z-10 text-black flex items-center justify-center gap-2">
                            Get Started Free
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </button>
                        <p className="text-center text-xs text-gray-500 mt-3">
                          No credit card required
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

export default MainHeader;