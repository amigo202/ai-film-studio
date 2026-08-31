import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Film, Menu, X, ArrowUpRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: '/work', label: 'עבודות', enLabel: 'WORK' },
    { to: '/about', label: 'אודות', enLabel: 'ABOUT' },
    { to: '/contact', label: 'צור קשר', enLabel: 'CONTACT' },
  ];

  const isActive = (path: string) => {
    if (path === '/work' && location.pathname.startsWith('/work')) return true;
    return location.pathname === path;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#09090b]/90 backdrop-blur-md border-b border-white/5 py-4'
          : 'bg-gradient-to-b from-[#09090b]/80 to-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Studio Logo */}
        <Link
          to="/"
          className="group flex items-center gap-3 text-white transition-opacity hover:opacity-90"
        >
          <div className="w-9 h-9 rounded-sm bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:border-amber-400/60 transition-colors">
            <Film className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-syne text-base md:text-lg font-bold tracking-wider text-white uppercase flex items-center gap-1.5">
              AI FILM STUDIO
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
            </span>
            <span className="text-[10px] tracking-widest text-zinc-400 uppercase font-mono">
              Creative & Production
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => {
            const active = isActive(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`group relative text-sm tracking-widest uppercase transition-colors py-1 ${
                  active ? 'text-white font-medium' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <span className="font-syne">{link.enLabel}</span>
                  <span className="text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors">/ {link.label}</span>
                </span>
                {active && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-amber-400 shadow-[0_0_8px_rgba(212,175,55,0.6)]" />
                )}
              </Link>
            );
          })}

          <Link
            to="/contact"
            className="group flex items-center gap-2 text-xs uppercase tracking-wider bg-white/5 hover:bg-amber-500/10 text-white hover:text-amber-300 border border-white/10 hover:border-amber-500/30 px-4 py-2 rounded-full transition-all duration-300"
          >
            <span>התחלת פרויקט</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors"
          aria-label="פתח תפריט"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[73px] bg-[#09090b]/98 backdrop-blur-xl border-b border-white/10 z-40 p-8 flex flex-col justify-between">
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-2xl font-syne font-bold uppercase text-zinc-300 hover:text-amber-400 transition-colors py-2 border-b border-white/5 flex items-center justify-between"
              >
                <span>{link.enLabel}</span>
                <span className="text-sm font-hebrew text-zinc-500">{link.label}</span>
              </Link>
            ))}
          </div>

          <div className="pt-8 flex flex-col gap-4">
            <Link
              to="/contact"
              className="w-full text-center py-4 bg-amber-500/20 border border-amber-500/40 text-amber-300 rounded-lg text-base font-bold uppercase tracking-wider"
            >
              בואו נבנה סרט יחד
            </Link>
            <div className="text-center text-xs text-zinc-500 font-mono uppercase">
              AI FILM STUDIO © {new Date().getFullYear()}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
