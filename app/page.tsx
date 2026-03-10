'use client';

import { SwapWidget } from '@/components/SwapWidget';

const stars = Array.from({ length: 12 }, (_, i) => i);

export default function Home() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)',
        padding: '1rem',
      }}
    >
      {/* Stars + widget container */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

        {/* Orbiting stars ring */}
        <div
          style={{
            position: 'absolute',
            width: '520px',
            height: '520px',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            animation: 'spin-circle 30s linear infinite',
            pointerEvents: 'none',
          }}
        >
          {stars.map(i => {
            const angle = i * 30 * (Math.PI / 180);
            const radius = 42;
            const x = 50 + radius * Math.cos(angle - Math.PI / 2);
            const y = 50 + radius * Math.sin(angle - Math.PI / 2);
            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  width: '18px',
                  height: '18px',
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: 'translate(-50%, -50%)',
                  animation: `counter-spin 30s linear infinite, twinkle ${2 + (i % 3)}s ease-in-out infinite`,
                  animationDelay: `0s, ${i * 0.3}s`,
                }}
              >
                <svg viewBox="0 0 24 24" fill="#ffcc00" style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 0 8px rgba(255,204,0,0.6))' }}>
                  <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z" />
                </svg>
              </div>
            );
          })}
        </div>

        <SwapWidget />
      </div>

      <style>{`
        @keyframes spin-circle {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes counter-spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(-360deg); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.6; filter: drop-shadow(0 0 4px rgba(255,204,0,0.3)); }
          50%       { opacity: 1;   filter: drop-shadow(0 0 14px rgba(255,204,0,0.9)); }
        }
      `}</style>
    </main>
  );
}
