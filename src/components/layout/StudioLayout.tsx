import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface StudioLayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
}

export const StudioLayout: React.FC<StudioLayoutProps> = ({ children, showFooter = true }) => {
  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] flex flex-col film-grain selection:bg-amber-500/30 selection:text-amber-200">
      <Navbar />
      <main className="flex-grow pt-20">{children}</main>
      {showFooter && <Footer />}
    </div>
  );
};
