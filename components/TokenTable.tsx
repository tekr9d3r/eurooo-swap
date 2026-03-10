'use client';

import { useState } from 'react';

const TOKENS = [
  { token: 'EURC', chain: 'Ethereum',  address: '0x1aBaEA1f7C830bD89Acc67eC4af516284b1bC33c' },
  { token: 'EURC', chain: 'Base',      address: '0x60a3E35Cc302bFA44Cb288Bc5a4F316Fdb1adb42' },
  { token: 'EURC', chain: 'Avalanche', address: '0xC891EB4CbdEFf6e073e859e987815Ed1505c2ACD' },
  { token: 'EURC', chain: 'Solana',    address: 'HzwqbKZw8HxMN6bF2yFZNrht3c2iXXzpKcFu7uBEDKtr' },
  { token: 'EURe', chain: 'Gnosis',    address: '0xcB444e90D8198415266c6a2724b7900fb12FC56E' },
  { token: 'EURCV',chain: 'Ethereum',  address: '0x5f7827FDeb7c20b443265Fc2F40845B715385Ff2' },
];

function truncate(addr: string) {
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={copy}
      title="Copy address"
      className="inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors flex-shrink-0"
    >
      {copied ? (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Copied
        </>
      ) : (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
          </svg>
          Copy
        </>
      )}
    </button>
  );
}

export default function TokenTable() {
  return (
    <section className="w-full max-w-4xl mx-auto px-4 pb-16">
      <div className="mb-6 text-center">
        <h2 className="text-xl font-semibold text-foreground">EUR Stablecoin Contract Addresses</h2>
        <p className="text-sm text-muted-foreground mt-1">Click copy to grab a contract address</p>
      </div>

      <div className="rounded-xl border border-border overflow-hidden bg-background/60 backdrop-blur">
        {/* Desktop */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/40">
                <th className="text-left px-4 py-3 text-muted-foreground font-medium">Token</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-medium">Chain</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-medium">Contract Address</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {TOKENS.map((row, i) => (
                <tr key={i} className="border-b border-border/50 last:border-0 hover:bg-secondary/20 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">
                        €
                      </div>
                      <span className="font-semibold text-foreground">{row.token}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs px-2 py-1 rounded-md bg-secondary text-muted-foreground font-medium">
                      {row.chain}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-foreground">
                    {row.address}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <CopyButton text={row.address} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile */}
        <div className="sm:hidden divide-y divide-border/50">
          {TOKENS.map((row, i) => (
            <div key={i} className="p-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-7 h-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">
                  €
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground text-sm">{row.token}</span>
                    <span className="text-xs px-1.5 py-0.5 rounded bg-secondary text-muted-foreground">{row.chain}</span>
                  </div>
                  <div className="font-mono text-xs text-muted-foreground truncate">{truncate(row.address)}</div>
                </div>
              </div>
              <CopyButton text={row.address} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
