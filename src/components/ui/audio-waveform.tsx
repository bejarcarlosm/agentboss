'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface AudioWaveformProps {
  analyser: AnalyserNode | null;
  color?: string;
  className?: string;
}

export function AudioWaveform({ analyser, color = '#06b6d4', className }: AudioWaveformProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(0);

  useEffect(() => {
    if (!analyser || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      animationFrameRef.current = requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, rect.width, rect.height);

      const barWidth = rect.width / bufferLength * 2.5;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * rect.height * 0.8;

        ctx.fillStyle = color;
        ctx.globalAlpha = 0.6 + (dataArray[i] / 255) * 0.4;
        ctx.fillRect(x, rect.height - barHeight, barWidth - 2, barHeight);

        x += barWidth;
      }
      ctx.globalAlpha = 1;
    };

    draw();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [analyser, color]);

  return (
    <canvas
      ref={canvasRef}
      className={cn('w-full rounded-lg', className)}
      style={{ width: '100%', height: '80px' }}
    />
  );
}
