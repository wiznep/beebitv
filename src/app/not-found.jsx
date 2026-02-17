import Link from "next/link";

export default function NotFound() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 min-h-[70vh] flex items-center justify-center">
      <div className="text-center max-w-md">
        {/* Glitch number */}
        <div className="relative mb-6">
          <h1 className="text-[120px] sm:text-[160px] font-black leading-none tracking-tighter cyber-gradient select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <span className="text-[120px] sm:text-[160px] font-black leading-none tracking-tighter text-neon-red animate-text-flicker">
              404
            </span>
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-gray-200 mb-3 font-mono tracking-wider uppercase">
          Signal Lost
        </h2>
        <p className="text-sm text-muted mb-8 leading-relaxed">
          The stream you&apos;re looking for doesn&apos;t exist or has been
          moved. Check the URL or head back to the homepage.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="cyber-btn cyber-btn-solid-red px-6 py-3 text-sm rounded-lg"
          >
            ← Back to Home
          </Link>
          <Link
            href="/matches/football"
            className="cyber-btn px-6 py-3 text-sm rounded-lg"
          >
            Browse Matches
          </Link>
        </div>

        {/* Status code detail */}
        <div className="mt-10 pt-6 border-t border-border">
          <p className="text-[10px] text-muted/50 font-mono uppercase tracking-widest">
            ERROR_CODE: 404 &nbsp;|&nbsp; STATUS: NOT_FOUND &nbsp;|&nbsp; BEEBI TV
          </p>
        </div>
      </div>
    </main>
  );
}
