'use client';

import React, { useState, useEffect } from 'react';
import { OPENING_DOHAS, CHAUPAIS, CONCLUDING_DOHA } from '@/data/chalisaData';
import LiquidNavbar from '@/components/LiquidNavbar';
import JaapCounterModal from '@/components/JaapCounterModal';

export default function Home() {
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('lg');
  const [jaapCount, setJaapCount] = useState<number>(0);
  const [isJaapOpen, setIsJaapOpen] = useState<boolean>(false);

  // Load saved Jaap count
  useEffect(() => {
    try {
      const savedJaap = localStorage.getItem('hanuman_chalisa_jaap');
      if (savedJaap) {
        setJaapCount(parseInt(savedJaap, 10) || 0);
      }
    } catch {
      // ignore
    }
  }, []);

  // Save Jaap count
  useEffect(() => {
    try {
      localStorage.setItem('hanuman_chalisa_jaap', jaapCount.toString());
    } catch {
      // ignore
    }
  }, [jaapCount]);

  // Font size classes for Sanskrit text
  const fontSizeClasses = {
    sm: 'text-lg sm:text-xl md:text-2xl leading-relaxed sm:leading-loose',
    md: 'text-xl sm:text-2xl md:text-3xl leading-relaxed sm:leading-loose',
    lg: 'text-2xl sm:text-3xl md:text-4xl leading-relaxed sm:leading-loose',
    xl: 'text-3xl sm:text-4xl md:text-5xl leading-relaxed sm:leading-loose',
  };

  return (
    <main className="relative min-h-screen bg-[#06070c] text-neutral-100 selection:bg-amber-500/30 selection:text-white">
      
      {/* Dynamic Ambient Glowing Liquid Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-500/10 rounded-full blur-[160px] animate-blob-1" />
        <div className="absolute top-2/3 right-1/4 w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[140px] animate-blob-2" />
      </div>

      {/* Floating Translucent Minimal Navbar */}
      <LiquidNavbar
        fontSize={fontSize}
        setFontSize={setFontSize}
        onOpenJaap={() => setIsJaapOpen(true)}
        jaapCount={jaapCount}
        currentPage="read"
      />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 pt-32 sm:pt-40 pb-24 z-10 flex flex-col items-center">
        
        {/* Minimal Clean Header */}
        <header id="top" className="text-center mb-12 sm:mb-16 w-full overflow-visible">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight overflow-visible">
            <span className="text-golden-gradient font-serif devanagari-serif inline-block pt-4 pb-2 px-2 overflow-visible">
              श्री हनुमान चालीसा
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 font-light tracking-widest uppercase font-mono mt-1">
            Shri Hanuman Chalisa
          </p>
        </header>

        {/* ================= OPENING DOHAS (SEPARATE BOXES) ================= */}
        <section className="w-full mb-10 sm:mb-14">
          <div className="text-center mb-5">
            <span className="text-xs sm:text-sm font-semibold tracking-widest text-amber-400/90 font-serif devanagari-serif">
              ॥ दोहा ॥
            </span>
          </div>

          <div className="flex flex-col gap-4 sm:gap-5">
            {OPENING_DOHAS.map((doha) => (
              <div
                key={doha.id}
                className="p-6 sm:p-8 rounded-3xl liquid-glass text-center transition-all duration-300 border border-white/10"
              >
                {doha.lines.map((line, idx) => (
                  <p
                    key={idx}
                    className={`font-semibold text-amber-100/95 font-serif devanagari-serif ${fontSizeClasses[fontSize]}`}
                  >
                    {line}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* ================= 40 CHAUPAIS (EACH IN SEPARATE BOX) ================= */}
        <section className="w-full mb-10 sm:mb-14">
          <div className="text-center mb-5">
            <span className="text-xs sm:text-sm font-semibold tracking-widest text-amber-400/90 font-serif devanagari-serif">
              ॥ चौपाई ॥
            </span>
          </div>

          <div className="flex flex-col gap-4 sm:gap-5">
            {CHAUPAIS.map((chaupai) => (
              <div
                key={chaupai.id}
                className="p-6 sm:p-8 rounded-3xl liquid-glass-elevated text-center transition-all duration-300 border border-white/10"
              >
                {chaupai.lines.map((line, idx) => (
                  <p
                    key={idx}
                    className={`font-semibold text-amber-100/95 font-serif devanagari-serif ${fontSizeClasses[fontSize]}`}
                  >
                    {line}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* ================= CONCLUDING DOHA (SEPARATE BOX) ================= */}
        <section className="w-full mb-12 sm:mb-16">
          <div className="text-center mb-5">
            <span className="text-xs sm:text-sm font-semibold tracking-widest text-amber-400/90 font-serif devanagari-serif">
              ॥ दोहा ॥
            </span>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl liquid-glass text-center transition-all duration-300 border border-white/10">
            {CONCLUDING_DOHA.lines.map((line, idx) => (
              <p
                key={idx}
                className={`font-semibold text-amber-100/95 font-serif devanagari-serif ${fontSizeClasses[fontSize]}`}
              >
                {line}
              </p>
            ))}
          </div>
        </section>

        {/* ================= MINIMAL FOOTER ================= */}
        <footer className="w-full flex flex-col items-center text-center pt-8 border-t border-white/10">
          <p className="text-lg sm:text-2xl font-bold text-golden-gradient font-serif devanagari-serif leading-relaxed mb-4">
            ॥ सियावर रामचंद्र की जय ॥<br />
            ॥ पवनसुत हनुमान की जय ॥<br />
            ॥ उमापति महादेव की जय ॥
          </p>

          <p className="text-xs text-neutral-500 font-mono">
            Shri Hanuman Chalisa
          </p>
        </footer>

      </div>

      {/* 108 Japa Mala Modal */}
      <JaapCounterModal
        isOpen={isJaapOpen}
        onClose={() => setIsJaapOpen(false)}
        count={jaapCount}
        setCount={setJaapCount}
      />

    </main>
  );
}
