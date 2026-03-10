'use client';

import { useEffect, useState } from 'react';

// Chain priority for address display — prefer more popular chains
const CHAIN_PRIORITY = ['Ethereum', 'Base', 'Solana', 'Polygon', 'Avalanche', 'Arbitrum', 'Optimism', 'Gnosis', 'BSC', 'Celo'];

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
  if (addr.length < 20) return addr;
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

/** Extract best address from a DefiLlama stablecoin detail response */
function extractAddress(detail: any): { address: string; chain: string } | null {
  // Try chainBalances first (most reliable)
  const balances: Record<string, any> = detail?.chainBalances ?? {};

  // Try chains in priority order
  for (const chain of CHAIN_PRIORITY) {
    const entry = balances[chain];
    const tokens: any[] = entry?.tokens ?? [];
    const addr = tokens[0]?.address;
    if (addr && addr !== '0x0000000000000000000000000000000000000000') {
      return { address: addr, chain };
    }
  }

  // Fall back to any chain with an address
  for (const [chain, entry] of Object.entries(balances)) {
    const tokens: any[] = (entry as any)?.tokens ?? [];
    const addr = tokens[0]?.address;
    if (addr && addr !== '0x0000000000000000000000000000000000000000') {
      return { address: addr, chain };
    }
  }

  // Top-level address field (e.g. "ethereum:0x...")
  if (detail?.address && typeof detail.address === 'string') {
    const parts = detail.address.split(':');
    if (parts.length === 2) return { address: parts[1], chain: parts[0] };
    return { address: detail.address, chain: '' };
  }

  return null;
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
        // Step 1: get list + market caps
        const res = await fetch('https://stablecoins.llama.fi/stablecoins');
        const data = await res.json();

        const top10 = (data.peggedAssets as any[])
          .filter((t: any) => t.pegType === 'peggedEUR')
          .map((t: any) => ({
            id: t.id,
            name: t.name,
            symbol: t.symbol,
            marketCap: t.circulating?.peggedEUR ?? t.circulatingPrevDay?.peggedEUR ?? 0,
            chains: (t.chains ?? []).slice(0, 6),
          }))
          .filter((t: any) => t.marketCap > 0)
          .sort((a: any, b: any) => b.marketCap - a.marketCap)
          .slice(0, 10);

        // Step 2: fetch details for each token in parallel to get addresses
        const details = await Promise.allSettled(
          top10.map((t: any) =>
            fetch(`https://stablecoins.llama.fi/stablecoin/${t.id}`).then(r => r.json())
          )
        );

        const result: Token[] = top10.map((t: any, i: number) => {
          const detail = details[i].status === 'fulfilled' ? details[i].value : null;
          const addr = extractAddress(detail);
          return {
            name: t.name,
            symbol: t.symbol,
            marketCap: t.marketCap,
            chains: t.chains,
            address: addr?.address ?? '—',
            addressChain: addr?.chain ?? '',
          };
        });

        setTokens(result);
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
