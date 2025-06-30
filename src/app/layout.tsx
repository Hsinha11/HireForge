import type { Metadata } from "next";
import "./globals.css";
// import { SpeedInsights } from "@vercel/speed-insights/next";
import { ClerkProvider } from "@clerk/nextjs";
import AppWrapper from "@/components/AppWrapper";

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
        </head>
        <body className="antialiased">
          <AppWrapper>
            {children}
          </AppWrapper>
          {/* <SpeedInsights /> */}
        </body>
      </html>
    </ClerkProvider>
  );
}