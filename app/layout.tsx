import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { AudioPlayerProvider } from "@/contexts/audio-player-context"
import { AudioPlayer } from "@/components/audio-player"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL('https://www.freezy.ca'),
  title: {
    default: 'FЯEEZY | Premium Beats & Custom Music Production',
    template: '%s | FЯEEZY'
  },
  description: 'Official production hub of FЯEEZY. High-fidelity custom beats, exclusive instrumentals, and professional sound design for artists worldwide.',
  keywords: ['FREEZY producer', 'exclusive beats', 'trap instrumentals', 'hip hop production', 'FЯEEZY beats'],
  openGraph: {
    title: 'FЯEEZY | Premium Beats & Instrumentals',
    description: 'Find your perfect sound with exclusive production from FЯEEZY.',
    url: 'https://www.freezy.ca',
    siteName: 'FЯEEZY Music',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FЯEEZY | Music Producer',
    description: 'Exclusive beats and professional production.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased">
        <AudioPlayerProvider>
          <Suspense fallback={null}>{children}</Suspense>
          <AudioPlayer />
          <Analytics />
        </AudioPlayerProvider>
      </body>
    </html>
  )
}
