import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Film, Menu, X, ArrowUpRight, Calculator } from 'lucide-react';
import { PriceCalculatorModal } from '../calculator/PriceCalculatorModal';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [calculatorOpen, setCalculatorOpen] = useState(false);
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
    { to: '/work', label: 'עבודות' },
    { to: '/about', label: 'אודות' },
    { to: '/contact', label: 'צור קשר' },
  ];

  const isActive = (path: string) => {
    if (path === '/work' && location.pathname.startsWith('/work')) return true;
    return location.pathname === path;
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
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
            <div className="flex flex-col text-right">
              <span className="font-syne text-base md:text-lg font-bold tracking-wider text-white uppercase flex items-center gap-1.5">
                AmitAI
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
              </span>
              <span className="text-[10px] tracking-widest text-zinc-400 uppercase font-mono">
                אמיתי כהן · בימוי והפקת סרטי AI
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 font-hebrew">
            {navLinks.map((link) => {
              const active = isActive(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`group relative text-sm tracking-wide transition-colors py-1 ${
                    active ? 'text-amber-400 font-bold' : 'text-zinc-300 hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-amber-400 shadow-[0_0_8px_rgba(212,175,55,0.6)]" />
                  )}
                </Link>
              );
            })}

            {/* Quick Price Calculator Button */}
            <button
              type="button"
              onClick={() => setCalculatorOpen(true)}
              className="flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-black bg-amber-400/10 hover:bg-amber-400 border border-amber-400/30 px-4 py-2 rounded-full transition-all duration-300 shadow-sm"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>מחשבון מחיר</span>
            </button>

            <Link
              to="/contact"
              className="group flex items-center gap-2 text-xs font-bold tracking-wide bg-amber-400 hover:bg-amber-300 text-black px-5 py-2.5 rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:scale-105"
            >
              <span>התחלת פרויקט</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
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

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#09090b]/98 backdrop-blur-2xl border-b border-white/10 px-6 py-8 animate-fade-in font-hebrew text-right">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-lg font-bold text-white hover:text-amber-400 transition-colors py-2 border-b border-white/5"
                >
                  {link.label}
                </Link>
              ))}

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setCalculatorOpen(true);
                }}
                className="flex items-center justify-center gap-2 text-sm font-bold bg-amber-500/10 border border-amber-500/30 text-amber-400 py-3 rounded-xl mt-2"
              >
                <Calculator className="w-4 h-4" />
                <span>מחשבון הצעת מחיר מהיר</span>
              </button>

              <Link
                to="/contact"
                className="flex items-center justify-center gap-2 text-sm font-bold bg-amber-400 text-black py-3.5 rounded-xl mt-2"
              >
                <span>התחלת פרויקט</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Calculator Modal */}
      <PriceCalculatorModal
        isOpen={calculatorOpen}
        onClose={() => setCalculatorOpen(false)}
      />
    </>
  );
};
