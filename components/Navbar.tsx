'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ThemeToggle } from './theme-toggle';

// Lucide-style SVG icons (inline)
const BookOpenIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const BarChart2Icon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const WalletIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
    <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
    <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
  </svg>
);

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const MenuIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="6" x2="20" y2="6" />
    <line x1="4" y1="18" x2="20" y2="18" />
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

const navLinks = [
  { label: 'Knowledge Hub', Icon: BookOpenIcon, href: 'https://hub.eurooo.xyz/' },
  { label: 'Stats', Icon: BarChart2Icon, href: 'https://www.eurooo.xyz/stats' },
  { label: 'Earn', Icon: WalletIcon, href: 'https://www.eurooo.xyz/app' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 md:h-16 items-center justify-between px-4">

        {/* Logo */}
        <a
          href="https://www.eurooo.xyz/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <Image
            src="/logo.png"
            alt="eurooo.xyz"
            width={56}
            height={56}
            className="h-10 w-10 md:h-14 md:w-14 object-contain rounded-lg"
          />
          <span className="text-xl font-semibold tracking-tight">eurooo.xyz</span>
        </a>

        {/* Right side */}
        <div className="flex items-center gap-2">

          {/* Desktop CTA — Earn button */}
          <div className="hidden md:flex items-center gap-2">
            <a
              href="https://www.eurooo.xyz/app"
              className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium text-primary-foreground h-9 rounded-md px-3 gap-1 bg-primary hover:bg-primary/90 shadow-md shadow-primary/20 transition-colors"
            >
              Earn <ArrowRightIcon className="h-3.5 w-3.5" />
            </a>
          </div>

          <ThemeToggle />

          {/* Hamburger */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setOpen((v) => !v)}
              className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
              aria-label="Toggle menu"
            >
              <span
                className={`block transition-all duration-200 ${open ? 'rotate-90 opacity-0 absolute' : 'rotate-0 opacity-100'}`}
              >
                <MenuIcon className="h-5 w-5" />
              </span>
              <span
                className={`block transition-all duration-200 ${open ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0 absolute'}`}
              >
                <XIcon className="h-5 w-5" />
              </span>
            </button>

            {/* Desktop floating dropdown */}
            <div
              className={`hidden md:block absolute top-full right-0 mt-2 w-52 rounded-xl border border-border/60 bg-background shadow-xl shadow-black/10 overflow-hidden transition-all duration-200 ease-out origin-top-right ${
                open
                  ? 'opacity-100 scale-100 translate-y-0'
                  : 'opacity-0 scale-95 -translate-y-1 pointer-events-none'
              }`}
            >
              <nav className="flex flex-col gap-0.5 p-2">
                {navLinks.map(({ label, Icon, href }) => (
                  <a
                    key={label}
                    href={href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2.5 rounded-lg hover:bg-secondary/50"
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {label}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile full-width dropdown */}
      <div
        className={`md:hidden border-border/40 bg-background/95 backdrop-blur overflow-hidden transition-all duration-300 ease-in-out ${
          open ? 'max-h-96 opacity-100 border-t' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="container flex flex-col gap-1 px-4 py-3">
          {navLinks.map(({ label, Icon, href }) => (
            <a
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2.5 rounded-lg hover:bg-secondary/50"
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
