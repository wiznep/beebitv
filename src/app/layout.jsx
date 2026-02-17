import "./globals.css";
import Header from "@/components/Header";
import BackToTop from "@/components/BackToTop";
import ThemeProvider from "@/components/ThemeProvider";

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("beebi-theme");if(t==="light"||t==="dark"){document.documentElement.setAttribute("data-theme",t)}else{document.documentElement.setAttribute("data-theme",window.matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light")}}catch(e){document.documentElement.setAttribute("data-theme","dark")}})()`,
          }}
        />
      </head>
      <body className="bg-background text-foreground min-h-screen flex flex-col">
        <ThemeProvider>
          <Header />
          <main className="relative z-10 flex-1">{children}</main>
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
