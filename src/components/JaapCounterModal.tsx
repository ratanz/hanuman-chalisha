'use client';

import React, { useEffect, useCallback, useState } from 'react';
import { X, RotateCcw, Trophy, Award, Plus, Minus, Sparkles } from 'lucide-react';

interface JaapCounterModalProps {
  isOpen: boolean;
  onClose: () => void;
  count: number;
  setCount: (c: number | ((prev: number) => number)) => void;
}

export default function JaapCounterModal({
  isOpen,
  onClose,
  count,
  setCount,
}: JaapCounterModalProps) {
  const [malaRounds, setMalaRounds] = useState(0);
  const target = 108;

  const increment = useCallback(() => {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(20);
    }

    setCount((prev) => {
      const next = prev + 1;
      if (next === target) {
        setMalaRounds((r) => r + 1);
      }
      return next > target ? 1 : next;
    });
  }, [setCount, target]);

  const decrement = () => {
    setCount((prev) => Math.max(0, prev - 1));
  };

  const resetCount = () => {
    setCount(0);
  };

  // Keyboard shortcut: Spacebar to count, Esc to close
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        increment();
      } else if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, increment, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xl animate-in fade-in duration-300">
      
      {/* Background glow */}
      <div className="absolute w-[450px] h-[450px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl liquid-glass border border-white/20 shadow-2xl flex flex-col items-center text-center">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>108 Japa Mala Counter</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
          Chanting Counter
        </h3>
        <p className="text-xs text-neutral-400 mb-6 font-mono">
          Tap circle or press <span className="text-amber-300 font-bold px-1.5 py-0.5 rounded bg-white/10">SPACE</span> to count
        </p>

        {/* Circular Counter Ring */}
        <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center mb-6">
          
          {/* Circular SVG Progress */}
          <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
            {/* Background Track */}
            <circle
              cx="50"
              cy="50"
              r="44"
              className="stroke-white/10"
              strokeWidth="4"
              fill="transparent"
            />
            {/* Progress Fill */}
            <circle
              cx="50"
              cy="50"
              r="44"
              className="stroke-amber-400 transition-all duration-300 ease-out"
              strokeWidth="4"
              strokeDasharray="276.46"
              strokeDashoffset={276.46 * (1 - count / target)}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>

          {/* Interactive Center Button */}
          <button
            onClick={increment}
            className="absolute inset-4 rounded-full liquid-glass-elevated flex flex-col items-center justify-center hover:scale-105 active:scale-95 transition-all group border border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.2)]"
          >
            <span className="text-xs uppercase tracking-widest text-amber-300/80 font-mono mb-1">
              COUNT
            </span>
            <span className="text-5xl sm:text-6xl font-extrabold text-white font-mono tracking-tight group-hover:text-amber-300 transition-colors">
              {count}
            </span>
            <span className="text-[11px] text-neutral-400 mt-1 font-mono">
              / {target} Beads
            </span>

            {/* Ripple Pulse */}
            <div className="absolute inset-0 rounded-full border border-amber-400/30 opacity-0 group-active:opacity-100 group-active:scale-110 transition-all" />
          </button>

        </div>

        {/* Completion Banner */}
        {count === target && (
          <div className="w-full p-3 mb-4 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-amber-200 text-xs flex items-center justify-center gap-2 animate-bounce">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span className="font-semibold">108 Chants Completed!</span>
          </div>
        )}

        {/* Counter Stats & Controls */}
        <div className="w-full flex items-center justify-between px-2 pt-2 border-t border-white/10">
          
          {/* Completed Rounds */}
          <div className="text-left">
            <div className="text-[10px] text-neutral-400 font-mono uppercase">Completed Rounds</div>
            <div className="text-base font-bold text-amber-400 font-mono flex items-center gap-1">
              <Award className="w-4 h-4 text-amber-400" />
              <span>{malaRounds}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={decrement}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 transition-all"
              title="-1 Count"
            >
              <Minus className="w-4 h-4" />
            </button>
            <button
              onClick={increment}
              className="p-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 transition-all border border-amber-500/30"
              title="+1 Count"
            >
              <Plus className="w-4 h-4" />
            </button>
            <button
              onClick={resetCount}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-all ml-1"
              title="Reset Counter"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
