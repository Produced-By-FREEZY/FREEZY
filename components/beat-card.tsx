"use client"

import type React from "react"

import { useState } from "react"
import { Play, Pause, ShoppingCart, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { useAudioPlayer } from "@/contexts/audio-player-context"
import { LicenseModal } from "@/components/license-modal"
import { FreeDownloadModal } from "@/components/free-download-modal"

interface BeatCardProps {
  id: string
  title: string
  artist: string
  price: string
  bpm: number
  musicalKey?: string
  genres: string[]
  tags: string[]
  typeBeat?: string
  image: string
  audioUrl: string
  isFree?: boolean
}

export function BeatCard({
  id,
  title,
  artist,
  price,
  bpm,
  musicalKey,
  genres,
  tags,
  typeBeat,
  image,
  audioUrl,
  isFree,
}: BeatCardProps) {
  const { currentBeat, isPlaying, playBeat } = useAudioPlayer()
  const isCurrentBeat = currentBeat?.id === id
  const isCurrentlyPlaying = isCurrentBeat && isPlaying
  const [isLicenseModalOpen, setIsLicenseModalOpen] = useState(false)
  const [isFreeDownloadModalOpen, setIsFreeDownloadModalOpen] = useState(false)

  const handlePlayClick = () => {
    playBeat({ id, title, artist, audioUrl, image, price, bpm, type: "beat" })
  }

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button[data-buy-button]")) {
      return
    }
    handlePlayClick()
  }

  return (
    <>
      <Card
        className="group relative overflow-hidden bg-card border-border hover:border-primary/50 transition-all cursor-pointer"
        onClick={handleCardClick}
      >
        <div className="aspect-square relative bg-muted">
          <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="h-12 w-12 rounded-full bg-[#8c52ff] hover:bg-[#8c52ff]/90 flex items-center justify-center shadow-lg shadow-[#8c52ff]/50">
              {isCurrentlyPlaying ? (
                <Pause className="h-5 w-5 fill-current text-white" />
              ) : (
                <Play className="h-5 w-5 fill-current text-white" />
              )}
            </div>
          </div>
          {isCurrentlyPlaying && <div className="absolute inset-0 border-2 border-[#8c52ff] pointer-events-none" />}
          {isFree && (
            <div className="absolute top-2 left-2">
              <Badge className="bg-primary text-primary-foreground font-bold">FREE</Badge>
            </div>
          )}
        </div>
        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-semibold text-sm line-clamp-1 text-foreground">{title}</h3>
            <p className="text-xs text-muted-foreground">{artist}</p>
          </div>

          {typeBeat && (
            <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#8c52ff]/10 border border-[#8c52ff]/20">
              <span className="text-xs font-semibold text-[#8c52ff] tracking-wide">{typeBeat}</span>
              <span className="text-xs text-[#8c52ff]/70">Type Beat</span>
            </div>
          )}
          <div className="flex flex-wrap gap-1">
            {genres.map((genre) => (
              <Badge key={genre} variant="secondary" className="text-xs bg-muted text-muted-foreground">
                {genre}
              </Badge>
            ))}
          </div>
          <div className="text-xs text-muted-foreground space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono">{bpm} BPM</span>
              {musicalKey && <span>• {musicalKey}</span>}
            </div>
          </div>
          <div className="text-xs text-muted-foreground">{tags.slice(0, 3).join(", ")}</div>
          <div className="flex items-center justify-between gap-2 pt-2">
            <span className="text-lg font-bold text-foreground">{price}</span>
            {isFree ? (
              <Button
                data-buy-button
                size="sm"
                className="text-xs bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/20"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsFreeDownloadModalOpen(true)
                }}
              >
                <Download className="h-3 w-3 mr-1" />
                Download
              </Button>
            ) : (
              <Button
                data-buy-button
                size="sm"
                className="text-xs bg-[#8c52ff] hover:bg-[#8c52ff]/90 text-white shadow-lg shadow-[#8c52ff]/20"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsLicenseModalOpen(true)
                }}
              >
                <ShoppingCart className="h-3 w-3 mr-1" />
                Buy
              </Button>
            )}
          </div>
        </div>
      </Card>

      {isFree ? (
        <FreeDownloadModal
          isOpen={isFreeDownloadModalOpen}
          onClose={() => setIsFreeDownloadModalOpen(false)}
          beatTitle={title}
          beatBpm={bpm}
          beatImage={image}
          beatId={id}
        />
      ) : (
        <LicenseModal
          isOpen={isLicenseModalOpen}
          onClose={() => setIsLicenseModalOpen(false)}
          beatTitle={title}
          beatBpm={bpm}
          beatImage={image}
        />
      )}
    </>
  )
}
