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
      <main className="flex-grow pt-20 pb-20 sm:pb-8">{children}</main>
      {showFooter && <Footer />}

      {/* Single, Ultra-Clean Floating WhatsApp CTA on Bottom Right */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-40 flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black shadow-[0_4px_20px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-300 hover:scale-110"
        title="דברו עם אמיתי בוואטסאפ"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
      </a>
    </div>
  );
};
