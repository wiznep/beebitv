import Link from "next/link";
import { fetchApi } from "@/lib/api";

/* ─── Sport Icons Map ─── */
const SPORT_ICONS = {
  football: "⚽",
  soccer: "⚽",
  cricket: "🏏",
  basketball: "🏀",
  tennis: "🎾",
  hockey: "🏒",
  baseball: "⚾",
  wwe: "🤼",
  mma: "🥊",
  boxing: "🥊",
  rugby: "🏉",
  motorsport: "🏎️",
  f1: "🏎️",
  golf: "⛳",
  volleyball: "🏐",
  handball: "🤾",
  afl: "🏈",
  darts: "🎯",
  default: "🏟️",
};

const SPORT_COLORS = [
  "from-neon-red/15 to-neon-red/5 border-neon-red/15 hover:border-neon-red/40",
  "from-neon-cyan/15 to-neon-cyan/5 border-neon-cyan/15 hover:border-neon-cyan/40",
  "from-neon-purple/15 to-neon-purple/5 border-neon-purple/15 hover:border-neon-purple/40",
  "from-neon-green/15 to-neon-green/5 border-neon-green/15 hover:border-neon-green/40",
  "from-neon-yellow/15 to-neon-yellow/5 border-neon-yellow/15 hover:border-neon-yellow/40",
  "from-neon-blue/15 to-neon-blue/5 border-neon-blue/15 hover:border-neon-blue/40",
  "from-neon-magenta/15 to-neon-magenta/5 border-neon-magenta/15 hover:border-neon-magenta/40",
];

const BLOG_POSTS = [
  { title: "Champions League Quarter-Finals Preview", desc: "Analyzing the top matchups and key players to watch this season.", tag: "Football" },
  { title: "IPL 2026: Top Teams & Players to Watch", desc: "Breaking down the squads and strategies for the upcoming IPL season.", tag: "Cricket" },
  { title: "NBA Playoffs Bracket Breakdown", desc: "Expert predictions and analysis for every playoff series.", tag: "Basketball" },
  { title: "WrestleMania 42 Match Card Revealed", desc: "Everything you need to know about WWE's biggest event of the year.", tag: "WWE" },
];

