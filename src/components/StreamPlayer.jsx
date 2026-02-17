"use client";

import { useState } from "react";
import Link from "next/link";

export default function StreamPlayer({ streams, source, id, matchSources = [] }) {
  const [selectedStream, setSelectedStream] = useState(streams[0]);

  // Filter out current source and ensure we have valid sources
  const otherSources = matchSources.filter(s => s && s.source && s.id);
  const showSourceSwitcher = otherSources.length > 1;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <h1 className="text-xl font-black mb-1 font-mono tracking-wider">
        <span className="neon-text-red">STREAM PLAYER</span>
      </h1>
      
      {/* Source Switcher */}
      {showSourceSwitcher && (
        <div className="mb-4 p-3 cyber-card rounded-lg">
          <p className="text-[10px] text-muted mb-2 font-mono uppercase tracking-widest">AVAILABLE_SOURCES:</p>
          <div className="flex flex-wrap gap-2">
            {otherSources.map((src) => (
              <Link
                key={src.source}
                href={`/stream/${src.source}/${src.id}`}
                className={`px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider font-mono transition-all ${
                  src.source === source
                    ? "bg-neon-red/15 border border-neon-red/50 text-neon-red shadow-[0_0_10px_rgba(255,45,45,0.2)]"
                    : "bg-surface-2 border border-border text-muted hover:text-neon-red hover:border-neon-red/30"
                }`}
              >
                {src.source}
              </Link>
            ))}
          </div>
        </div>
      )}

      <p className="text-muted mb-6 font-mono text-xs tracking-wider">
        SRC: <span className="font-bold neon-text-red">{source}</span>
      </p>

      {/* Player */}
      <div className="mb-6">
        {selectedStream?.embedUrl ? (
          <div className="relative pt-[56.25%] bg-[#000] rounded-lg overflow-hidden border border-border shadow-[0_0_30px_rgba(255,45,45,0.05)]">
            <iframe
              src={selectedStream.embedUrl}
              className="absolute top-0 left-0 w-full h-full border-0"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              title="Stream Player"
            />
          </div>
        ) : (
          <div className="h-96 bg-surface-2 rounded-lg flex items-center justify-center border border-border">
            <p className="text-muted font-mono text-sm">// NO_EMBED_URL</p>
          </div>
        )}
      </div>

      {/* Stream Selection */}
      <div className="mb-6">
        <h2 className="text-sm font-black mb-3 font-mono tracking-wider text-muted uppercase">Available Streams</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {streams.map((stream, i) => (
            <button
                key={`${stream.id || 'stream'}-${i}`}
                onClick={() => setSelectedStream(stream)}
                className={`group p-4 rounded-lg text-left transition-all duration-300 ${
                selectedStream?.streamNo === stream.streamNo
                    ? "bg-neon-red/10 border border-neon-red/40 shadow-[0_0_15px_rgba(255,45,45,0.1)]"
                    : "bg-surface-2 hover:bg-surface-3 border border-border hover:border-neon-red/25"
                }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-sm text-text-secondary font-mono tracking-wide">
                    {stream.streamNo ? `STREAM_${stream.streamNo}` : `STREAM_${i + 1}`}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    {stream.hd && (
                      <span className="px-2 py-0.5 text-[10px] bg-neon-red/15 border border-neon-red/30 text-neon-red rounded-lg font-mono font-bold">HD</span>
                    )}
                    {(stream.viewers ?? 0) > 0 && (
                      <span className="text-[10px] text-muted font-mono">
                        &#x25C9; {stream.viewers}
                      </span>
                    )}
                  </div>
                </div>
                {selectedStream?.streamNo === stream.streamNo && (
                  <span className="neon-text-green text-xs font-bold font-mono">&#x25CF; ACTIVE</span>
                )}
              </div>
              
              <div className="text-[10px] text-muted font-mono">
                {stream.language && (
                  <p className="mb-1">LANG: {stream.language}</p>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Current Stream Info */}
      {selectedStream && (
        <div className="cyber-card rounded-lg p-5">
          <h3 className="font-black mb-4 text-sm font-mono tracking-wider text-muted uppercase">Stream Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-muted">STREAM_NO:</span>
                <span className="font-bold text-text-tertiary">#{selectedStream.streamNo}</span>
              </div>
              <div className="flex justify-between text-xs font-mono">
                <span className="text-muted">QUALITY:</span>
                <div className="flex items-center gap-2">
                  {selectedStream.hd && (
                    <span className="px-2 py-0.5 text-[10px] bg-neon-red/15 border border-neon-red/30 text-neon-red rounded-lg font-bold">HD</span>
                  )}
                  <span className="font-bold text-text-tertiary">
                    {selectedStream.hd ? "HIGH_DEF" : "STANDARD"}
                  </span>
                </div>
              </div>
              <div className="flex justify-between text-xs font-mono">
                <span className="text-muted">LANGUAGE:</span>
                <span className="font-bold text-text-tertiary">
                  {selectedStream.language || "AUTO"}
                </span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-muted">VIEWERS:</span>
                <span className="font-bold text-text-tertiary">{selectedStream.viewers || 0}</span>
              </div>
              <div className="flex justify-between text-xs font-mono">
                <span className="text-muted">SOURCE:</span>
                <span className="font-bold neon-text-red">{selectedStream.source}</span>
              </div>
              <div className="flex justify-between text-xs font-mono">
                <span className="text-muted">STATUS:</span>
                <span className="font-bold neon-text-green">&#x25CF; LIVE</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}