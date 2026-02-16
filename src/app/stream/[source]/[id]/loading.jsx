// Loading skeleton for stream page
// This component shows while the server component fetches data

export default function Loading() {
  return (
    <main className="p-4 md:p-6">
      {/* Header skeleton */}
      <div className="mb-6">
        <div className="h-8 cyber-skeleton rounded-lg w-48 mb-2"></div>
        <div className="h-4 cyber-skeleton rounded-lg w-32"></div>
      </div>

      {/* Source switcher skeleton */}
      <div className="mb-4 p-3 bg-surface-2/50 rounded-lg border border-white/10">
        <div className="h-4 cyber-skeleton rounded-lg w-32 mb-2"></div>
        <div className="flex gap-2">
          <div className="h-8 cyber-skeleton rounded-lg w-20"></div>
          <div className="h-8 cyber-skeleton rounded-lg w-24"></div>
          <div className="h-8 cyber-skeleton rounded-lg w-16"></div>
        </div>
      </div>

      {/* Player skeleton */}
      <div className="mb-6">
        <div className="relative pt-[56.25%] bg-[#000] rounded-lg overflow-hidden border border-white/10">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 border-2 border-neon-red border-t-transparent rounded-full animate-cyber-spin shadow-[0_0_15px_rgba(255,45,45,0.3)]"></div>
              <p className="text-muted font-mono text-xs tracking-widest uppercase animate-neon-pulse">INITIALIZING STREAM...</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stream selection skeleton */}
      <div className="mb-6">
        <div className="h-5 cyber-skeleton rounded-lg w-40 mb-3"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="p-4 bg-surface-2/50 rounded-lg border border-white/5"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="h-5 cyber-skeleton rounded-lg w-24 mb-2"></div>
                  <div className="h-3 cyber-skeleton rounded-lg w-16"></div>
                </div>
              </div>
              <div className="h-3 cyber-skeleton rounded-lg w-20 mt-3"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Stream info skeleton */}
      <div className="p-5 bg-surface-2/50 rounded-lg border border-white/5">
        <div className="h-5 cyber-skeleton rounded-lg w-36 mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex justify-between">
              <div className="h-4 cyber-skeleton rounded-lg w-28"></div>
              <div className="h-4 cyber-skeleton rounded-lg w-16"></div>
            </div>
            <div className="flex justify-between">
              <div className="h-4 cyber-skeleton rounded-lg w-20"></div>
              <div className="h-4 cyber-skeleton rounded-lg w-20"></div>
            </div>
            <div className="flex justify-between">
              <div className="h-4 cyber-skeleton rounded-lg w-24"></div>
              <div className="h-4 cyber-skeleton rounded-lg w-24"></div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <div className="h-4 cyber-skeleton rounded-lg w-16"></div>
              <div className="h-4 cyber-skeleton rounded-lg w-12"></div>
            </div>
            <div className="flex justify-between">
              <div className="h-4 cyber-skeleton rounded-lg w-20"></div>
              <div className="h-4 cyber-skeleton rounded-lg w-16"></div>
            </div>
            <div className="flex justify-between">
              <div className="h-4 cyber-skeleton rounded-lg w-16"></div>
              <div className="h-4 cyber-skeleton rounded-lg w-20"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
