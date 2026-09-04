import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { MessageCircle } from 'lucide-react';
import { StudioAiConcierge } from '../chat/StudioAiConcierge';

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

      {/* Floating 24/7 AI Studio Concierge on Bottom Left */}
      <StudioAiConcierge />

      {/* Floating Smart Direct WhatsApp CTA on Bottom Right */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 group flex items-center gap-3 bg-[#121216]/95 hover:bg-[#1a1a20] border border-emerald-500/40 hover:border-emerald-400 p-2.5 sm:p-3 sm:pr-4 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-300 hover:scale-105"
        title="דברו עם אמיתי בוואטסאפ"
      >
        <div className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.5)]">
          <MessageCircle className="w-5 h-5 fill-current" />
          <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-amber-400 rounded-full border-2 border-[#121216] animate-pulse" />
        </div>
        <div className="text-right hidden sm:block font-hebrew">
          <div className="text-[10px] text-emerald-400 font-semibold tracking-wide">
            זמין להפקות
          </div>
          <div className="text-xs font-bold text-white">
            WhatsApp ישיר
          </div>
        </div>
      </a>
    </div>
  );
};
