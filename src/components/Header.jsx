"use client";

import Link from "next/link";
import { useState } from "react";
import { useTheme } from "@/components/ThemeProvider";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Live Now", href: "/matches/football" },
  { label: "Fixtures", href: "/matches/football" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-xl">
      {/* Top ticker bar */}
      <div className="bg-surface border-b border-border/40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center h-7 gap-4 text-[10px] font-mono">
            <span className="shrink-0 font-bold text-neon-red uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-neon-red animate-live-dot" />
              LIVE
            </span>
            <div className="overflow-hidden flex-1 relative">
              <div className="flex gap-8 animate-[marquee_30s_linear_infinite] whitespace-nowrap">
                {[
                  "⚽ Champions League — Round of 16 Live Now",
                  "🏏 T20 World Cup 2026 — Group Stage Matches Today",
                  "🏀 NBA All-Star Weekend Highlights",
                  "🥊 Boxing — PPV Fight Night This Saturday",
                  "🤼 WWE Monday Night RAW — Live Coverage",
                  "🎾 ATP Dubai Open — Quarter Finals",
                  "⚽ Champions League — Round of 16 Live Now",
                  "🏏 T20 World Cup 2026 — Group Stage Matches Today",
                ].map((item, i) => (
                  <span key={i} className="text-muted hover:text-gray-300 transition-colors cursor-default">{item}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top accent line */}
      <div className="h-[2px] bg-gradient-to-r from-neon-red via-neon-cyan to-neon-red animate-gradient" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-neon-red to-neon-red/60 flex items-center justify-center shadow-lg shadow-neon-red/20 group-hover:shadow-neon-red/40 transition-shadow">
              <span className="text-white font-black text-sm leading-none">S</span>
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-sm font-black tracking-wider text-gray-100 leading-none">BEEBI TV</span>
              <span className="text-[9px] font-medium tracking-[0.2em] text-muted uppercase">StreamMed</span>
            </div>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-neon-cyan transition-colors rounded-md hover:bg-neon-cyan/5"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* ── Right side ── */}
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-md bg-surface-2 border border-border flex items-center justify-center text-muted hover:text-neon-cyan transition-colors"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"/>
                  <line x1="12" y1="1" x2="12" y2="3"/>
                  <line x1="12" y1="21" x2="12" y2="23"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="1" y1="12" x2="3" y2="12"/>
                  <line x1="21" y1="12" x2="23" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>

            {/* Watch Live CTA */}
            <Link
              href="/matches/football"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-neon-red to-[#cc1111] text-white text-xs font-extrabold uppercase tracking-wider rounded-lg shadow-lg shadow-neon-red/20 hover:shadow-neon-red/40 hover:scale-[1.03] active:scale-[0.97] transition-all"
            >
              <span className="w-2 h-2 rounded-full bg-white animate-neon-pulse" />
              Watch Live
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-9 h-9 rounded-md bg-surface-2 border border-border flex items-center justify-center text-gray-400 hover:text-neon-cyan transition-colors"
              aria-label="Menu"
            >
              {mobileOpen ? (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Nav ── */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-surface/95 backdrop-blur-xl animate-float-up">
          <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-sm font-bold uppercase tracking-wider text-gray-300 hover:text-neon-cyan hover:bg-neon-cyan/5 rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/matches/football"
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 text-sm font-extrabold uppercase tracking-wider text-neon-red bg-neon-red/10 rounded-lg border border-neon-red/20 text-center mt-3"
            >
              &#9654; Watch Live Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
