'use client';

import { useEffect, useState } from 'react';

// Primary contract addresses per token (Ethereum mainnet unless noted)
const TOKEN_ADDRESSES: Record<string, { address: string; chain: string }> = {
  'EURC':   { address: '0x1aBaEA1f7C830bD89Acc67eC4af516284b1bC33c', chain: 'Ethereum' },
  'EURS':   { address: '0xdB25f211AB05b1c97D595516F45794528a807ad8', chain: 'Ethereum' },
  'EURe':   { address: '0x3231Cb76718CDeF2155FC47b5286d82e6eDA273f', chain: 'Ethereum' },
  'EURA':   { address: '0x1a7e4e63778B4f12a199C062f3eFdD288afCBce8', chain: 'Ethereum' },
  'EURCV':  { address: '0x5f7827FDeb7c20b443265Fc2F40845B715385Ff2', chain: 'Ethereum' },
  'EURT':   { address: '0xC581b735A1688071A1746c968e0798D642EDE491', chain: 'Ethereum' },
  'EUROe':  { address: '0x820802Fa8a99901F52e39acD21177b0BE6EE2974', chain: 'Ethereum' },
  'agEUR':  { address: '0x1a7e4e63778B4f12a199C062f3eFdD288afCBce8', chain: 'Ethereum' },
  'jEUR':   { address: '0x4e3Decbb3645551B8A19f0eA1678079FCB33fB4c', chain: 'Polygon' },
  'PAR':    { address: '0x68037790A0229e9Ce6EaA8A99ea92964106C4703', chain: 'Ethereum' },
  'cEUR':   { address: '0xD8763CBa276a3738E6DE85b4b3bF5FDed6D6cA73', chain: 'Celo' },
};

interface Token {
  name: string;
  symbol: string;
  marketCap: number;
  chains: string[];
  address: string;
  addressChain: string;
}

function formatMarketCap(value: number): string {
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(2)}B`;
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
  return `$${value.toFixed(0)}`;
}

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
      className="ml-2 inline-flex items-center justify-center h-6 w-6 rounded text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors flex-shrink-0"
    >
      {copied ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
        </svg>
      )}
    </button>
  );
}

export default function TokenTable() {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('https://stablecoins.llama.fi/stablecoins');
        const data = await res.json();

        const eurTokens = (data.peggedAssets as any[])
          .filter((t: any) => t.pegType === 'peggedEUR')
          .map((t: any) => {
            const mcap =
              t.circulating?.peggedEUR ??
              t.circulatingPrevDay?.peggedEUR ??
              0;
            const addr = TOKEN_ADDRESSES[t.symbol] ?? TOKEN_ADDRESSES[t.name];
            return {
              name: t.name,
              symbol: t.symbol,
              marketCap: mcap,
              chains: (t.chains ?? []).slice(0, 6),
              address: addr?.address ?? '—',
              addressChain: addr?.chain ?? '',
            };
          })
          .filter((t: Token) => t.marketCap > 0)
          .sort((a: Token, b: Token) => b.marketCap - a.marketCap)
          .slice(0, 10);

        setTokens(eurTokens);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <section className="w-full max-w-5xl mx-auto px-4 pb-16">
      <div className="mb-6 text-center">
        <h2 className="text-xl font-semibold text-foreground">Top EUR Stablecoins</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Live data from{' '}
          <a href="https://defillama.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            DefiLlama
          </a>
        </p>
      </div>

      <div className="rounded-xl border border-border overflow-hidden bg-background/60 backdrop-blur">
        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/40">
                <th className="text-left px-4 py-3 text-muted-foreground font-medium w-8">#</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-medium">Token</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-medium">Chains</th>
                <th className="text-right px-4 py-3 text-muted-foreground font-medium">Market Cap</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-medium">Contract Address</th>
              </tr>
            </thead>
            <tbody>
              {loading && Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="border-b border-border/50">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <td key={j} className="px-4 py-3">
                      <div className="h-4 bg-secondary/60 rounded animate-pulse w-3/4" />
                    </td>
                  ))}
                </tr>
              ))}
              {error && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                    Failed to load data. Please try again later.
                  </td>
                </tr>
              )}
              {!loading && !error && tokens.map((token, i) => (
                <tr key={token.symbol} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                  <td className="px-4 py-3 text-muted-foreground">{i + 1}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">
                        €
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{token.symbol}</div>
                        <div className="text-xs text-muted-foreground">{token.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {token.chains.map(chain => (
                        <span key={chain} className="text-xs px-1.5 py-0.5 rounded bg-secondary text-muted-foreground">
                          {chain}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right font-medium text-foreground">
                    {formatMarketCap(token.marketCap)}
                  </td>
                  <td className="px-4 py-3">
                    {token.address === '—' ? (
                      <span className="text-muted-foreground text-xs">—</span>
                    ) : (
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-muted-foreground">{token.addressChain}:</span>
                        <span className="font-mono text-xs text-foreground">{truncate(token.address)}</span>
                        <CopyButton text={token.address} />
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden divide-y divide-border/50">
          {loading && Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="p-4 space-y-2">
              <div className="h-4 bg-secondary/60 rounded animate-pulse w-1/2" />
              <div className="h-3 bg-secondary/40 rounded animate-pulse w-3/4" />
            </div>
          ))}
          {!loading && !error && tokens.map((token, i) => (
            <div key={token.symbol} className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground text-xs w-5">{i + 1}</span>
                  <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-bold text-primary">€</div>
                  <span className="font-medium text-foreground">{token.symbol}</span>
                  <span className="text-xs text-muted-foreground">{token.name}</span>
                </div>
                <span className="font-semibold text-foreground text-sm">{formatMarketCap(token.marketCap)}</span>
              </div>
              <div className="flex flex-wrap gap-1 pl-7">
                {token.chains.map(chain => (
                  <span key={chain} className="text-xs px-1.5 py-0.5 rounded bg-secondary text-muted-foreground">{chain}</span>
                ))}
              </div>
              {token.address !== '—' && (
                <div className="flex items-center gap-1 pl-7">
                  <span className="text-xs text-muted-foreground">{token.addressChain}:</span>
                  <span className="font-mono text-xs text-foreground">{truncate(token.address)}</span>
                  <CopyButton text={token.address} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
