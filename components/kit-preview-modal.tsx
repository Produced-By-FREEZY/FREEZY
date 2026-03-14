"use client"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X, Play, Pause } from "lucide-react"
import { useAudioPlayer } from "@/contexts/audio-player-context"
import { useRouter } from "next/navigation"

interface KitPreviewModalProps {
  isOpen: boolean
  onClose: () => void
  kitTitle: string
  kitImage: string
  kitCategory: string
  kitDescription: string
  previewUrls: string[]
  kitPrice: string
  lemonSqueezyVariantId?: string
  fileSize?: string
  itemCount?: number
  fileTypes?: string
}

export function KitPreviewModal({
  isOpen,
  onClose,
  kitTitle,
  kitImage,
  kitCategory,
  kitDescription,
  previewUrls,
  kitPrice,
  lemonSqueezyVariantId,
  fileSize,
  itemCount,
  fileTypes,
}: KitPreviewModalProps) {
  const router = useRouter()
  const { currentBeat, isPlaying, playBeat } = useAudioPlayer()

  const handlePlaySound = (index: number, audioUrl: string) => {
    const soundBeat = {
      id: `${kitTitle}-sound-${index}`,
      title: `Sound ${index + 1}`,
      artist: kitTitle,
      audioUrl: audioUrl,
      image: kitImage,
      price: kitPrice,
      bpm: 0,
      type: "kit" as const,
      kitCategory: kitCategory,
    }
    playBeat(soundBeat)
  }

  const handleClose = () => {
    onClose()
  }

  const handleBuyClick = () => {
    const priceValue = kitPrice.replace("$", "")

    const checkoutUrl = `/checkout/kit?title=${encodeURIComponent(kitTitle)}&image=${encodeURIComponent(kitImage)}&category=${encodeURIComponent(kitCategory)}&price=${encodeURIComponent(priceValue)}&description=${encodeURIComponent(kitDescription)}&fileSize=${encodeURIComponent(fileSize || "")}&itemCount=${encodeURIComponent(itemCount || "")}&fileTypes=${encodeURIComponent(fileTypes || "")}`
    router.push(checkoutUrl)
  }

  const isSoundPlaying = (index: number) => {
    return currentBeat?.id === `${kitTitle}-sound-${index}` && isPlaying
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-4xl max-h-[85vh] p-0 bg-[#0a0a0a] border-[#8c52ff]/20">
          <DialogDescription className="sr-only">
            {kitDescription || `Preview and purchase ${kitTitle} kit`}
          </DialogDescription>

          <button
            onClick={handleClose}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none z-50"
          >
            <X className="h-4 w-4 text-white" />
            <span className="sr-only">Close</span>
          </button>

          <div className="grid md:grid-cols-2 gap-4 p-4">
            <div className="space-y-3">
              <div className="aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-[#8c52ff]/20 to-transparent border border-[#8c52ff]/30">
                <img src={kitImage || "/placeholder.svg"} alt={kitTitle} className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="inline-block bg-[#8c52ff]/20 text-[#8c52ff] px-3 py-1 text-xs font-bold rounded mb-2">
                  {kitCategory}
                </div>
                <h2 className="text-xl font-bold text-white mb-2">{kitTitle}</h2>
                <p className="text-xs text-gray-400 mb-2 line-clamp-3">{kitDescription}</p>
                <p className="text-xs text-gray-500 line-clamp-2">
                  This pack includes {previewUrls.length} high-quality sounds crafted for your next hit. Each sound has
                  been carefully processed and mixed to sit perfectly in your productions.
                </p>
              </div>
            </div>

            <div className="space-y-3 flex flex-col">
              <DialogHeader className="space-y-1">
                <DialogTitle className="text-lg font-bold text-white">Preview Sounds</DialogTitle>
                <p className="text-xs text-gray-400">Click play to preview each sound</p>
              </DialogHeader>

              <div
                className="space-y-2 flex-1 overflow-y-auto pr-1 scrollbar-hide"
                style={{ maxHeight: "calc(85vh - 280px)" }}
              >
                {previewUrls.map((url, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-all"
                  >
                    <button
                      onClick={() => handlePlaySound(index, url)}
                      className="flex-shrink-0 w-9 h-9 rounded-full bg-[#8c52ff] hover:bg-[#7a3fee] flex items-center justify-center transition-all"
                    >
                      {isSoundPlaying(index) ? (
                        <Pause className="w-3.5 h-3.5 text-white fill-current" />
                      ) : (
                        <Play className="w-3.5 h-3.5 text-white fill-current ml-0.5" />
                      )}
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-white text-xs truncate">Sound {index + 1}</div>
                      <div className="text-xs text-gray-400">Preview</div>
                    </div>
                    <div className="hidden sm:flex items-center gap-0.5 h-6">
                      {Array.from({ length: 20 }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-0.5 rounded-full transition-all ${
                            isSoundPlaying(index) ? "bg-[#8c52ff]" : "bg-gray-600"
                          }`}
                          style={{
                            height: `${Math.random() * 100}%`,
                            minHeight: "20%",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-xs text-gray-400">Full Kit Price</div>
                    <div className="text-2xl font-bold text-white">{kitPrice}</div>
                  </div>
                </div>
                <Button
                  onClick={handleBuyClick}
                  className="w-full bg-[#8c52ff] hover:bg-[#7a3fee] text-white font-semibold py-2.5 text-sm transition-all duration-200 shadow-lg shadow-[#8c52ff]/20 hover:shadow-[#8c52ff]/40"
                >
                  Purchase Kit
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
