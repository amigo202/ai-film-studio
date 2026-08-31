import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { GalleryItem } from '../../types/project';

interface LightboxProps {
  items: GalleryItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  items,
  currentIndex,
  isOpen,
  onClose,
  onNavigate
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNavigate((currentIndex < items.length - 1 ? currentIndex + 1 : 0));
      if (e.key === 'ArrowLeft') onNavigate((currentIndex > 0 ? currentIndex - 1 : items.length - 1));
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, items.length, onClose, onNavigate]);

  if (!isOpen || !items[currentIndex]) return null;

  const currentItem = items[currentIndex];

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-4 md:p-8 animate-fade-in">
      {/* Top Bar */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-amber-400">
            FRAME {currentIndex + 1} / {items.length}
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="סגור"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Image Container */}
      <div className="relative flex-1 flex items-center justify-center py-4">
        {/* Navigation Buttons */}
        <button
          onClick={() => onNavigate((currentIndex > 0 ? currentIndex - 1 : items.length - 1))}
          className="absolute right-4 md:right-8 z-10 p-3 rounded-full bg-black/60 hover:bg-white/20 text-white backdrop-blur-md transition-all"
          aria-label="תמונה קודמת"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <img
          src={currentItem.url}
          alt={currentItem.alt || currentItem.caption || 'Cinematic Frame'}
          className="max-h-[82vh] max-w-[92vw] object-contain rounded border border-white/10 shadow-2xl"
        />

        <button
          onClick={() => onNavigate((currentIndex < items.length - 1 ? currentIndex + 1 : 0))}
          className="absolute left-4 md:left-8 z-10 p-3 rounded-full bg-black/60 hover:bg-white/20 text-white backdrop-blur-md transition-all"
          aria-label="תמונה הבאה"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Caption Bar */}
      {currentItem.caption && (
        <div className="text-center py-2">
          <p className="text-sm font-hebrew text-zinc-300 max-w-xl mx-auto">
            {currentItem.caption}
          </p>
        </div>
      )}
    </div>
  );
};
