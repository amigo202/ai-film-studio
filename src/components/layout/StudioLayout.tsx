import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { MessageCircle } from 'lucide-react';

interface StudioLayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
}

export const StudioLayout: React.FC<StudioLayoutProps> = ({ children, showFooter = true }) => {
  const whatsappUrl = `https://wa.me/972526016115?text=${encodeURIComponent('היי אמיתי, ראיתי את האתר והסרטונים שלך ואשמח לשמוע על הפקת סרט AI!')}`;

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] flex flex-col film-grain selection:bg-amber-500/30 selection:text-amber-200 relative">
      <Navbar />
      <main className="flex-grow pt-20">{children}</main>
      {showFooter && <Footer />}

      {/* Floating Smart WhatsApp CTA */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 group flex items-center gap-3 bg-[#121216]/95 hover:bg-[#1a1a20] border border-emerald-500/40 hover:border-emerald-400 p-3 pr-4.5 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-300 hover:scale-105"
        title="דברו עם אמיתי בוואטסאפ"
      >
        <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]">
          <MessageCircle className="w-5 h-5 fill-current" />
          <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-amber-400 rounded-full border-2 border-[#121216] animate-pulse" />
        </div>
        <div className="text-right hidden sm:block">
          <div className="text-[11px] font-mono uppercase text-emerald-400 font-semibold tracking-wider flex items-center gap-1">
            <span>זמין עכשיו להפקות</span>
          </div>
          <div className="text-xs font-bold text-white font-syne">
            וואטסאפ ישיר לאמיתי
          </div>
        </div>
      </a>
    </div>
  );
};
