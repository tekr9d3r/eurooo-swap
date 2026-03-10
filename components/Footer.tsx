'use client';

import Image from 'next/image';

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid rgba(255,255,255,0.07)',
        padding: '32px 24px',
        marginTop: '64px',
        background: 'rgba(10, 14, 26, 0.85)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Top row */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px',
          }}
        >
          {/* Logo + tagline */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Image
              src="/logo.png"
              alt="eurooo.xyz"
              width={32}
              height={32}
              style={{ objectFit: 'contain' }}
            />
            <div>
              <div style={{ color: '#fff', fontSize: '14px', fontWeight: 600 }}>eurooo.xyz</div>
              <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '12px' }}>
                Grow Your Euros in DeFi.
              </div>
            </div>
          </div>

          {/* Social icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* X / Twitter */}
            <a
              href="https://x.com/tekr0x"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow on X"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(255,255,255,0.5)',
                transition: 'background 0.15s, color 0.15s',
                textDecoration: 'none',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.9)';
                (e.currentTarget as HTMLAnchorElement).style.color = '#000';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.08)';
                (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.5)';
              }}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* Telegram */}
            <a
              href="https://t.me/+wxIKk-lsEy5kMGQ0"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Join our Telegram"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(255,255,255,0.5)',
                transition: 'background 0.15s, color 0.15s',
                textDecoration: 'none',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = '#0088cc';
                (e.currentTarget as HTMLAnchorElement).style.color = '#fff';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.08)';
                (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.5)';
              }}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)', margin: '24px 0' }} />

        {/* Disclaimer */}
        <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '12px', textAlign: 'center', margin: 0 }}>
          eurooo.xyz is an interface for third-party DeFi protocols. Deposits go directly to protocols, not Eurooo.
        </p>
      </div>
    </footer>
  );
}
