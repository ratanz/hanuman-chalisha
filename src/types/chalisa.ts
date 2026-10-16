export interface ChalisaVerse {
  id: number;
  type: 'doha' | 'chaupai';
  number?: number;
  lines: string[];
  startTime: number; // in seconds
  endTime: number;   // in seconds
}
