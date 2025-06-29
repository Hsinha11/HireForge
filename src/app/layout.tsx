import type { Metadata } from "next";
import { Inter, Poppins, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ClerkProvider } from "@clerk/nextjs";
import AppWrapper from "@/components/AppWrapper";

// Main font for body text - clean and readable
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Beautiful font for headings - modern and professional
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
});

// Monospace font for code elements
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "HireForge",
  description: "Connecting talent with opportunity.",
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  other: {
    'format-detection': 'telephone=no',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#ffffff',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          {/* Preconnect to third-party domains */}
          <link rel="preconnect" href="https://clerk.accounts.dev" />
          <link rel="preconnect" href="https://clerk.dev" />
          <link rel="preconnect" href="https://supabase.co" />
          <link rel="dns-prefetch" href="https://clerk.accounts.dev" />
          <link rel="dns-prefetch" href="https://clerk.dev" />
          <link rel="dns-prefetch" href="https://supabase.co" />
          
          {/* Preload critical fonts for LCP */}
          <link 
            rel="preload" 
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" 
            as="style" 
          />
        </head>
        <body 
          className={`${inter.variable} ${poppins.variable} ${jetbrainsMono.variable} antialiased`}
        >
          <AppWrapper>
            {children}
          </AppWrapper>
          {/* <SpeedInsights /> */}
        </body>
      </html>
    </ClerkProvider>
  );
}