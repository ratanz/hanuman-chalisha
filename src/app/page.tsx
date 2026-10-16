'use client';

import React, { useState, useEffect } from 'react';
import { OPENING_DOHAS, CHAUPAIS, CONCLUDING_DOHA } from '@/data/chalisaData';
import LiquidNavbar from '@/components/LiquidNavbar';
import JaapCounterModal from '@/components/JaapCounterModal';

export default function Home() {
  // Only md, lg, xl font sizes supported
  const [fontSize, setFontSize] = useState<'md' | 'lg' | 'xl'>('lg');
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

  // Refined font size classes for mobile and desktop
  const fontSizeClasses: Record<'md' | 'lg' | 'xl', string> = {
    md: 'text-lg sm:text-2xl md:text-3xl leading-relaxed sm:leading-loose',
    lg: 'text-xl sm:text-3xl md:text-4xl leading-relaxed sm:leading-loose',
    xl: 'text-2xl sm:text-4xl md:text-5xl leading-relaxed sm:leading-loose',
  };

  return (
    <main className="relative min-h-screen bg-[#06070c] text-neutral-100 selection:bg-amber-500/30 selection:text-white overflow-x-hidden">
      
      {/* Dynamic Ambient Glowing Liquid Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[700px] h-[550px] sm:h-[700px] bg-amber-500/10 rounded-full blur-[150px] sm:blur-[160px] animate-blob-1" />
        <div className="absolute top-2/3 right-1/4 w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] bg-orange-600/5 rounded-full blur-[130px] sm:blur-[140px] animate-blob-2" />
      </div>

      {/* Floating Translucent Minimal Navbar */}
      <LiquidNavbar
        fontSize={fontSize}
        setFontSize={setFontSize}
        onOpenJaap={() => setIsJaapOpen(true)}
        jaapCount={jaapCount}
        currentPage="read"
      />

      <div className="relative max-w-3xl mx-auto px-3.5 sm:px-6 pt-24 sm:pt-36 pb-20 sm:pb-28 z-10 flex flex-col items-center">
        
        {/* Minimal Clean Header with ample headroom to prevent clipping */}
        <header id="top" className="text-center mb-8 sm:mb-14 w-full overflow-visible">
          <h1 className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight overflow-visible">
            <span className="text-golden-gradient font-serif devanagari-serif inline-block pt-3 pb-1.5 px-2 overflow-visible">
              श्री हनुमान चालीसा
            </span>
          </h1>
          <p className="text-[11px] sm:text-sm text-neutral-400 font-light tracking-widest uppercase font-mono mt-1">
            Shri Hanuman Chalisa
          </p>
        </header>

        {/* ================= OPENING DOHAS (SEPARATE BOXES) ================= */}
        <section className="w-full mb-8 sm:mb-14">
          <div className="text-center mb-4 sm:mb-5">
            <span className="text-xs sm:text-sm font-semibold tracking-widest text-amber-400/90 font-serif devanagari-serif">
              ॥ दोहा ॥
            </span>
          </div>

          <div className="flex flex-col gap-3.5 sm:gap-5">
            {OPENING_DOHAS.map((doha) => (
              <div
                key={doha.id}
                className="p-4 sm:p-7 rounded-2xl sm:rounded-3xl liquid-glass text-center transition-all duration-300 border border-white/10"
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
        <section className="w-full mb-8 sm:mb-14">
          <div className="text-center mb-4 sm:mb-5">
            <span className="text-xs sm:text-sm font-semibold tracking-widest text-amber-400/90 font-serif devanagari-serif">
              ॥ चौपाई ॥
            </span>
          </div>

          <div className="flex flex-col gap-3.5 sm:gap-5">
            {CHAUPAIS.map((chaupai) => (
              <div
                key={chaupai.id}
                className="p-4 sm:p-7 rounded-2xl sm:rounded-3xl liquid-glass-elevated text-center transition-all duration-300 border border-white/10"
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
        <section className="w-full mb-10 sm:mb-16">
          <div className="text-center mb-4 sm:mb-5">
            <span className="text-xs sm:text-sm font-semibold tracking-widest text-amber-400/90 font-serif devanagari-serif">
              ॥ दोहा ॥
            </span>
          </div>

          <div className="p-4 sm:p-7 rounded-2xl sm:rounded-3xl liquid-glass text-center transition-all duration-300 border border-white/10">
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

        {/* Acclamation Footer Acclaim */}
        <footer className="text-center pt-4 pb-12 select-none">
          <p className="text-base sm:text-xl font-serif devanagari-serif text-golden-gradient font-bold mb-1">
            ॥ सियावर रामचंद्र की जय ॥
          </p>
          <p className="text-sm sm:text-lg font-serif devanagari-serif text-amber-200/60 font-medium">
            ॥ पवनसुत हनुमान की जय ॥
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
