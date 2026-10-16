'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Headphones, BookOpen } from 'lucide-react';

interface LiquidNavbarProps {
  fontSize?: 'md' | 'lg' | 'xl';
  setFontSize?: (size: 'md' | 'lg' | 'xl') => void;
  onOpenJaap?: () => void;
  jaapCount?: number;
  currentPage?: 'read' | 'listen';
}

export default function LiquidNavbar({
  fontSize = 'lg',
  setFontSize,
  onOpenJaap,
  jaapCount = 0,
  currentPage = 'read',
}: LiquidNavbarProps) {
  // Only md, lg, xl font sizes
  const fontSizes: Array<'md' | 'lg' | 'xl'> = ['md', 'lg', 'xl'];

  // Smart auto-hide on scroll down, reveal on scroll up
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    let lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show navbar near the top of the page
      if (currentScrollY <= 40) {
        setIsVisible(true);
        lastScrollY = currentScrollY;
        return;
      }

      // Delta threshold to ignore minor micro-jitters
      const diff = currentScrollY - lastScrollY;
      if (Math.abs(diff) > 8) {
        if (diff > 0) {
          // Scrolling down -> smoothly hide
          setIsVisible(false);
        } else {
          // Scrolling up -> smoothly reveal
          setIsVisible(true);
        }
        lastScrollY = currentScrollY;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cycleFontSize = () => {
    if (!setFontSize) return;
    const nextIdx = (fontSizes.indexOf(fontSize) + 1) % fontSizes.length;
    setFontSize(fontSizes[nextIdx]);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 px-2.5 sm:px-6 py-2.5 sm:py-4 pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transform will-change-transform ${
        isVisible 
          ? 'translate-y-0 opacity-100' 
          : '-translate-y-full opacity-0'
      }`}
    >
      <div 
        className={`max-w-4xl mx-auto flex items-center justify-between gap-2 transition-opacity duration-300 ${
          isVisible ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        
        {/* Minimal Responsive Brand Title */}
        <Link 
          href="/" 
          className="flex items-center gap-2 sm:gap-2.5 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-2xl liquid-glass hover:border-amber-400/40 transition-all duration-300 group flex-shrink-0"
        >
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-300 font-serif font-bold text-xs shadow-[0_0_15px_rgba(245,158,11,0.25)] flex-shrink-0">
            ॐ
          </div>
          <span className="text-xs sm:text-sm font-semibold tracking-wide text-neutral-100 group-hover:text-amber-300 transition-colors whitespace-nowrap">
            <span className="hidden xs:inline">Shri </span>Hanuman Chalisa
          </span>
        </Link>

        {/* Minimal Responsive Controls Row */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          
          {/* Switch between Read and Listen Page */}
          {currentPage === 'read' ? (
            <Link
              href="/listen"
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 rounded-2xl liquid-glass text-[11px] sm:text-xs font-medium text-amber-300 hover:border-amber-400/50 hover:bg-amber-500/10 transition-all group flex-shrink-0"
              title="Listen to Hanuman Chalisa"
            >
              <Headphones className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform flex-shrink-0" />
              <span>Listen</span>
            </Link>
          ) : (
            <Link
              href="/"
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 rounded-2xl liquid-glass text-[11px] sm:text-xs font-medium text-neutral-200 hover:text-white hover:border-white/30 transition-all group flex-shrink-0"
              title="Return to Reading View"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform flex-shrink-0" />
              <span>Read</span>
            </Link>
          )}

          {/* Font Size Toggle (Cycles only md -> lg -> xl) */}
          {setFontSize && (
            <button
              onClick={cycleFontSize}
              className="px-2.5 sm:px-3 py-1.5 rounded-2xl liquid-glass text-[11px] sm:text-xs font-mono font-medium text-neutral-300 hover:text-white hover:border-white/30 transition-all flex-shrink-0"
              title="Adjust Font Size (MD, LG, XL)"
            >
              <span className="hidden xs:inline">Font: </span>
              <span className="uppercase text-amber-300 font-bold">{fontSize}</span>
            </button>
          )}

          {/* 108 Japa Counter Pill */}
          {onOpenJaap && (
            <button
              onClick={onOpenJaap}
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 rounded-2xl liquid-glass hover:border-amber-500/40 transition-all group flex-shrink-0"
              title="108 Japa Counter"
            >
              <div className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b] flex-shrink-0" />
              <span className="hidden sm:inline text-xs font-medium text-neutral-200 group-hover:text-amber-300 transition-colors">
                Japa
              </span>
              <span className="text-[11px] sm:text-xs font-mono font-bold text-amber-300">
                {jaapCount}/108
              </span>
            </button>
          )}

        </div>

      </div>
    </header>
  );
}
