'use client';

export default function Navbar() {
  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        height: '56px',
        background: 'rgba(10, 14, 26, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
      }}
    >
      {/* Logo */}
      <a
        href="https://www.eurooo.xyz/"
        style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}
      >
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #003399 0%, #ffcc00 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
          }}
        >
          ★
        </div>
        <span style={{ color: '#fff', fontWeight: 700, fontSize: '16px', letterSpacing: '-0.3px' }}>
          eurooo.xyz
        </span>
      </a>

      {/* Nav links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* BEER EURO DEFI pill */}
        <a
          href="https://luma.com/mznyc1io"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '999px',
            padding: '5px 12px',
            textDecoration: 'none',
            color: '#e2e8f0',
            fontSize: '13px',
            fontWeight: 500,
            whiteSpace: 'nowrap',
          }}
        >
          <span
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: '#22c55e',
              display: 'inline-block',
              flexShrink: 0,
            }}
          />
          B€€R. Euros. DeFi.
        </a>

        {/* Knowledge Hub */}
        <a
          href="https://hub.eurooo.xyz/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '5px 12px',
            textDecoration: 'none',
            color: '#e2e8f0',
            fontSize: '13px',
            fontWeight: 500,
            borderRadius: '8px',
            transition: 'background 0.15s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.07)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
        >
          📗 Knowledge Hub
        </a>

        {/* Stats */}
        <a
          href="https://www.eurooo.xyz/stats"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '5px 12px',
            textDecoration: 'none',
            color: '#e2e8f0',
            fontSize: '13px',
            fontWeight: 500,
            borderRadius: '8px',
            transition: 'background 0.15s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.07)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
        >
          📊 Stats
        </a>

        {/* Earn CTA */}
        <a
          href="https://www.eurooo.xyz/app"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: '7px 18px',
            background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
            borderRadius: '10px',
            textDecoration: 'none',
            color: '#fff',
            fontSize: '13px',
            fontWeight: 600,
            letterSpacing: '0.1px',
            boxShadow: '0 2px 8px rgba(37,99,235,0.4)',
          }}
        >
          Earn →
        </a>
      </div>
    </nav>
  );
}
