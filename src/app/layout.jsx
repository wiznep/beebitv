import "./globals.css";
import Header from "@/components/Header";

export const metadata = {
  title: "BEEBI TV – Sports Fixtures & Live Streams",
  description: "Watch live football, cricket, basketball, WWE and more sports streams. Your ultimate destination for live sports.",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    other: [
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background text-foreground min-h-screen flex flex-col">
        <Header />
        <main className="relative z-10 flex-1">{children}</main>

        {/* ═══ FOOTER ═══ */}
        <footer className="relative z-10 border-t border-border bg-surface mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              {/* Brand */}
              <div className="col-span-2 md:col-span-1">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-neon-red/20 border border-neon-red/30 flex items-center justify-center">
                    <span className="text-neon-red font-black text-xs">S</span>
                  </div>
                  <span className="font-black text-sm tracking-wider text-gray-200">BEEBI TV</span>
                </div>
                <p className="text-xs text-muted leading-relaxed mb-4">
                  Your premium destination for live sports streaming. Football, Cricket, Basketball, WWE and more.
                </p>
                <div className="flex gap-3">
                  {["X", "YT", "IG", "TG"].map((s) => (
                    <span key={s} className="w-8 h-8 rounded-md bg-surface-2 border border-border flex items-center justify-center text-[10px] font-bold text-muted hover:text-neon-cyan hover:border-neon-cyan/30 cursor-pointer transition-all">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              {/* Quick Links */}
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Quick Links</h4>
                <ul className="space-y-2">
                  {["Home", "Live Now", "Fixtures", "Blog"].map((l) => (
                    <li key={l}><span className="text-xs text-muted hover:text-neon-cyan cursor-pointer transition-colors">{l}</span></li>
                  ))}
                </ul>
              </div>
              {/* Sports */}
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Sports</h4>
                <ul className="space-y-2">
                  {["Football", "Cricket", "Basketball", "WWE", "Tennis"].map((l) => (
                    <li key={l}><span className="text-xs text-muted hover:text-neon-cyan cursor-pointer transition-colors">{l}</span></li>
                  ))}
                </ul>
              </div>
              {/* Legal */}
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Legal</h4>
                <ul className="space-y-2">
                  {["About Us", "Disclaimer", "Privacy Policy", "Contact"].map((l) => (
                    <li key={l}><span className="text-xs text-muted hover:text-neon-cyan cursor-pointer transition-colors">{l}</span></li>
                  ))}
                </ul>
              </div>
            </div>
            {/* Bottom bar */}
            <div className="pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-3">
              <p className="text-[11px] text-muted">&copy; 2026 BEEBI TV. All rights reserved.</p>
              <div className="flex items-center gap-4">
                <span className="text-[10px] text-muted/60 uppercase tracking-widest font-mono">StreamMed Platform</span>
                <span className="flex items-center gap-1.5 text-[10px] text-neon-green font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-neon-pulse" />
                  ALL SYSTEMS ONLINE
                </span>
              </div>
            </div>
          </div>
          {/* Bottom neon line */}
          <div className="h-[2px] bg-gradient-to-r from-transparent via-neon-red/40 to-transparent" />
        </footer>
      </body>
    </html>
  );
}
