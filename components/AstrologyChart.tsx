
import React, { useEffect, useRef } from 'react';
import { ZodiacSign } from '../types';

interface Props {
  userSign: ZodiacSign;
}

const AstrologyChart: React.FC<Props> = ({ userSign }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) - 40;

    // Clear
    ctx.clearRect(0, 0, width, height);

    // Draw Background Circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = '#4a0e4e';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw Zodiac Segments
    const segments = 12;
    const segmentAngle = (Math.PI * 2) / segments;
    const signs = Object.values(ZodiacSign);

    signs.forEach((sign, i) => {
      const angle = i * segmentAngle - Math.PI / 2;
      const x1 = centerX + Math.cos(angle) * (radius - 40);
      const y1 = centerY + Math.sin(angle) * (radius - 40);
      const x2 = centerX + Math.cos(angle) * radius;
      const y2 = centerY + Math.sin(angle) * radius;

      // Dividers
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = '#9333ea33';
      ctx.stroke();

      // Text Labels
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(angle + segmentAngle / 2);
      ctx.fillStyle = sign === userSign ? '#f472b6' : '#94a3b8';
      ctx.font = sign === userSign ? 'bold 12px Cairo' : '10px Cairo';
      ctx.textAlign = 'center';
      ctx.fillText(sign, radius - 20, 0);
      ctx.restore();
    });

    // Draw Center Star
    ctx.beginPath();
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI * 2) / 8;
      const r = i % 2 === 0 ? 30 : 15;
      const x = centerX + Math.cos(angle) * r;
      const y = centerY + Math.sin(angle) * r;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = '#fde047';
    ctx.fill();

    // Pulse effect
    let frame = 0;
    const animate = () => {
      frame += 0.05;
      const scale = 1 + Math.sin(frame) * 0.02;
      ctx.save();
      ctx.globalAlpha = 0.3;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * scale, 0, Math.PI * 2);
      ctx.strokeStyle = '#9333ea';
      ctx.stroke();
      ctx.restore();
      // requestAnimationFrame(animate); // Keep it simple for now
    };
    animate();

  }, [userSign]);

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-slate-900/50 rounded-3xl border border-purple-500/20">
      <h3 className="text-xl mb-4 mystic-font text-purple-200">تموضع الأجرام في لحظة ميلادك</h3>
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="max-w-full h-auto drop-shadow-[0_0_15px_rgba(147,51,234,0.4)]"
      />
      <p className="mt-4 text-sm text-slate-400 text-center italic">
        هذه محاكاة رمزية لمواقع النجوم والبروج وقت ولادتك
      </p>
    </div>
  );
};

export default AstrologyChart;
