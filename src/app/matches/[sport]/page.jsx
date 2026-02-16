"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { fetchApi } from "@/lib/api";

// Skeleton component for loading matches
function MatchSkeleton() {
  return (
    <div className="cyber-card rounded-lg p-5">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <div className="h-5 cyber-skeleton rounded w-3/4"></div>
        <div className="h-4 cyber-skeleton rounded w-20"></div>
      </div>
      <div className="flex items-center justify-between mb-5 p-4 bg-surface-2/50 rounded-lg">
        <div className="flex flex-col items-center gap-2 flex-1">
          <div className="w-12 h-12 cyber-skeleton rounded-full"></div>
          <div className="h-4 cyber-skeleton rounded w-16"></div>
        </div>
        <div className="mx-4 sm:mx-8 flex flex-col items-center">
          <div className="h-5 cyber-skeleton rounded w-8"></div>
        </div>
        <div className="flex flex-col items-center gap-2 flex-1">
          <div className="w-12 h-12 cyber-skeleton rounded-full"></div>
          <div className="h-4 cyber-skeleton rounded w-16"></div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 h-14 cyber-skeleton rounded-lg"></div>
        <div className="flex-1 h-14 cyber-skeleton rounded-lg"></div>
      </div>
    </div>
  );
}

function CountdownTimer({ date }) {
  const [timeLeft, setTimeLeft] = useState(() => {
    const now = new Date();
    const target = new Date(date);
    const difference = target.getTime() - now.getTime();

    if (difference <= 0) {
      return { hasStarted: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      hasStarted: false,
    };
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const target = new Date(date);
      const difference = target.getTime() - now.getTime();

      if (difference <= 0) {
        return { hasStarted: true };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        hasStarted: false,
      };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [date]);

  if (!timeLeft.hasStarted && timeLeft.hasStarted !== false) {
    return <span className="text-sm text-gray-400">Loading...</span>;
  }

  if (timeLeft.hasStarted) {
    return (
      <span
        className="inline-flex items-center gap-3 text-sm font-semibold px-2 py-1 bg-green-900/30 rounded"
        role="status"
        aria-live="polite"
      >
        {/* Pulsating/“ping” circle */}
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-60 animate-ping" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
        </span>

        <span className="text-green-400">LIVE</span>
      </span>
    );
  }

  if (timeLeft.days > 1) {
    return (
      <span className="text-sm text-gray-400">
        {new Date(date).toLocaleDateString(undefined, {
          weekday: "short",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </span>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-yellow-500">Starts in:</span>
      <div className="flex gap-1">
        {timeLeft.days > 0 && (
          <span className="px-2 py-1 bg-gray-700 rounded text-xs">
            {timeLeft.days}d
          </span>
        )}
        <span className="px-2 py-1 bg-gray-700 rounded text-xs">
          {String(timeLeft.hours).padStart(2, "0")}h
        </span>
        <span className="px-2 py-1 bg-gray-700 rounded text-xs">
          {String(timeLeft.minutes).padStart(2, "0")}m
        </span>
        <span className="px-2 py-1 bg-gray-700 rounded text-xs">
          {String(timeLeft.seconds).padStart(2, "0")}s
        </span>
      </div>
    </div>
  );
}

// Component to render team badges
function TeamBadge({ team, isHome = true }) {
  const [showTooltip, setShowTooltip] = useState(false);

  if (!team) return null;

  // Generate badge URL from badge ID
  const getBadgeUrl = (badgeId) => {
    if (!badgeId) return null;
    return `/api/proxy/images/badge/${badgeId}.webp`;  // Use proxy instead of direct URL
  };

  const badgeUrl = getBadgeUrl(team.badge);

  return (
    <div className="relative">
      <div
        className="relative"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {badgeUrl ? (
          <div className="relative w-12 h-12">
            <Image
              src={badgeUrl}
              alt={`${team.name} badge`}
              width={48}
              height={48}
              className="w-full h-full rounded-full bg-surface-2 object-cover border-2 border-neon-cyan/30 shadow-[0_0_8px_rgba(0,229,255,0.15)]"
              unoptimized
              onError={(e) => {
                // Fallback if image fails to load
                console.error(
                  `Failed to load badge for ${team.name}:`,
                  badgeUrl,
                );
                e.target.style.display = "none";
                const fallback =
                  e.target.parentElement?.querySelector(".badge-fallback");
                if (fallback) fallback.style.display = "flex";
              }}
            />
            {/* Fallback badge with initials */}
            <div
              className={`badge-fallback absolute inset-0 rounded-full flex items-center justify-center border-2 font-bold text-xs font-mono ${
                isHome
                  ? "bg-neon-cyan/10 border-neon-cyan/40 text-neon-cyan"
                  : "bg-neon-red/10 border-neon-red/40 text-neon-red"
              }`}
              style={{ display: "none" }}
            >
              {team.name
                .split(" ")
                .map((word) => word[0])
                .join("")
                .substring(0, 2)
                .toUpperCase()}
            </div>
          </div>
        ) : (
          // No badge ID available
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center border-2 font-bold text-xs font-mono ${
              isHome
                ? "bg-neon-cyan/10 border-neon-cyan/40 text-neon-cyan shadow-[0_0_8px_rgba(0,229,255,0.2)]"
                : "bg-neon-red/10 border-neon-red/40 text-neon-red shadow-[0_0_8px_rgba(255,45,45,0.2)]"
            }`}
          >
            {team.name
              .split(" ")
              .map((word) => word[0])
              .join("")
              .substring(0, 2)
              .toUpperCase()}
          </div>
        )}
      </div>

      {/* Team name tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 bg-surface-2 border border-neon-cyan/30 text-xs text-neon-cyan rounded-lg whitespace-nowrap z-10 shadow-[0_0_15px_rgba(0,229,255,0.2)] font-mono">
          {team.name}
        </div>
      )}
    </div>
  );
}

// Match poster component
// function MatchPoster({ matchId, title }) {
//   const [showPoster, setShowPoster] = useState(false);

//   const posterUrl = `https://streamed.pk/api/images/poster/${matchId}.webp`;

//   return (
//     <div className="relative">
//       <button
//         onClick={() => setShowPoster(!showPoster)}
//         className="text-xs px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-gray-300 transition"
//       >
//         {showPoster ? "Hide Poster" : "Show Poster"}
//       </button>

//       {showPoster && (
//         <div className="absolute top-full left-0 mt-2 z-20 bg-gray-900 rounded-lg shadow-xl p-2 max-w-xs">
//           <div className="relative w-48 h-64">
//             <Image
//               src={posterUrl}
//               alt={`${title} poster`}
//               fill
//               className="object-cover rounded"
//               unoptimized
//               onError={(e) => {
//                 console.error(`Failed to load poster for ${title}:`, posterUrl);
//                 e.target.parentElement.innerHTML = `
//                   <div class="w-full h-full flex items-center justify-center bg-gray-800 rounded text-gray-400 text-sm">
//                     No poster available
//                   </div>
//                 `;
//               }}
//             />
//           </div>
//           <div className="text-xs text-gray-400 mt-2 text-center">
//             Click outside to close
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

export default function Matches({ params }) {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sport, setSport] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [availableSports, setAvailableSports] = useState([]);
  const [loadingSports, setLoadingSports] = useState(true);
  const router = useRouter();

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);


  // Fetch available sports on mount
  useEffect(() => {
    async function fetchSports() {
      try {
        const data = await fetchApi("/sports");
        // console.log("Available sports:", data);
        setAvailableSports(data || []);
      } catch (error) {
        console.error("Error fetching sports:", error);
        // Fallback to hardcoded sports if API fails
        setAvailableSports([
          { id: "football", name: "Football" },
          { id: "basketball", name: "Basketball" },
          { id: "tennis", name: "Tennis" },
          { id: "hockey", name: "Hockey" },
          { id: "baseball", name: "Baseball" },
          { id: "soccer", name: "Soccer" },
        ]);
      } finally {
        setLoadingSports(false);
      }
    }

    fetchSports();
  }, []);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError(null);
        const unwrappedParams = await params;
        const sportParam = unwrappedParams.sport;
        setSport(sportParam);

        // console.log("Fetching matches for sport:", sportParam);
        const data = await fetchApi(`/matches/${sportParam}`);
        // console.log("Matches data:", data);

        // Transform the data to ensure sources have proper structure
        const transformedData =
          data?.map((match) => {
            // If sources don't exist or are empty, create default source
            if (!match.sources || match.sources.length === 0) {
              return {
                ...match,
                sources: [
                  {
                    source: "default",
                    id: match.id,
                  },
                ],
              };
            }

            // Ensure each source has proper source and id
            const processedSources = match.sources.map((source) => ({
              source: source.source || "default",
              id: source.id || match.id,
            }));

            return {
              ...match,
              sources: processedSources,
            };
          }) || [];

        setMatches(transformedData);
      } catch (error) {
        console.error("Error loading matches:", error);
        setError("Failed to load matches. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [params]);

  // Filter matches based on debounced search term
  const filteredMatches = useMemo(() => {
    if (!debouncedSearchTerm.trim()) return matches;

    const term = debouncedSearchTerm.toLowerCase();
    return matches.filter((match) => {
      // Search in match title
      if (match.title.toLowerCase().includes(term)) return true;

      // Search in team names
      if (match.teams?.home?.name?.toLowerCase().includes(term)) return true;
      if (match.teams?.away?.name?.toLowerCase().includes(term)) return true;

      // Search in category
      if (match.category?.toLowerCase().includes(term)) return true;

      return false;
    });
  }, [matches, debouncedSearchTerm]);

  // Close posters when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      // You can add logic here to close all posters if needed
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  if (loading && !matches.length) {
    return (
      <main className="p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="h-8 cyber-skeleton rounded w-48"></div>
          <div className="h-10 cyber-skeleton rounded w-80"></div>
        </div>
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <MatchSkeleton key={i} />
          ))}
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="p-6">
        <div className="text-center py-12">
          <div className="text-6xl mb-4 animate-neon-pulse">⚠</div>
          <h1 className="text-2xl font-black neon-text-red mb-2 font-mono tracking-wider">SYSTEM ERROR</h1>
          <p className="text-muted mb-6 font-mono text-sm">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="cyber-btn"
          >
            ↻ RECONNECT
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <select
          value={sport}
          onChange={(e) => router.push(`/matches/${e.target.value}`)}
          disabled={loadingSports}
          className="text-lg font-black bg-surface-2 border border-white/10 rounded-lg px-4 py-2.5 outline-none cursor-pointer text-white hover:border-neon-red/50 focus:ring-1 focus:ring-neon-red/50 transition font-mono uppercase tracking-wider appearance-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23ff2d2d' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', paddingRight: '2.5rem' }}
          aria-label="Select sport category"
        >
          {loadingSports ? (
            <option>LOADING...</option>
          ) : (
            availableSports.map((sportOption) => (
              <option key={sportOption.id} value={sportOption.id}>
                {sportOption.name}
              </option>
            ))
          )}
        </select>

        {/* Search Input */}
        <div className="relative w-full sm:w-auto">
          <input
            type="text"
            placeholder="SEARCH MATCHES..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-80 px-4 py-2.5 bg-surface-2 border border-white/10 rounded-lg text-gray-200 placeholder-gray-600 focus:outline-none focus:border-neon-red/50 focus:shadow-[0_0_15px_rgba(255,45,45,0.1)] transition font-mono text-sm tracking-wider pr-10"
            aria-label="Search matches"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-neon-red transition"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
          {searchTerm !== debouncedSearchTerm && (
            <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
              <div className="animate-cyber-spin h-4 w-4 border-2 border-neon-red border-t-transparent rounded-full"></div>
            </div>
          )}
        </div>
      </div>

      {filteredMatches.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-5xl mb-4 animate-neon-pulse">
            {searchTerm ? "⌕" : "◇"}
          </div>
          <h2 className="text-lg font-black text-gray-400 mb-2 font-mono tracking-wider uppercase">
            {searchTerm ? "NO MATCHES FOUND" : "NO MATCHES AVAILABLE"}
          </h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto font-mono text-xs">
            {searchTerm
              ? `No results for "${searchTerm}". Adjust your query.`
              : `No ${sport} matches scheduled. Check back later.`}
          </p>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="cyber-btn"
            >
              CLEAR SEARCH
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {filteredMatches.map((match) => (
            <div
              key={match.id}
              className="cyber-card rounded-lg p-5 hover:border-neon-red/30 transition-all duration-300 animate-float-up"
            >
              {/* Match header with title and countdown */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
                <h2 className="font-black text-lg tracking-wide text-gray-200">{match.title}</h2>
                <div className="flex items-center gap-3">
                  <CountdownTimer date={match.date} />
                </div>
              </div>

              {/* Teams display with badges */}
              {match.teams && (
                <div className="flex items-center justify-between mb-5 p-4 bg-surface-2/60 rounded-lg border border-white/5">
                  {/* Home Team */}
                  <div className="flex flex-col items-center gap-2 flex-1">
                    <TeamBadge team={match.teams.home} isHome={true} />
                    <div className="text-center">
                      <span className="font-bold text-base block text-gray-200">
                        {match.teams.home?.name || "Home"}
                      </span>
                      <span className="text-xs neon-text font-mono uppercase tracking-wider">
                        HOME
                      </span>
                    </div>
                  </div>

                  {/* VS and category */}
                  <div className="mx-4 sm:mx-8 flex flex-col items-center">
                    <div className="text-xl font-black text-neon-red">VS</div>
                    <div className="text-[10px] text-muted mt-2 px-3 py-1 border border-white/10 rounded-lg font-mono uppercase tracking-widest">
                      {match.category
                        ? match.category.toUpperCase()
                        : sport.toUpperCase()}
                    </div>
                  </div>

                  {/* Away Team */}
                  <div className="flex flex-col items-center gap-2 flex-1">
                    <TeamBadge team={match.teams.away} isHome={false} />
                    <div className="text-center">
                      <span className="font-bold text-base block text-gray-200">
                        {match.teams.away?.name || "Away"}
                      </span>
                      <span className="text-xs text-neon-red font-mono uppercase tracking-wider">
                        AWAY
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Match Details */}
              <div className="mb-5 p-4 bg-surface-2/40 rounded-lg border border-white/5">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div className="space-y-2">
                    <div className="text-xs text-gray-500 font-mono">
                      <span className="text-neon-cyan/60">MATCH_TIME: </span>
                      {new Date(match.date).toLocaleString(undefined, {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        timeZoneName: "short",
                      })}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {match.popular && (
                      <span className="px-3 py-1.5 bg-neon-red/10 border border-neon-red/30 text-neon-red font-bold rounded-lg text-xs flex items-center gap-2 font-mono uppercase tracking-wider">
                        <span className="text-sm">&#x2605;</span>
                        TRENDING
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Stream links */}
              <div className="flex flex-col sm:flex-row gap-3">
                {match.sources?.map((source, index) => {
                  if (!source.source || !source.id) {
                    return null;
                  }

                  return (
                    <Link
                      key={`${source.source}-${source.id}-${index}`}
                      href={`/stream/${encodeURIComponent(source.source)}/${encodeURIComponent(source.id)}`}
                      className="group flex-1 text-center px-6 py-4 bg-gradient-to-r from-neon-red/10 to-neon-cyan/10 border border-neon-red/20 hover:border-neon-red/50 rounded-lg font-bold transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,45,45,0.15)] hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-1 focus:ring-neon-red/50"
                      style={{ clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))' }}
                      aria-label={`Watch ${match.title} on ${source.source.toUpperCase()}`}
                    >
                      <div className="flex items-center justify-center gap-3">
                        <span className="text-xl text-neon-red group-hover:animate-neon-pulse">&#9654;</span>
                        <div className="text-left">
                          <div className="text-sm uppercase tracking-wider text-gray-200 group-hover:text-neon-red transition-colors">WATCH LIVE</div>
                          <div className="text-[10px] text-gray-600 font-mono mt-1 tracking-widest">
                            SRC: {source.source.toUpperCase()}
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}

                {/* Fallback if no valid sources */}
                {(!match.sources ||
                  match.sources.length === 0 ||
                  match.sources.every((s) => !s.source || !s.id)) && (
                  <button
                    disabled
                    className="flex-1 text-center px-6 py-4 bg-surface-2 border border-white/5 rounded-lg font-bold cursor-not-allowed opacity-30"
                    aria-label="No streams available"
                  >
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-gray-700">&#x25A0;</span>
                      <div className="text-left">
                        <div className="text-sm text-gray-600 uppercase tracking-wider">OFFLINE</div>
                        <div className="text-[10px] text-gray-700 font-mono mt-1">
                          NO_STREAMS_AVAILABLE
                        </div>
                      </div>
                    </div>
                  </button>
                )}
              </div>

              {/* Additional info */}
              <div className="mt-4 pt-4 border-t border-white/5 text-[10px] text-muted font-mono">
                <div className="flex flex-col sm:flex-row justify-between gap-2">
                  <span>
                    // SELECT SOURCE TO INITIALIZE STREAM
                  </span>
                  <span className="neon-text">
                    [{match.sources?.length || 0}] SOURCE(S)
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}