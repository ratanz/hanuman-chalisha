'use client';

import React from 'react';
import Link from 'next/link';
import { Headphones, BookOpen } from 'lucide-react';

interface LiquidNavbarProps {
  fontSize?: 'sm' | 'md' | 'lg' | 'xl';
  setFontSize?: (size: 'sm' | 'md' | 'lg' | 'xl') => void;
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
  const fontSizes: Array<'sm' | 'md' | 'lg' | 'xl'> = ['sm', 'md', 'lg', 'xl'];

  const cycleFontSize = () => {
    if (!setFontSize) return;
    const nextIdx = (fontSizes.indexOf(fontSize) + 1) % fontSizes.length;
    setFontSize(fontSizes[nextIdx]);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-6 py-4 pointer-events-none">
      <div className="max-w-4xl mx-auto flex items-center justify-between pointer-events-auto">
        
        {/* Minimal Title */}
        <Link 
          href="/" 
          className="flex items-center gap-2.5 px-4 py-2 rounded-2xl liquid-glass hover:border-amber-400/40 transition-all duration-300 group"
        >
          <div className="w-7 h-7 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-300 font-serif font-bold text-xs shadow-[0_0_15px_rgba(245,158,11,0.25)]">
            ॐ
          </div>
          <span className="text-sm font-semibold tracking-wide text-neutral-100 group-hover:text-amber-300 transition-colors">
            Shri Hanuman Chalisa
          </span>
        </Link>

        {/* Minimal Controls */}
        <div className="flex items-center gap-2">
          
          {/* Switch between Read and Listen Page */}
          {currentPage === 'read' ? (
            <Link
              href="/listen"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-2xl liquid-glass text-xs font-medium text-amber-300 hover:border-amber-400/50 hover:bg-amber-500/10 transition-all group"
              title="Listen to Hanuman Chalisa with Time-Synced Lyrics"
            >
              <Headphones className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
              <span>Listen</span>
            </Link>
          ) : (
            <Link
              href="/"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-2xl liquid-glass text-xs font-medium text-neutral-200 hover:text-white hover:border-white/30 transition-all group"
              title="Return to Reading View"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
              <span>Read</span>
            </Link>
          )}

          {/* Font Size Toggle */}
          {setFontSize && (
            <button
              onClick={cycleFontSize}
              className="px-3 py-1.5 rounded-2xl liquid-glass text-xs font-mono font-medium text-neutral-300 hover:text-white hover:border-white/30 transition-all"
              title="Adjust Font Size"
            >
              Font: <span className="uppercase text-amber-300 font-bold">{fontSize}</span>
            </button>
          )}

          {/* 108 Japa Counter Pill */}
          {onOpenJaap && (
            <button
              onClick={onOpenJaap}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-2xl liquid-glass hover:border-amber-500/40 transition-all group"
              title="108 Japa Counter"
            >
              <div className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
              <span className="text-xs font-medium text-neutral-200 group-hover:text-amber-300 transition-colors">
                Japa
              </span>
              <span className="text-xs font-mono font-bold text-amber-300">
                {jaapCount}/108
              </span>
            </button>
          )}

        </div>

      </div>
    </header>
  );
}
