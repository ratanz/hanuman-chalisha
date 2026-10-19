'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  RotateCw, 
  Volume2, 
  VolumeX, 
  BookOpen 
} from 'lucide-react';
import { AUDIO_FILE_PATH } from '@/data/chalisaData';
import LiquidNavbar from '@/components/LiquidNavbar';

export default function ListenPage() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(581); // Fallback ~9:41
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isPlayerReady, setIsPlayerReady] = useState<boolean>(false);
  
  // Track when user is actively dragging the scrubber
  const isScrubbingRef = useRef<boolean>(false);
  const rafRef = useRef<number | null>(null);

  // Smooth continuous timeline tracking at 60fps when audio is playing
  useEffect(() => {
    if (!isPlaying) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }

    const updateLoop = () => {
      if (audioRef.current && !isScrubbingRef.current) {
        setCurrentTime(audioRef.current.currentTime);
      }
      rafRef.current = requestAnimationFrame(updateLoop);
    };

    rafRef.current = requestAnimationFrame(updateLoop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isPlaying]);

  // Audio Playback Controls
  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => {
        console.error('Audio play error:', err);
      });
    }
  }, [isPlaying]);

  const rewind10 = () => {
    if (!audioRef.current) return;
    const target = Math.max(0, audioRef.current.currentTime - 10);
    audioRef.current.currentTime = target;
    setCurrentTime(target);
  };

  const forward10 = () => {
    if (!audioRef.current) return;
    const target = Math.min(duration, audioRef.current.currentTime + 10);
    audioRef.current.currentTime = target;
    setCurrentTime(target);
  };

  const handleScrubberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
  };

  const handleScrubberMouseDown = () => {
    isScrubbingRef.current = true;
  };

  const handleScrubberMouseUp = (e: React.MouseEvent<HTMLInputElement> | React.TouchEvent<HTMLInputElement>) => {
    isScrubbingRef.current = false;
    const newTime = parseFloat((e.currentTarget as HTMLInputElement).value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
      if (!isPlaying) {
        audioRef.current.play().catch((err) => {
          console.error('Audio play error:', err);
        });
      }
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const nextMuted = !isMuted;
    audioRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const formatTime = (secs: number) => {
    const safeSecs = Math.max(0, Math.floor(secs));
    const mins = Math.floor(safeSecs / 60);
    const remainingSecs = Math.floor(safeSecs % 60);
    return `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  const progressPercent = duration > 0 ? Math.min(100, Math.max(0, (currentTime / duration) * 100)) : 0;

  return (
    <main className="relative min-h-screen bg-[#06070c] text-neutral-100 selection:bg-amber-500/30 selection:text-white flex flex-col justify-between overflow-hidden">
      
      {/* High-Quality Native HTML5 Audio Element */}
      <audio
        ref={audioRef}
        src={AUDIO_FILE_PATH}
        preload="metadata"
        onLoadedMetadata={(e) => {
          const d = e.currentTarget.duration;
          if (d && !isNaN(d) && d > 0) {
            setDuration(d);
          }
          setIsPlayerReady(true);
        }}
        onCanPlay={() => setIsPlayerReady(true)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => {
          setIsPlaying(false);
          setCurrentTime(0);
          if (audioRef.current) audioRef.current.currentTime = 0;
        }}
      />

      {/* Dynamic Ambient Glowing Liquid Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div 
          className={`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[850px] h-[650px] sm:h-[850px] rounded-full blur-[170px] transition-all duration-1000 ${
            isPlaying ? 'bg-amber-500/18 scale-105 animate-blob-1' : 'bg-amber-500/10 scale-100'
          }`} 
        />
        <div 
          className={`absolute bottom-1/4 right-1/4 w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] rounded-full blur-[160px] transition-all duration-1000 ${
            isPlaying ? 'bg-orange-600/12 animate-blob-2' : 'bg-orange-600/06'
          }`} 
        />
      </div>

      {/* Top Floating Navbar with Read Link */}
      <LiquidNavbar currentPage="listen" />

      {/* ================= REFINED COLOROS/APPLE-INSPIRED LIQUID GLASS AUDIO WIDGET ================= */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-3.5 sm:px-6 pt-20 sm:pt-24 pb-10 sm:pb-14 z-10">
        
        <div className="w-full max-w-[340px] xs:max-w-sm sm:max-w-md liquid-glass border border-white/[0.14] rounded-[28px] sm:rounded-[32px] p-5 sm:p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7),_inset_0_1px_1px_rgba(255,255,255,0.15)] backdrop-blur-3xl flex flex-col items-center relative overflow-hidden transition-all duration-500">
          
          {/* Subtle Liquid Glass Glow Accents */}
          <div className="absolute -top-20 -left-20 w-44 h-44 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-44 h-44 bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* Central Sacred Divine Emblem */}
          <div className="relative mb-5 sm:mb-6 mt-1 flex items-center justify-center">
            {/* Ambient Pulsing Glow Rings when Playing */}
            <div 
              className={`absolute inset-0 rounded-full bg-amber-500/25 blur-2xl transition-all duration-700 ${
                isPlaying ? 'scale-125 opacity-100 animate-pulse' : 'scale-90 opacity-0'
              }`}
            />
            
            {/* Main Emblem Disk */}
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full liquid-glass-elevated border border-amber-500/30 flex flex-col items-center justify-center shadow-[0_0_35px_rgba(245,158,11,0.22)]">
              
              {/* Sacred ॐ Symbol */}
              <span className="text-4xl sm:text-5xl font-serif text-golden-gradient select-none drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]">
                ॐ
              </span>

              {/* Dynamic Equalizer Waves when Playing */}
              <div className="flex items-end gap-1.5 h-3.5 mt-2.5">
                <span 
                  className={`w-1 bg-amber-400 rounded-full transition-all duration-300 ${
                    isPlaying ? 'h-3 animate-bounce' : 'h-1 opacity-40'
                  }`}
                  style={{ animationDelay: '0ms' }}
                />
                <span 
                  className={`w-1 bg-amber-400 rounded-full transition-all duration-300 ${
                    isPlaying ? 'h-3.5 animate-bounce' : 'h-1.5 opacity-40'
                  }`}
                  style={{ animationDelay: '150ms' }}
                />
                <span 
                  className={`w-1 bg-amber-300 rounded-full transition-all duration-300 ${
                    isPlaying ? 'h-2 animate-bounce' : 'h-1 opacity-40'
                  }`}
                  style={{ animationDelay: '300ms' }}
                />
                <span 
                  className={`w-1 bg-amber-400 rounded-full transition-all duration-300 ${
                    isPlaying ? 'h-3.5 animate-bounce' : 'h-1.5 opacity-40'
                  }`}
                  style={{ animationDelay: '450ms' }}
                />
              </div>

            </div>
          </div>

          {/* Track Titles */}
          <div className="text-center mb-6 select-none">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight mb-1">
              <span className="text-golden-gradient font-serif devanagari-serif inline-block pt-1.5 pb-0.5">
                श्री हनुमान चालीसा
              </span>
            </h1>
            <p className="text-[11px] sm:text-xs text-neutral-400 font-mono tracking-widest uppercase">
              Sacred Chanting • High Fidelity
            </p>
          </div>

          {/* ================= SLEEK & GLOWY PROGRESS BAR ================= */}
          <div className="w-full mb-6 px-1">
            <div className="relative w-full h-2 group cursor-pointer flex items-center">
              
              {/* Background Inactive Track */}
              <div className="absolute inset-0 h-1.5 top-1/2 -translate-y-1/2 bg-white/[0.12] rounded-full overflow-hidden" />

              {/* Layer 1: Ambient Ethereal Glow Bloom (Soft blurred aura) */}
              <div 
                className="absolute top-1/2 -translate-y-1/2 h-2.5 bg-gradient-to-r from-amber-400 via-amber-300 to-white rounded-full blur-[7px] opacity-80 pointer-events-none transition-all duration-150"
                style={{ width: `${progressPercent}%` }}
              />

              {/* Layer 2: Radiant Inner Core Progress Bar */}
              <div 
                className="absolute top-1/2 -translate-y-1/2 h-1.5 bg-gradient-to-r from-amber-500 via-amber-300 to-white rounded-full shadow-[0_0_12px_rgba(251,191,36,0.95)] pointer-events-none transition-all duration-150"
                style={{ width: `${progressPercent}%` }}
              />

              {/* Layer 3: Brilliant Glowing Leading Tip */}
              <div 
                className="absolute top-1/2 -translate-y-1/2 -ml-1.5 w-3 h-3 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,1),_0_0_20px_rgba(251,191,36,0.95),_0_0_30px_rgba(245,158,11,0.7)] pointer-events-none transition-all duration-150"
                style={{ left: `${progressPercent}%` }}
              />

              {/* Transparent Touch Range Slider */}
              <input
                type="range"
                min={0}
                max={duration || 581}
                step={0.5}
                value={currentTime}
                onChange={handleScrubberChange}
                onMouseDown={handleScrubberMouseDown}
                onMouseUp={handleScrubberMouseUp}
                onTouchStart={handleScrubberMouseDown}
                onTouchEnd={handleScrubberMouseUp}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                title="Seek Timeline"
              />
            </div>
            
            {/* Precision Timestamp Indicators */}
            <div className="flex justify-between items-center text-[11px] font-mono text-neutral-400 mt-2 select-none">
              <span className="text-neutral-200 font-medium tracking-tight">{formatTime(currentTime)}</span>
              <span className="text-neutral-400 tracking-tight">{formatTime(duration)}</span>
            </div>
          </div>

          {/* ================= CIRCULAR PLAYBACK CONTROLS ================= */}
          <div className="flex items-center justify-center gap-5 sm:gap-7 mb-6 w-full">
            
            {/* Rewind 10 Seconds - Sleek Circular Button */}
            <button
              onClick={rewind10}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full text-neutral-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.1] border border-white/[0.08] transition-all active:scale-95 flex flex-col items-center justify-center group shadow-md"
              title="Rewind 10 seconds"
            >
              <RotateCcw className="w-4 h-4 text-neutral-300 group-hover:text-amber-300 transition-colors" />
              <span className="text-[8px] font-mono text-neutral-400 leading-none mt-0.5">10s</span>
            </button>

            {/* Central Primary Play / Pause Button - PERFECTLY CIRCULAR */}
            <button
              onClick={togglePlay}
              disabled={!isPlayerReady}
              className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-gradient-to-tr from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-200 text-black shadow-[0_0_30px_rgba(245,158,11,0.55)] hover:shadow-[0_0_40px_rgba(245,158,11,0.75)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center group disabled:opacity-50 flex-shrink-0"
              title={isPlaying ? 'Pause' : 'Play Hanuman Chalisa'}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 sm:w-7 sm:h-7 fill-black text-black" />
              ) : (
                <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-black text-black translate-x-0.5" />
              )}
            </button>

            {/* Forward 10 Seconds - Sleek Circular Button */}
            <button
              onClick={forward10}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full text-neutral-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.1] border border-white/[0.08] transition-all active:scale-95 flex flex-col items-center justify-center group shadow-md"
              title="Forward 10 seconds"
            >
              <RotateCw className="w-4 h-4 text-neutral-300 group-hover:text-amber-300 transition-colors" />
              <span className="text-[8px] font-mono text-neutral-400 leading-none mt-0.5">10s</span>
            </button>

          </div>

          {/* Bottom Bar: Mute Toggle & Read Mode Shortcut */}
          <div className="flex items-center justify-between w-full pt-4 border-t border-white/[0.08] text-xs text-neutral-400">
            
            {/* Mute / Unmute */}
            <button
              onClick={toggleMute}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:text-white hover:bg-white/5 transition-all"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-red-400" />
                  <span className="text-red-300 font-mono text-[11px]">Muted</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-neutral-300" />
                  <span className="font-mono text-[11px]">Audio On</span>
                </>
              )}
            </button>

            {/* Read Mode Link */}
            <Link
              href="/"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-amber-300/80 hover:text-amber-200 hover:bg-amber-500/10 transition-all font-medium text-[11px] sm:text-xs"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Read Chalisa</span>
            </Link>

          </div>

        </div>

        {/* Sacred Chanting Acclamation Footer */}
        <div className="mt-6 text-center select-none">
          <p className="text-xs sm:text-sm font-serif devanagari-serif text-amber-200/40">
            ॥ जय सियाराम जय हनुमान ॥
          </p>
        </div>

      </div>

    </main>
  );
}
