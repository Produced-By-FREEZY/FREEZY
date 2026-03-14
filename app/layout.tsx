import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { AudioPlayerProvider } from "@/contexts/audio-player-context"
import { AudioPlayer } from "@/components/audio-player"
import "./globals.css"

export const metadata: Metadata = {
  title: "FЯEEZY - Premium Beats & Instrumentals",
  description: "Exclusive beats and instrumentals by FЯEEZY. Find your perfect sound.",
  generator: "v0.app",
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