export default async function Home() {
  let sports = [];
  let liveMatches = [];

  try {
    sports = await fetchApi("/sports");
  } catch (e) {
    sports = [];
  }

  // Try to fetch some live matches from the first sport
  try {
    if (sports.length > 0) {
      const firstSport = sports[0];
      const matches = await fetchApi(`/matches/${firstSport.id}`);
      liveMatches = (matches || []).slice(0, 6);
    }
  } catch (e) {
    liveMatches = [];
  }

  return (
    <>
      {/* ═══════════════════════════════
          HERO SECTION
          ═══════════════════════════════ */}
      <section className="relative overflow-hidden">
        {/* Background with gradient + grid */}
        <div className="absolute inset-0 bg-gradient-to-b from-neon-red/[0.06] via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,45,45,0.08),transparent_60%)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="max-w-3xl">
            {/* Status line */}
            <div className="flex items-center gap-3 mb-6">
              <span className="live-badge">
                <span className="dot" />
                LIVE MATCHES
              </span>
              <span className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight mb-5">
              <span className="block text-gray-100">Watch Live Sports</span>
              <span className="block cyber-gradient">Anytime, Anywhere</span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-muted max-w-xl mb-8 leading-relaxed">
              Football, Cricket, Basketball, WWE &amp; More — Stream every match in HD with zero delays. No sign-up required.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3">
              <Link
                href="/matches/football"
                className="cyber-btn cyber-btn-solid-red px-6 py-3 text-sm rounded-lg"
              >
                <span className="w-2 h-2 rounded-full bg-white animate-neon-pulse" />
                Watch Live Now
              </Link>
              <Link
                href="/matches/football"
                className="cyber-btn px-6 py-3 text-sm rounded-lg"
              >
                View Today&apos;s Fixtures
              </Link>
            </div>

            {/* Trust line */}
            <div className="flex items-center gap-4 mt-8 text-[11px] text-muted/70">
              <span className="flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                Secure Streams
              </span>
              <span className="flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                Zero Delay
              </span>
              <span className="flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
                HD Quality
              </span>
            </div>
          </div>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </section>

      {/* ═══════════════════════════════
          LIVE NOW — Horizontal Scroll
          ═══════════════════════════════ */}
      {liveMatches.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex items-center justify-between mb-5">
            <div className="section-label">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-neon-red animate-live-dot" />
                Live Now
              </span>
            </div>
            <Link href="/matches/football" className="text-[11px] font-bold uppercase tracking-wider text-muted hover:text-neon-cyan transition-colors">
              View All →
            </Link>
          </div>
          <div className="scroll-container">
            {liveMatches.map((match, i) => (
              <div key={match.id || i} className="w-[280px] sm:w-[300px]">
                <div className="cyber-card rounded-lg p-4 h-full">
                  {/* League / Category */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted px-2 py-0.5 bg-surface-3 rounded">
                      {match.category || "Sports"}
                    </span>
                    <span className="live-badge">
                      <span className="dot" />
                      LIVE
                    </span>
                  </div>
                  {/* Title */}
                  <h3 className="text-sm font-bold text-gray-200 mb-3 line-clamp-2 leading-snug">{match.title}</h3>
                  {/* Teams */}
                  {match.teams && (
                    <div className="flex items-center justify-between mb-4 text-xs">
                      <span className="font-semibold text-gray-300 truncate flex-1 text-center">{match.teams.home?.name || "TBA"}</span>
                      <span className="text-muted font-bold mx-2 text-[10px]">VS</span>
                      <span className="font-semibold text-gray-300 truncate flex-1 text-center">{match.teams.away?.name || "TBA"}</span>
                    </div>
                  )}
                  {/* Watch btn */}
                  {match.sources?.[0] && (
                    <Link
                      href={`/stream/${encodeURIComponent(match.sources[0].source)}/${encodeURIComponent(match.sources[0].id)}`}
                      className="block w-full text-center py-2 text-xs font-bold uppercase tracking-wider bg-neon-red/10 border border-neon-red/25 text-neon-red rounded-md hover:bg-neon-red/20 hover:border-neon-red/40 transition-all"
                    >
                      Watch Now
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ═══════════════════════════════
          TODAY'S MATCHES / SPORTS GRID
          ═══════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="section-label">Browse Sports</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {sports.map((sport, index) => {
            const icon = SPORT_ICONS[sport.id?.toLowerCase()] || SPORT_ICONS.default;
            const color = SPORT_COLORS[index % SPORT_COLORS.length];
            return (
              <Link
                key={sport.id ?? index}
                href={`/matches/${sport.id}`}
                className={`group relative bg-gradient-to-br ${color} border rounded-lg p-4 text-center transition-all duration-300 hover:scale-[1.03] hover:shadow-lg`}
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">{icon}</div>
                <span className="text-xs font-bold uppercase tracking-wider text-gray-300 group-hover:text-white transition-colors">
                  {sport.name}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════
          FEATURED MATCH
          ═══════════════════════════════ */}
      {liveMatches.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="section-label">Featured Match</div>
          <div className="cyber-card cyber-corners rounded-xl p-6 sm:p-8">
            <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center">
              {/* Left — Info */}
              <div className="flex-1 text-center md:text-left">
                <span className="live-badge mb-4 inline-flex">
                  <span className="dot" />
                  FEATURED
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-gray-100 mb-2 leading-tight">
                  {liveMatches[0].title}
                </h2>
                {liveMatches[0].teams && (
                  <p className="text-sm text-muted mb-1">
                    {liveMatches[0].teams.home?.name || "TBA"} vs {liveMatches[0].teams.away?.name || "TBA"}
                  </p>
                )}
                <p className="text-xs text-muted mb-6">
                  {new Date(liveMatches[0].date).toLocaleString(undefined, {
                    weekday: "long", month: "long", day: "numeric",
                    hour: "2-digit", minute: "2-digit",
                  })}
                </p>
                {liveMatches[0].sources?.[0] && (
                  <Link
                    href={`/stream/${encodeURIComponent(liveMatches[0].sources[0].source)}/${encodeURIComponent(liveMatches[0].sources[0].id)}`}
                    className="cyber-btn cyber-btn-solid-red px-8 py-3 text-sm rounded-lg inline-flex"
                  >
                    <span className="w-2 h-2 rounded-full bg-white animate-neon-pulse" />
                    Watch Live
                  </Link>
                )}
              </div>
              {/* Right — Teams visual */}
              <div className="flex items-center gap-6 sm:gap-10">
                {liveMatches[0].teams?.home && (
                  <div className="text-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-neon-cyan/10 border-2 border-neon-cyan/25 flex items-center justify-center mx-auto mb-2">
                      <span className="text-lg sm:text-xl font-black text-neon-cyan">
                        {liveMatches[0].teams.home.name?.split(" ").map(w => w[0]).join("").substring(0,2).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-gray-400 block truncate max-w-[80px]">{liveMatches[0].teams.home.name}</span>
                  </div>
                )}
                <span className="text-2xl font-black cyber-gradient">VS</span>
                {liveMatches[0].teams?.away && (
                  <div className="text-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-neon-red/10 border-2 border-neon-red/25 flex items-center justify-center mx-auto mb-2">
                      <span className="text-lg sm:text-xl font-black text-neon-red">
                        {liveMatches[0].teams.away.name?.split(" ").map(w => w[0]).join("").substring(0,2).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-gray-400 block truncate max-w-[80px]">{liveMatches[0].teams.away.name}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════
          SPORTS BLOG
          ═══════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="section-label">Latest News</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BLOG_POSTS.map((post, i) => (
            <div key={i} className="cyber-card rounded-lg overflow-hidden group cursor-pointer">
              {/* Thumbnail placeholder */}
              <div className="h-36 bg-gradient-to-br from-surface-3 to-surface-2 flex items-center justify-center">
                <span className="text-4xl opacity-30 group-hover:opacity-50 group-hover:scale-110 transition-all">{SPORT_ICONS[post.tag.toLowerCase()] || "🏟️"}</span>
              </div>
              <div className="p-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-neon-red">{post.tag}</span>
                <h3 className="text-sm font-bold text-gray-200 mt-1 mb-2 line-clamp-2 leading-snug group-hover:text-neon-cyan transition-colors">{post.title}</h3>
                <p className="text-xs text-muted leading-relaxed line-clamp-2 mb-3">{post.desc}</p>
                <span className="text-[11px] font-bold uppercase tracking-wider text-neon-cyan/70 group-hover:text-neon-cyan transition-colors">
                  Read More →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════
          APP PROMOTION
          ═══════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="relative cyber-card rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-neon-red/[0.06] via-transparent to-neon-cyan/[0.06]" />
          <div className="relative flex flex-col md:flex-row items-center justify-between p-8 sm:p-12 gap-6">
            <div className="text-center md:text-left max-w-lg">
              <div className="text-3xl mb-3">📱</div>
              <h2 className="text-xl sm:text-2xl font-black text-gray-100 mb-2">Stream On Your Phone</h2>
              <p className="text-sm text-muted mb-5 leading-relaxed">
                Never miss a match. Watch live sports on the go with our mobile-optimized platform. Instant access, no downloads needed.
              </p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <span className="cyber-btn px-5 py-2.5 text-xs rounded-lg cursor-pointer">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.523 2.273L12 8l-5.523-5.727A.5.5 0 0 1 6.846 2H7.5L12 6.5 16.5 2h.654a.5.5 0 0 1 .369.273zM12 8l5.523 5.727a.5.5 0 0 1-.369.273H16.5L12 9.5 7.5 14h-.654a.5.5 0 0 1-.369-.273L12 8z"/></svg>
                  Google Play
                </span>
                <span className="cyber-btn px-5 py-2.5 text-xs rounded-lg cursor-pointer">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83z"/></svg>
                  App Store
                </span>
              </div>
            </div>
            {/* Phone mockup */}
            <div className="w-40 h-72 rounded-3xl bg-surface-3 border-2 border-border p-2 shrink-0 hidden md:block">
              <div className="w-full h-full rounded-2xl bg-gradient-to-b from-neon-red/5 to-surface-2 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-10 h-10 rounded-lg bg-neon-red/20 flex items-center justify-center mx-auto mb-2">
                    <span className="text-neon-red font-black text-xs">S</span>
                  </div>
                  <span className="text-[9px] font-bold text-muted">BEEBI TV</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Floating Live Button (mobile) ═══ */}
      <Link href="/matches/football" className="floating-live-btn show-mobile-only">
        <span className="w-2 h-2 rounded-full bg-white animate-neon-pulse" />
        LIVE
      </Link>
    </>
  );
}
