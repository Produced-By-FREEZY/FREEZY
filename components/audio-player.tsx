"use client"

import { useAudioPlayer } from "@/contexts/audio-player-context"
import { Play, Pause, Volume2, VolumeX, ChevronDown, ChevronUp, X, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { useState } from "react"
import { LicenseModal } from "@/components/license-modal"
import { FreeDownloadModal } from "@/components/free-download-modal"
import { KitModal } from "@/components/kit-modal"

export function AudioPlayer() {
  const { currentBeat, isPlaying, progress, volume, duration, togglePlay, setProgress, setVolume, closePlayer } =
    useAudioPlayer()
  const [isMuted, setIsMuted] = useState(false)
  const [showLicenseModal, setShowLicenseModal] = useState(false)
  const [showFreeDownloadModal, setShowFreeDownloadModal] = useState(false)
  const [showKitModal, setShowKitModal] = useState(false)
  const [isHidden, setIsHidden] = useState(false)

  if (!currentBeat) return null

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleVolumeToggle = () => {
    if (isMuted) {
      setVolume(0.7)
      setIsMuted(false)
    } else {
      setVolume(0)
      setIsMuted(true)
    }
  }

  const isFree = currentBeat.price === "FREE" || currentBeat.price === "$0.00"
  const isKit = currentBeat.type === "kit"

  if (isHidden) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <div className="bg-card border border-border rounded-lg shadow-2xl p-3 flex items-center gap-3 min-w-[280px]">
          <Button
            size="icon"
            variant="ghost"
            onClick={closePlayer}
            className="h-8 w-8 shrink-0 text-muted-foreground hover:text-red-500 transition-colors"
            title="Close Player"
          >
            <X className="h-4 w-4" />
          </Button>
          <img
            src={currentBeat.image || "/placeholder.svg"}
            alt={currentBeat.title}
            className="w-12 h-12 rounded object-cover"
          />
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-foreground truncate">{currentBeat.title}</h4>
            <p className="text-xs text-muted-foreground truncate">{currentBeat.artist}</p>
          </div>
          <Button size="icon" variant="ghost" onClick={togglePlay} className="h-9 w-9 shrink-0">
            {isPlaying ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current" />}
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setIsHidden(false)}
            className="h-9 w-9 shrink-0 text-[#8c52ff] hover:text-[#7a3fee]"
          >
            <ChevronUp className="h-4 w-4" />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 shadow-lg">
        <div className="container px-4 py-3">
          <div className="flex items-center gap-4">
            <Button
              size="icon"
              variant="ghost"
              onClick={closePlayer}
              className="h-10 w-10 text-muted-foreground hover:text-red-500 transition-colors shrink-0"
              title="Close Player"
            >
              <X className="h-5 w-5" />
            </Button>

            <div className="flex items-center gap-3 min-w-0 flex-1">
              <img
                src={currentBeat.image || "/placeholder.svg"}
                alt={currentBeat.title}
                className="w-12 h-12 rounded object-cover"
              />
              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-semibold text-foreground truncate">{currentBeat.title}</h4>
                <p className="text-xs text-muted-foreground truncate">{currentBeat.artist}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button size="icon" variant="ghost" onClick={togglePlay} className="h-10 w-10">
                {isPlaying ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current" />}
              </Button>
            </div>

            <div className="hidden md:flex items-center gap-2 flex-1 max-w-md">
              <span className="text-xs text-muted-foreground font-mono">{formatTime((progress / 100) * duration)}</span>
              <Slider
                value={[progress]}
                onValueChange={(value) => setProgress(value[0])}
                max={100}
                step={0.1}
                className="flex-1"
              />
              <span className="text-xs text-muted-foreground font-mono">{formatTime(duration)}</span>
            </div>

            <div className="hidden lg:flex items-center gap-2 w-32">
              <Button size="icon" variant="ghost" onClick={handleVolumeToggle} className="h-8 w-8">
                {isMuted || volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
              <Slider
                value={[isMuted ? 0 : volume * 100]}
                onValueChange={(value) => {
                  setVolume(value[0] / 100)
                  setIsMuted(false)
                }}
                max={100}
                step={1}
                className="flex-1"
              />
            </div>

            <div className="hidden sm:flex items-center gap-2">
              <span className="text-sm font-bold text-primary">{currentBeat.price}</span>
              {isFree ? (
                <Button
                  size="sm"
                  onClick={() => setShowFreeDownloadModal(true)}
                  className="bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/20"
                >
                  <Download className="h-4 w-4 mr-1" />
                  DOWNLOAD
                </Button>
              ) : (
                <Button
                  size="sm"
                  onClick={() => (isKit ? setShowKitModal(true) : setShowLicenseModal(true))}
                  className="bg-[#8c52ff] hover:bg-[#7a3fee] text-white shadow-lg shadow-[#8c52ff]/20"
                >
                  BUY
                </Button>
              )}
            </div>

            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsHidden(true)}
              className="h-10 w-10 text-muted-foreground hover:text-[#8c52ff] transition-colors"
              title="Hide Player"
            >
              <ChevronDown className="h-5 w-5" />
            </Button>
          </div>

          <div className="md:hidden mt-2">
            <Slider value={[progress]} onValueChange={(value) => setProgress(value[0])} max={100} step={0.1} />
          </div>
        </div>
      </div>

      {isFree ? (
        <FreeDownloadModal
          isOpen={showFreeDownloadModal}
          onClose={() => setShowFreeDownloadModal(false)}
          beatTitle={currentBeat.title}
          beatBpm={currentBeat.bpm}
          beatImage={currentBeat.image}
          beatId={currentBeat.id}
        />
      ) : isKit ? (
        <KitModal
          isOpen={showKitModal}
          onClose={() => setShowKitModal(false)}
          kitTitle={currentBeat.title}
          kitImage={currentBeat.image}
          kitCategory={(currentBeat as any).kitCategory || "SAMPLE PACK"}
        />
      ) : (
        <LicenseModal
          isOpen={showLicenseModal}
          onClose={() => setShowLicenseModal(false)}
          beatTitle={currentBeat.title}
          beatBpm={currentBeat.bpm}
          beatImage={currentBeat.image}
          // THE FIX: Casting to any bypasses the strict Interface check
          prices={(currentBeat as any).prices}
        />
      )}
    </>
  )
}
