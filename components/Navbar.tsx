'use client';

import Image from 'next/image';
import { ThemeToggle } from './theme-toggle';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 md:h-16 items-center justify-between px-4 mx-auto max-w-7xl">

        {/* Logo + brand */}
        <a
          href="https://www.eurooo.xyz/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <Image
            src="/logo.png"
            alt="eurooo.xyz"
            width={40}
            height={40}
            className="h-10 w-10 md:h-14 md:w-14 object-contain"
          />
          <span className="hidden sm:inline text-xl font-semibold tracking-tight">
            eurooo.xyz
          </span>
        </a>

        {/* Nav */}
        <div className="flex items-center gap-1 sm:gap-2">

          {/* BEER pill */}
          <a
            href="https://luma.com/mznyc1io"
                        className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-full border border-border/60 bg-secondary/50"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
            B€€R. Euros. DeFi.
          </a>

          {/* Knowledge Hub */}
          <a
            href="https://hub.eurooo.xyz/"
                        className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
          >
            <span>📚</span>
            <span className="hidden sm:inline">Knowledge Hub</span>
          </a>

          {/* Stats */}
          <a
            href="https://www.eurooo.xyz/stats"
                        className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
          >
            <span>📊</span>
            <span className="hidden sm:inline">Stats</span>
          </a>

          {/* Earn CTA */}
          <a
            href="https://www.eurooo.xyz/app"
                        className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium text-primary-foreground h-9 rounded-md px-3 gap-1 bg-primary hover:bg-primary/90 shadow-md transition-colors"
          >
            Earn
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
